"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockCustomers } from "@/lib/mock-data/customers";
import type { Customer } from "@/lib/schemas/customer";
import { Users, TrendingDown, CreditCard, ShieldAlert } from "lucide-react";

const statusVariant: Record<string, "success" | "secondary" | "destructive"> = {
  active: "success",
  inactive: "secondary",
  blocked: "destructive",
};

const segmentLabel: Record<string, string> = {
  construction: "Construction",
  government: "Government",
  developer: "Developer",
  retail: "Retail",
};

function fmtCurrency(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}${(abs / 1_000_000_000).toFixed(1)} mlrd`;
  if (abs >= 1_000_000) return `${sign}${Math.round(abs / 1_000_000)} mln`;
  return `${sign}${abs.toLocaleString()}`;
}

const columns: ColumnDef<Customer>[] = [
  {
    key: "name",
    label: "Customer",
    sortable: true,
    render: (c) => (
      <div>
        <p className="font-medium">{c.name}</p>
        <p className="text-xs text-muted-foreground">TIN {c.taxId}</p>
      </div>
    ),
  },
  {
    key: "segment",
    label: "Segment",
    render: (c) => <Badge variant="outline">{segmentLabel[c.segment]}</Badge>,
  },
  {
    key: "status",
    label: "Status",
    render: (c) => <Badge variant={statusVariant[c.status]}>{c.status}</Badge>,
  },
  {
    key: "creditLimit",
    label: "Credit Limit",
    render: (c) => <span>{fmtCurrency(c.creditLimit)} so'm</span>,
  },
  {
    key: "balance",
    label: "Balance",
    render: (c) => (
      <span className={c.balance < 0 ? "text-destructive" : "text-emerald-600"}>
        {fmtCurrency(c.balance)} so'm
      </span>
    ),
  },
  {
    key: "address",
    label: "City",
    render: (c) => <span className="text-muted-foreground">{c.address.city}</span>,
  },
];

export default function CustomersPage() {
  const [customers] = useState(mockCustomers);

  const totalCredit = customers.reduce((s, c) => s + c.creditLimit, 0);
  const totalBalance = customers.reduce((s, c) => s + c.balance, 0);
  const blocked = customers.filter((c) => c.status === "blocked").length;

  return (
    <div className="space-y-6">
      <PageHeader
        badge="CRM"
        title="Customers"
        description="Manage customer profiles, credit limits, and account balances."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button onClick={() => toast.info("Create customer form coming soon")}>
              New Customer
            </Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Customers" value={String(customers.length)} icon={Users} />
        <StatCard
          label="Total Credit Extended"
          value={`${fmtCurrency(totalCredit)} so'm`}
          icon={CreditCard}
        />
        <StatCard
          label="Outstanding Balance"
          value={`${fmtCurrency(Math.abs(totalBalance))} so'm`}
          trend="down"
          change={`${blocked} blocked`}
          icon={blocked > 0 ? ShieldAlert : TrendingDown}
        />
      </section>

      <SectionCard title="Customer Registry" noPadding>
        <div className="p-6 pb-0">
          <DataTable
            data={customers}
            columns={columns}
            searchPlaceholder="Search by name or TIN…"
            searchKeys={["name", "taxId"]}
            filters={[
              {
                key: "status",
                label: "Status",
                placeholder: "Status",
                options: [
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "blocked", label: "Blocked" },
                ],
              },
              {
                key: "segment",
                label: "Segment",
                placeholder: "Segment",
                options: [
                  { value: "construction", label: "Construction" },
                  { value: "developer", label: "Developer" },
                  { value: "government", label: "Government" },
                  { value: "retail", label: "Retail" },
                ],
              },
            ]}
            rowActions={[
              { label: "View detail", onClick: (c) => toast.info(`Open: ${c.name}`) },
              { label: "Edit", onClick: (c) => toast.info(`Edit: ${c.name}`) },
              { label: "Block account", onClick: (c) => toast.warning(`Block: ${c.name}`), variant: "destructive" },
            ]}
            onRowClick={(c) => toast.info(`Selected: ${c.name}`)}
          />
        </div>
        <div className="h-6" />
      </SectionCard>
    </div>
  );
}
