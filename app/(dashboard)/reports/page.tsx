"use client";

import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { BarChartCard } from "@/components/charts/bar-chart-card";
import { AreaChartCard } from "@/components/charts/area-chart-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockRevenueData } from "@/lib/mock-data/finance";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

const volumeByMonth = mockRevenueData.map((d) => ({
  month: d.month.replace(" 2025", "").replace(" 2026", ""),
  "Volume (m³)": d.volume,
}));

const revenueByMonth = mockRevenueData.map((d) => ({
  month: d.month.replace(" 2025", "").replace(" 2026", ""),
  "Revenue (mln)": Math.round(d.revenue / 1_000_000),
}));

const volumeByGrade = [
  { grade: "M150", volume: 48 },
  { grade: "M200", volume: 240 },
  { grade: "M250", volume: 180 },
  { grade: "M300", volume: 420 },
  { grade: "M350", volume: 160 },
  { grade: "M400", volume: 90 },
];

const reportTypes = [
  { title: "Production Report", desc: "Daily & monthly m³ produced per grade and plant", icon: FileText },
  { title: "Sales by Customer", desc: "Revenue, volume and payment status by account", icon: FileText },
  { title: "Fleet Utilization", desc: "Truck trips, km, idle time and maintenance cost", icon: FileText },
  { title: "Inventory Consumption", desc: "Raw material usage vs procurement per period", icon: FileText },
  { title: "Quality Summary", desc: "Pass/fail rates, slump averages, strength results", icon: FileText },
  { title: "Accounts Receivable Aging", desc: "Outstanding invoices bucketed by 30/60/90/90+ days", icon: FileText },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Business intelligence across production, sales, fleet, and finance."
        actions={
          <>
            <Button variant="outline">
              <FileSpreadsheet className="size-4" />
              Export Excel
            </Button>
            <Button variant="outline">
              <Download className="size-4" />
              Export PDF
            </Button>
          </>
        }
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <AreaChartCard
          title="Monthly Volume"
          description="m³ produced across all plants"
          data={volumeByMonth}
          xKey="month"
          yKey="Volume (m³)"
          yLabel="m³"
        />
        <AreaChartCard
          title="Monthly Revenue"
          description="Recognized revenue — mln so'm"
          data={revenueByMonth}
          xKey="month"
          yKey="Revenue (mln)"
          color="hsl(var(--accent))"
        />
      </section>

      <BarChartCard
        title="Volume by Mix Grade — May 2026"
        description="m³ produced per concrete grade this month"
        data={volumeByGrade}
        xKey="grade"
        bars={[{ key: "volume", label: "Volume (m³)" }]}
      />

      <SectionCard title="Available Reports">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="flex flex-col gap-3 rounded-lg border p-4 transition-colors hover:bg-secondary/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex size-9 items-center justify-center rounded-md bg-secondary">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <Badge variant="outline" className="shrink-0">Stub</Badge>
                </div>
                <div>
                  <p className="font-medium text-sm">{r.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => toast.info(`Excel export: ${r.title}`)}
                  >
                    <FileSpreadsheet className="size-3.5" />
                    Excel
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => toast.info(`PDF export: ${r.title}`)}
                  >
                    <Download className="size-3.5" />
                    PDF
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
