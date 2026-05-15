"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockEmployees } from "@/lib/mock-data/hr";
import type { Employee, EmployeeRole } from "@/lib/schemas/hr";
import { Users, UserCheck, UserMinus, Coins } from "lucide-react";

const roleLabel: Record<EmployeeRole, string> = {
  operator: "Operator",
  driver: "Driver",
  "lab-tech": "Lab Tech",
  dispatcher: "Dispatcher",
  accountant: "Accountant",
  manager: "Manager",
  admin: "Admin",
};

const statusVariant: Record<string, "success" | "warning" | "destructive"> = {
  active: "success",
  "on-leave": "warning",
  terminated: "destructive",
};

const columns: ColumnDef<Employee>[] = [
  {
    key: "lastName",
    label: "Employee",
    sortable: true,
    render: (e) => (
      <div>
        <p className="font-medium">{e.firstName} {e.lastName}</p>
        {e.email && <p className="text-xs text-muted-foreground">{e.email}</p>}
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    render: (e) => <Badge variant="secondary">{roleLabel[e.role]}</Badge>,
  },
  {
    key: "plantId",
    label: "Plant",
    render: (e) => <span className="capitalize text-muted-foreground">{e.plantId}</span>,
  },
  {
    key: "phone",
    label: "Phone",
    render: (e) => <span className="text-muted-foreground">{e.phone}</span>,
  },
  {
    key: "salary",
    label: "Salary",
    render: (e) => <span>{(e.salary / 1_000_000).toFixed(1)} mln so'm</span>,
  },
  {
    key: "hiredAt",
    label: "Hired",
    sortable: true,
    render: (e) => <span className="text-muted-foreground text-sm">{e.hiredAt}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (e) => <Badge variant={statusVariant[e.status]}>{e.status}</Badge>,
  },
];

export default function HRPage() {
  const [employees] = useState(mockEmployees);

  const active = employees.filter((e) => e.status === "active").length;
  const onLeave = employees.filter((e) => e.status === "on-leave").length;
  const totalPayroll = employees.filter((e) => e.status === "active").reduce((s, e) => s + e.salary, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Staff directory, roles, plant assignments, and payroll data."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button onClick={() => toast.info("Add employee form coming soon")}>Add Employee</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Total Staff" value={String(employees.length)} icon={Users} />
        <StatCard label="Active" value={String(active)} trend="up" icon={UserCheck} />
        <StatCard label="On Leave" value={String(onLeave)} trend={onLeave > 0 ? "neutral" : "up"} icon={UserMinus} />
        <StatCard
          label="Monthly Payroll"
          value={`${(totalPayroll / 1_000_000).toFixed(0)} mln so'm`}
          icon={Coins}
        />
      </section>

      <SectionCard title="Staff Directory" noPadding>
        <div className="p-6 pb-0">
          <DataTable
            data={employees}
            columns={columns}
            searchPlaceholder="Search by name…"
            searchKeys={["firstName", "lastName"]}
            filters={[
              {
                key: "role",
                label: "Role",
                placeholder: "Role",
                options: Object.entries(roleLabel).map(([v, l]) => ({ value: v, label: l })),
              },
              {
                key: "plantId",
                label: "Plant",
                placeholder: "Plant",
                options: [{ value: "tashkent", label: "Tashkent" }, { value: "angren", label: "Angren" }],
              },
              {
                key: "status",
                label: "Status",
                placeholder: "Status",
                options: [
                  { value: "active", label: "Active" },
                  { value: "on-leave", label: "On Leave" },
                  { value: "terminated", label: "Terminated" },
                ],
              },
            ]}
            rowActions={[
              { label: "View profile", onClick: (e) => toast.info(`${e.firstName} ${e.lastName}`) },
              { label: "Edit", onClick: (e) => toast.info(`Edit: ${e.firstName}`) },
              { label: "Terminate", onClick: (e) => toast.warning(`Terminate: ${e.firstName}`), variant: "destructive" },
            ]}
          />
        </div>
        <div className="h-6" />
      </SectionCard>
    </div>
  );
}
