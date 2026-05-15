"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Download, Users, TrendingDown, CreditCard, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { FormSheet } from "@/components/shared/form-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { mockCustomers } from "@/lib/mock-data/customers";
import type { Customer } from "@/lib/schemas/customer";

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
      <span className={c.balance < 0 ? "font-medium text-destructive" : "font-medium text-emerald-600"}>
        {fmtCurrency(c.balance)} so'm
      </span>
    ),
  },
  {
    key: "address",
    label: "City",
    render: (c) => <span className="text-muted-foreground">{c.address.city}</span>,
  },
  {
    key: "createdAt",
    label: "Since",
    sortable: true,
    render: (c) => <span className="text-muted-foreground text-sm">{c.createdAt}</span>,
  },
];

function CreateCustomerForm({ onClose }: { onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Customer created successfully");
    onClose();
  }

  return (
    <FormSheet
      open
      onOpenChange={(v) => !v && onClose()}
      title="New Customer"
      description="Add a new customer to the CRM. All starred fields are required."
      onSubmit={handleSubmit}
      isSubmitting={submitting}
      submitLabel="Create Customer"
      width="md"
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="name">Company Name <span className="text-destructive">*</span></Label>
          <Input id="name" placeholder="e.g. Toshkent Qurilish MChJ" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="taxId">Tax ID (INN) <span className="text-destructive">*</span></Label>
            <Input id="taxId" placeholder="9 digits" maxLength={9} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="type">Type</Label>
            <Select defaultValue="company">
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="segment">Segment</Label>
            <Select defaultValue="construction">
              <SelectTrigger id="segment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="creditLimit">Credit Limit (so'm)</Label>
            <Input id="creditLimit" type="number" placeholder="0" step={1_000_000} />
          </div>
        </div>

        <Separator />

        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Address</p>

        <div className="space-y-1.5">
          <Label htmlFor="street">Street</Label>
          <Input id="street" placeholder="Street address" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Toshkent" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="region">Region</Label>
            <Input id="region" placeholder="Toshkent viloyati" />
          </div>
        </div>

        <Separator />

        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Primary Contact</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="contactName">Name <span className="text-destructive">*</span></Label>
            <Input id="contactName" placeholder="Full name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="contactPhone">Phone</Label>
            <Input id="contactPhone" placeholder="+998 90 000 00 00" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactEmail">Email</Label>
          <Input id="contactEmail" type="email" placeholder="contact@company.uz" />
        </div>
      </div>
    </FormSheet>
  );
}

export default function CustomersPage() {
  const [customers] = useState(mockCustomers);
  const [showCreate, setShowCreate] = useState(false);

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
            <Button variant="outline" size="default">
              <Download className="size-4" />
              Export
            </Button>
            <Button onClick={() => setShowCreate(true)}>
              <Plus className="size-4" />
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
          change={`${blocked} account${blocked !== 1 ? "s" : ""} blocked`}
          icon={blocked > 0 ? ShieldAlert : TrendingDown}
        />
      </section>

      <SectionCard
        title="Customer Registry"
        description="All accounts — click a row to open the detail view"
        noPadding
      >
        <div className="p-6">
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
              { label: "Block account", onClick: (c) => toast.warning(`Blocked: ${c.name}`), variant: "destructive" },
            ]}
            onRowClick={(c) => toast.info(`Selected: ${c.name}`)}
          />
        </div>
      </SectionCard>

      {showCreate && <CreateCustomerForm onClose={() => setShowCreate(false)} />}
    </div>
  );
}
