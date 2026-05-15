"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container, CheckCircle2, Clock, Building2 } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  category: string;
  contactName: string;
  phone: string;
  city: string;
  balance: number;
  status: "active" | "inactive";
}

const mockSuppliers: Supplier[] = [
  { id: "sup-001", name: "Qizilqum Sement Zavodi", category: "Cement", contactName: "Alisher Nazarov", phone: "+998 69 220 11 22", city: "Navoiy", balance: -45_000_000, status: "active" },
  { id: "sup-002", name: "Chirchiq Qum va Shag'al", category: "Aggregates", contactName: "Bahodir Tursunov", phone: "+998 70 333 44 55", city: "Chirchiq", balance: -12_000_000, status: "active" },
  { id: "sup-003", name: "MasterChem Uzbekistan", category: "Admixtures", contactName: "Dilnoza Xoliqova", phone: "+998 71 400 50 60", city: "Toshkent", balance: -8_500_000, status: "active" },
  { id: "sup-004", name: "Bekobod Qum Karyeri", category: "Sand", contactName: "Hamid Ergashev", phone: "+998 93 111 22 33", city: "Bekobod", balance: 0, status: "inactive" },
  { id: "sup-005", name: "AsiaChem Solutions", category: "Admixtures", contactName: "Rustam Mirzaev", phone: "+998 71 500 60 70", city: "Toshkent", balance: -3_200_000, status: "active" },
];

const supplierColumns: ColumnDef<Supplier>[] = [
  {
    key: "name",
    label: "Supplier",
    sortable: true,
    render: (s) => (
      <div>
        <p className="font-medium">{s.name}</p>
        <p className="text-xs text-muted-foreground">{s.city}</p>
      </div>
    ),
  },
  { key: "category", label: "Category", render: (s) => <Badge variant="outline">{s.category}</Badge> },
  {
    key: "contactName",
    label: "Contact",
    render: (s) => (
      <div>
        <p className="text-sm">{s.contactName}</p>
        <p className="text-xs text-muted-foreground">{s.phone}</p>
      </div>
    ),
  },
  {
    key: "balance",
    label: "Balance",
    render: (s) => (
      <span className={s.balance < 0 ? "text-destructive" : "text-emerald-600"}>
        {s.balance < 0 ? "-" : ""}{Math.abs(s.balance / 1_000_000).toFixed(1)} mln so'm
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (s) => <Badge variant={s.status === "active" ? "success" : "secondary"}>{s.status}</Badge>,
  },
];

export default function PurchasingPage() {
  const [suppliers] = useState(mockSuppliers);

  const activeSuppliers = suppliers.filter((s) => s.status === "active").length;
  const totalPayable = suppliers.reduce((sum, s) => sum + Math.abs(Math.min(0, s.balance)), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suppliers & Purchasing"
        description="Manage raw material suppliers, purchase orders, and payables."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.info("View purchase orders")}>Purchase Orders</Button>
            <Button onClick={() => toast.info("Add supplier form coming soon")}>Add Supplier</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Total Suppliers" value={String(suppliers.length)} icon={Building2} />
        <StatCard label="Active" value={String(activeSuppliers)} trend="up" icon={CheckCircle2} />
        <StatCard label="Total Payable" value={`${(totalPayable / 1_000_000).toFixed(1)} mln so'm`} trend="neutral" icon={Clock} />
        <StatCard label="Material Categories" value="5" icon={Container} />
      </section>

      <SectionCard title="Supplier Registry" noPadding>
        <div className="p-6 pb-0">
          <DataTable
            data={suppliers}
            columns={supplierColumns}
            searchPlaceholder="Search suppliers…"
            searchKeys={["name", "city"]}
            filters={[
              {
                key: "status",
                label: "Status",
                placeholder: "Status",
                options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }],
              },
              {
                key: "category",
                label: "Category",
                placeholder: "Category",
                options: ["Cement","Aggregates","Sand","Admixtures"].map((c) => ({ value: c, label: c })),
              },
            ]}
            rowActions={[
              { label: "View detail", onClick: (s) => toast.info(`Open ${s.name}`) },
              { label: "Create PO", onClick: (s) => toast.info(`New PO for ${s.name}`) },
              { label: "Record payment", onClick: (s) => toast.success(`Payment to ${s.name}`) },
            ]}
          />
        </div>
        <div className="h-6" />
      </SectionCard>
    </div>
  );
}
