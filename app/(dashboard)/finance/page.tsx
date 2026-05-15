"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { AreaChartCard } from "@/components/charts/area-chart-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockInvoices, mockRevenueData } from "@/lib/mock-data/finance";
import type { Invoice } from "@/lib/schemas/finance";
import { Receipt, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "secondary" | "outline" }> = {
  draft:     { label: "Draft",     variant: "outline"    },
  sent:      { label: "Sent",      variant: "secondary"  },
  partial:   { label: "Partial",   variant: "warning"    },
  paid:      { label: "Paid",      variant: "success"    },
  overdue:   { label: "Overdue",   variant: "destructive"},
  cancelled: { label: "Cancelled", variant: "outline"    },
};

const columns: ColumnDef<Invoice>[] = [
  {
    key: "id",
    label: "Invoice",
    sortable: true,
    render: (i) => <span className="font-medium">{i.id}</span>,
  },
  {
    key: "customerName",
    label: "Customer",
    sortable: true,
    render: (i) => <span>{i.customerName}</span>,
  },
  {
    key: "amount",
    label: "Amount",
    render: (i) => <span>{(i.amount / 1_000_000).toFixed(1)} mln so'm</span>,
  },
  {
    key: "paidAmount",
    label: "Paid",
    render: (i) => (
      <span className={i.paidAmount >= i.amount ? "text-emerald-600" : "text-muted-foreground"}>
        {(i.paidAmount / 1_000_000).toFixed(1)} mln so'm
      </span>
    ),
  },
  {
    key: "issuedAt",
    label: "Issued",
    sortable: true,
    render: (i) => <span className="text-muted-foreground text-sm">{i.issuedAt}</span>,
  },
  {
    key: "dueAt",
    label: "Due",
    sortable: true,
    render: (i) => <span className="text-muted-foreground text-sm">{i.dueAt}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (i) => <Badge variant={statusConfig[i.status].variant}>{statusConfig[i.status].label}</Badge>,
  },
];

export default function FinancePage() {
  const [invoices] = useState(mockInvoices);

  const totalAmount = invoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.reduce((s, i) => s + i.paidAmount, 0);
  const overdue = invoices.filter((i) => i.status === "overdue");
  const overdueAmount = overdue.reduce((s, i) => s + (i.amount - i.paidAmount), 0);

  const revenueData = mockRevenueData.map((d) => ({
    month: d.month.replace(" 2025", "").replace(" 2026", ""),
    "Revenue (mln)": Math.round(d.revenue / 1_000_000),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Finance"
        title="Invoices"
        description="Track issued invoices, payments received, and aging receivables."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button onClick={() => toast.info("Create invoice form coming soon")}>New Invoice</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Total Invoiced" value={`${(totalAmount / 1_000_000).toFixed(0)} mln`} icon={Receipt} />
        <StatCard label="Collected" value={`${(totalPaid / 1_000_000).toFixed(0)} mln`} trend="up" icon={CheckCircle2} />
        <StatCard label="Outstanding" value={`${((totalAmount - totalPaid) / 1_000_000).toFixed(0)} mln`} trend="neutral" icon={Clock} />
        <StatCard
          label="Overdue"
          value={`${(overdueAmount / 1_000_000).toFixed(0)} mln so'm`}
          trend={overdue.length > 0 ? "down" : "neutral"}
          change={`${overdue.length} invoice${overdue.length !== 1 ? "s" : ""}`}
          icon={AlertTriangle}
        />
      </section>

      <AreaChartCard
        title="Monthly Revenue Trend"
        description="Billed revenue across all plants (mln so'm)"
        data={revenueData}
        xKey="month"
        yKey="Revenue (mln)"
      />

      <SectionCard title="Invoice Register" noPadding>
        <div className="p-6 pb-0">
          <DataTable
            data={invoices}
            columns={columns}
            searchPlaceholder="Search by invoice ID or customer…"
            searchKeys={["id", "customerName"]}
            filters={[
              {
                key: "status",
                label: "Status",
                placeholder: "Status",
                options: Object.entries(statusConfig).map(([v, c]) => ({ value: v, label: c.label })),
              },
            ]}
            rowActions={[
              { label: "View invoice", onClick: (i) => toast.info(`Open ${i.id}`) },
              { label: "Record payment", onClick: (i) => toast.success(`Payment recorded: ${i.id}`) },
              { label: "Send reminder", onClick: (i) => toast.info(`Reminder sent: ${i.customerName}`) },
              { label: "Cancel", onClick: (i) => toast.warning(`Cancel: ${i.id}`), variant: "destructive" },
            ]}
          />
        </div>
        <div className="h-6" />
      </SectionCard>
    </div>
  );
}
