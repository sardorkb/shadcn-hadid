"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTrucks } from "@/lib/mock-data/fleet";
import type { Truck, TruckStatus } from "@/lib/schemas/fleet";
import { Truck as TruckIcon, Wrench, MapPin, Zap } from "lucide-react";

const statusConfig: Record<TruckStatus, { label: string; variant: "success" | "warning" | "secondary" | "destructive" | "outline" }> = {
  idle:        { label: "Idle",        variant: "secondary" },
  loading:     { label: "Loading",     variant: "warning"   },
  "en-route":  { label: "En Route",   variant: "success"   },
  returning:   { label: "Returning",  variant: "outline"   },
  maintenance: { label: "Maintenance",variant: "destructive"},
};

const columns: ColumnDef<Truck>[] = [
  {
    key: "plate",
    label: "Plate",
    sortable: true,
    render: (t) => <span className="font-mono font-semibold">{t.plate}</span>,
  },
  {
    key: "type",
    label: "Type",
    render: (t) => (
      <Badge variant="outline">{t.type === "mixer" ? "Mixer" : "Pump"}</Badge>
    ),
  },
  {
    key: "capacityM3",
    label: "Capacity",
    render: (t) => (
      <span>{t.type === "mixer" ? `${t.capacityM3} m³` : "—"}</span>
    ),
  },
  {
    key: "driverName",
    label: "Driver",
    sortable: true,
    render: (t) => (
      <div>
        <p className="font-medium">{t.driverName}</p>
        <p className="text-xs text-muted-foreground">{t.driverPhone}</p>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (t) => <Badge variant={statusConfig[t.status].variant}>{statusConfig[t.status].label}</Badge>,
  },
  {
    key: "plantId",
    label: "Plant",
    render: (t) => <span className="capitalize text-muted-foreground">{t.plantId}</span>,
  },
  {
    key: "yearMade",
    label: "Year",
    render: (t) => <span className="text-muted-foreground">{t.yearMade}</span>,
  },
];

export default function FleetPage() {
  const [trucks] = useState(mockTrucks);

  const enRoute = trucks.filter((t) => t.status === "en-route").length;
  const maintenance = trucks.filter((t) => t.status === "maintenance").length;
  const mixers = trucks.filter((t) => t.type === "mixer").length;
  const pumps = trucks.filter((t) => t.type === "pump").length;

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Fleet & Logistics"
        title="Fleet"
        description="Monitor mixer and pump trucks, driver assignments, and real-time status."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button onClick={() => toast.info("Add truck form coming soon")}>Add Truck</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Total Fleet" value={String(trucks.length)} icon={TruckIcon} />
        <StatCard label="En Route" value={String(enRoute)} trend="up" icon={MapPin} />
        <StatCard label="In Maintenance" value={String(maintenance)} trend={maintenance > 1 ? "down" : "neutral"} icon={Wrench} />
        <StatCard label="Pump Trucks" value={String(pumps)} change={`${mixers} mixers`} icon={Zap} />
      </section>

      <SectionCard title="Truck Registry" noPadding>
        <div className="p-6 pb-0">
          <DataTable
            data={trucks}
            columns={columns}
            searchPlaceholder="Search by plate or driver…"
            searchKeys={["plate", "driverName"]}
            filters={[
              {
                key: "status",
                label: "Status",
                placeholder: "Status",
                options: Object.entries(statusConfig).map(([v, c]) => ({ value: v, label: c.label })),
              },
              {
                key: "type",
                label: "Type",
                placeholder: "Type",
                options: [{ value: "mixer", label: "Mixer" }, { value: "pump", label: "Pump" }],
              },
              {
                key: "plantId",
                label: "Plant",
                placeholder: "Plant",
                options: [{ value: "tashkent", label: "Tashkent" }, { value: "angren", label: "Angren" }],
              },
            ]}
            rowActions={[
              { label: "View detail", onClick: (t) => toast.info(`Open ${t.plate}`) },
              { label: "Edit", onClick: (t) => toast.info(`Edit ${t.plate}`) },
              { label: "Schedule maintenance", onClick: (t) => toast.warning(`Maintenance: ${t.plate}`) },
            ]}
          />
        </div>
        <div className="h-6" />
      </SectionCard>
    </div>
  );
}
