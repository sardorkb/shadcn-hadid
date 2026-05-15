"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LayoutList, Columns3 } from "lucide-react";
import { KanbanBoard, type KanbanColumn } from "@/components/kanban/kanban-board";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrders } from "@/lib/mock-data/orders";
import type { Order, OrderStatus } from "@/lib/schemas/order";
import { ShoppingCart, Truck, CheckCircle2, XCircle } from "lucide-react";

const statusConfig: Record<OrderStatus, { label: string; variant: "secondary" | "warning" | "success" | "destructive" | "outline"; color: string }> = {
  draft:         { label: "Draft",         variant: "outline",     color: "#94a3b8" },
  confirmed:     { label: "Confirmed",     variant: "secondary",   color: "#3b82f6" },
  "in-production": { label: "In Production", variant: "warning",  color: "#f59e0b" },
  delivering:    { label: "Delivering",    variant: "warning",     color: "#f97316" },
  delivered:     { label: "Delivered",     variant: "success",     color: "#10b981" },
  invoiced:      { label: "Invoiced",      variant: "success",     color: "#6366f1" },
  cancelled:     { label: "Cancelled",     variant: "destructive", color: "#ef4444" },
};

const columns: ColumnDef<Order>[] = [
  {
    key: "id",
    label: "Order",
    sortable: true,
    render: (o) => <span className="font-medium">{o.id}</span>,
  },
  {
    key: "customerName",
    label: "Customer",
    sortable: true,
    render: (o) => (
      <div>
        <p className="font-medium">{o.customerName}</p>
        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{o.deliverySite}</p>
      </div>
    ),
  },
  { key: "mixGrade", label: "Grade", render: (o) => <Badge variant="outline">{o.mixGrade}</Badge> },
  { key: "volumeM3", label: "Volume", render: (o) => <span>{o.volumeM3} m³</span> },
  {
    key: "pricePerM3",
    label: "Value",
    render: (o) => (
      <span>{((o.pricePerM3 * o.volumeM3) / 1_000_000).toFixed(1)} mln so'm</span>
    ),
  },
  {
    key: "pumpTruck",
    label: "Pump",
    render: (o) => (
      <Badge variant={o.pumpTruck ? "success" : "outline"}>{o.pumpTruck ? "Yes" : "No"}</Badge>
    ),
  },
  {
    key: "scheduledAt",
    label: "Scheduled",
    sortable: true,
    render: (o) => (
      <span className="text-muted-foreground text-sm">
        {new Date(o.scheduledAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (o) => <Badge variant={statusConfig[o.status].variant}>{statusConfig[o.status].label}</Badge>,
  },
  {
    key: "plantId",
    label: "Plant",
    render: (o) => <span className="capitalize text-muted-foreground">{o.plantId}</span>,
  },
];

function buildKanban(orders: Order[]): KanbanColumn[] {
  const cols: OrderStatus[] = ["draft", "confirmed", "in-production", "delivering", "delivered", "invoiced"];
  return cols.map((status) => ({
    id: status,
    title: statusConfig[status].label,
    color: statusConfig[status].color,
    cards: orders
      .filter((o) => o.status === status)
      .map((o) => ({
        id: o.id,
        title: o.id,
        subtitle: o.customerName,
        meta: `${o.volumeM3} m³ · ${o.mixGrade}`,
        badge: { label: o.plantId, variant: "outline" as const },
      })),
  }));
}

export default function OrdersPage() {
  const [orders] = useState(mockOrders);

  const todayM3 = orders.filter((o) => o.scheduledAt.startsWith("2026-05-15")).reduce((s, o) => s + o.volumeM3, 0);
  const activeCount = orders.filter((o) => ["confirmed", "in-production", "delivering"].includes(o.status)).length;
  const cancelledCount = orders.filter((o) => o.status === "cancelled").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Manage concrete orders from quotation through delivery and invoicing."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button onClick={() => toast.info("New order form coming soon")}>New Order</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Total Orders" value={String(orders.length)} icon={ShoppingCart} />
        <StatCard label="Today's Volume" value={`${todayM3} m³`} trend="up" change="+6 from yesterday" icon={Truck} />
        <StatCard label="Active" value={String(activeCount)} icon={CheckCircle2} />
        <StatCard label="Cancelled" value={String(cancelledCount)} trend={cancelledCount > 0 ? "down" : "neutral"} icon={XCircle} />
      </section>

      <SectionCard title="Order Pipeline" noPadding>
        <div className="p-6">
          <Tabs defaultValue="table">
            <div className="mb-4 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="table"><LayoutList className="mr-2 size-4" />Table</TabsTrigger>
                <TabsTrigger value="kanban"><Columns3 className="mr-2 size-4" />Kanban</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="table">
              <DataTable
                data={orders}
                columns={columns}
                searchPlaceholder="Search by order ID or customer…"
                searchKeys={["id", "customerName"]}
                filters={[
                  {
                    key: "status",
                    label: "Status",
                    placeholder: "Status",
                    options: Object.entries(statusConfig).map(([v, c]) => ({ value: v, label: c.label })),
                  },
                  {
                    key: "mixGrade",
                    label: "Grade",
                    placeholder: "Grade",
                    options: ["M150","M200","M250","M300","M350","M400","B20","B22.5","B25","B30"].map((g) => ({ value: g, label: g })),
                  },
                  {
                    key: "plantId",
                    label: "Plant",
                    placeholder: "Plant",
                    options: [{ value: "tashkent", label: "Tashkent" }, { value: "angren", label: "Angren" }],
                  },
                ]}
                rowActions={[
                  { label: "View detail", onClick: (o) => toast.info(`Open ${o.id}`) },
                  { label: "Confirm order", onClick: (o) => toast.success(`Confirmed: ${o.id}`) },
                  { label: "Cancel order", onClick: (o) => toast.warning(`Cancelled: ${o.id}`), variant: "destructive" },
                ]}
              />
            </TabsContent>

            <TabsContent value="kanban">
              <KanbanBoard
                columns={buildKanban(orders)}
                onCardClick={(card) => toast.info(`Open ${card.id}`)}
              />
            </TabsContent>
          </Tabs>
        </div>
      </SectionCard>
    </div>
  );
}
