import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Package,
  Receipt,
  Truck,
  Waves,
} from "lucide-react";
import { AreaChartCard } from "@/components/charts/area-chart-card";
import { BarChartCard } from "@/components/charts/bar-chart-card";
import { GaugeCard } from "@/components/charts/gauge-card";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/lib/mock-data/orders";
import { mockTrucks } from "@/lib/mock-data/fleet";
import { mockInventory } from "@/lib/mock-data/inventory";
import { mockInvoices, mockRevenueData } from "@/lib/mock-data/finance";

function fmt(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)} mlrd`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)} mln`;
  return n.toLocaleString();
}

export default function DashboardPage() {
  const todayOrders = mockOrders.filter((o) => o.scheduledAt.startsWith("2026-05-15"));
  const todayM3 = todayOrders.reduce((s, o) => s + o.volumeM3, 0);
  const pendingOrders = mockOrders.filter((o) =>
    ["draft", "confirmed", "in-production"].includes(o.status)
  ).length;
  const activeDeliveries = mockTrucks.filter((t) => t.status === "en-route").length;
  const overdueInvoices = mockInvoices.filter((i) => i.status === "overdue");
  const outstandingReceivables = overdueInvoices.reduce(
    (s, i) => s + (i.amount - i.paidAmount),
    0
  );
  const lowStockItems = mockInventory.filter((i) => i.currentStock < i.minStock);

  const revenueChartData = mockRevenueData.map((d) => ({
    month: d.month.slice(0, 3),
    "Revenue (mln)": Math.round(d.revenue / 1_000_000),
    "Volume (m³)": d.volume,
  }));

  const volumeByGrade = [
    { grade: "M150", m3: 14 },
    { grade: "M200", m3: 68 },
    { grade: "M250", m3: 42 },
    { grade: "M300", m3: 96 },
    { grade: "M350", m3: 60 },
    { grade: "M400", m3: 48 },
  ];

  const recentActivity = [
    { id: "ORD-2026-001", desc: "24 m³ M300 → Yunusobod", status: "In Production", icon: Package },
    { id: "ORD-2026-003", desc: "12 m³ M200 → Samarqand", status: "Delivering", icon: Truck },
    { id: "ORD-2026-005", desc: "30 m³ M250 → Angren", status: "Delivered", icon: CheckCircle2 },
    { id: "INV-2025-089", desc: "Yunusobod — overdue 135 days", status: "Overdue", icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Operations Overview"
        title="Dashboard"
        description="Live view of Hadid Beton production, deliveries, and financials."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New Order</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's Volume" value={`${todayM3} m³`} change="+8% vs yesterday" trend="up" icon={Waves} />
        <StatCard label="Active Deliveries" value={String(activeDeliveries)} change={`${pendingOrders} orders pending`} trend="neutral" icon={Truck} />
        <StatCard label="Pending Orders" value={String(pendingOrders)} change="3 due today" trend="neutral" icon={ClipboardList} />
        <StatCard
          label="Overdue Receivables"
          value={`${fmt(outstandingReceivables)} so'm`}
          change={`${overdueInvoices.length} invoice${overdueInvoices.length !== 1 ? "s" : ""}`}
          trend="down"
          icon={Receipt}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <AreaChartCard
          title="Monthly Revenue"
          description="Recognized revenue — Hadid Beton (all plants)"
          data={revenueChartData}
          xKey="month"
          yKey="Revenue (mln)"
          yLabel="mln so'm"
          headerExtra={<Badge variant="success">Active season</Badge>}
        />
        <GaugeCard
          title="Toshkent Plant Utilization"
          description="Today's scheduled vs capacity"
          value={72}
          unit="%"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <BarChartCard
          title="Volume by Mix Grade"
          description="May 2026 — m³ produced per grade"
          data={volumeByGrade}
          xKey="grade"
          bars={[{ key: "m3", label: "Volume (m³)" }]}
        />
        <SectionCard title="Recent Activity" description="Last updates across all modules">
          <div className="space-y-4">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.id}</p>
                    <p className="truncate text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Badge
                    variant={
                      item.status === "Delivered" || item.status === "Paid"
                        ? "success"
                        : item.status === "Overdue"
                        ? "destructive"
                        : "secondary"
                    }
                    className="shrink-0 text-xs"
                  >
                    {item.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </section>

      {lowStockItems.length > 0 && (
        <SectionCard
          title="Low Stock Alerts"
          description="Materials below minimum threshold"
          headerExtra={<Badge variant="destructive">{lowStockItems.length} items</Badge>}
        >
          <div className="space-y-2">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-md bg-destructive/5 px-3 py-2 text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-destructive">
                  {item.currentStock} {item.unit} / min {item.minStock} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
