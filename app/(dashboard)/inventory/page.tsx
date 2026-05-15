"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockInventory } from "@/lib/mock-data/inventory";
import type { InventoryItem, MaterialCategory } from "@/lib/schemas/inventory";
import { Warehouse, AlertTriangle, Package, TrendingDown } from "lucide-react";

const categoryLabel: Record<MaterialCategory, string> = {
  cement: "Cement",
  sand: "Sand",
  gravel: "Gravel",
  admixture: "Admixture",
  water: "Water",
  other: "Other",
};

const columns: ColumnDef<InventoryItem>[] = [
  {
    key: "name",
    label: "Material",
    sortable: true,
    render: (i) => <span className="font-medium">{i.name}</span>,
  },
  {
    key: "category",
    label: "Category",
    render: (i) => <Badge variant="outline">{categoryLabel[i.category]}</Badge>,
  },
  {
    key: "currentStock",
    label: "Stock",
    sortable: true,
    render: (i) => {
      const pct = Math.min(100, Math.round((i.currentStock / (i.minStock * 3)) * 100));
      const low = i.currentStock < i.minStock;
      return (
        <div className="flex items-center gap-2 min-w-[140px]">
          <Progress value={pct} className={low ? "[&>div]:bg-destructive" : undefined} />
          <span className={`text-sm whitespace-nowrap ${low ? "text-destructive font-medium" : ""}`}>
            {i.currentStock} {i.unit}
          </span>
        </div>
      );
    },
  },
  {
    key: "minStock",
    label: "Min Stock",
    render: (i) => <span className="text-muted-foreground">{i.minStock} {i.unit}</span>,
  },
  {
    key: "pricePerUnit",
    label: "Price / Unit",
    render: (i) => <span>{(i.pricePerUnit / 1000).toFixed(0)}k so'm/{i.unit}</span>,
  },
  {
    key: "plantId",
    label: "Plant",
    render: (i) => <span className="capitalize text-muted-foreground">{i.plantId}</span>,
  },
  {
    key: "lastUpdated",
    label: "Updated",
    render: (i) => <span className="text-muted-foreground text-sm">{i.lastUpdated}</span>,
  },
];

export default function InventoryPage() {
  const [items] = useState(mockInventory);

  const lowStock = items.filter((i) => i.currentStock < i.minStock);
  const totalValue = items.reduce((s, i) => s + i.currentStock * i.pricePerUnit, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Warehouse"
        title="Inventory"
        description="Raw material stock levels, reorder alerts, and valuation."
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button onClick={() => toast.info("Stock adjustment form coming soon")}>
              Adjust Stock
            </Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Total Items" value={String(items.length)} icon={Package} />
        <StatCard
          label="Inventory Value"
          value={`${(totalValue / 1_000_000_000).toFixed(2)} mlrd so'm`}
          icon={Warehouse}
        />
        <StatCard
          label="Low Stock Alerts"
          value={String(lowStock.length)}
          trend={lowStock.length > 0 ? "down" : "neutral"}
          icon={AlertTriangle}
        />
        <StatCard
          label="Categories"
          value="6"
          change="Cement · Sand · Gravel · Admixture"
          icon={TrendingDown}
        />
      </section>

      {lowStock.length > 0 && (
        <SectionCard
          title="Reorder Alerts"
          description="Materials below minimum threshold — order immediately"
          headerExtra={<Badge variant="destructive">{lowStock.length} critical</Badge>}
        >
          <div className="space-y-2">
            {lowStock.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md bg-destructive/5 px-4 py-2.5 text-sm"
              >
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-2 text-muted-foreground">({item.plantId})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-destructive font-medium">
                    {item.currentStock}/{item.minStock} {item.unit}
                  </span>
                  <Button size="sm" variant="outline" onClick={() => toast.info(`Create PO for ${item.name}`)}>
                    Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <SectionCard title="Stock Overview" noPadding>
        <div className="p-6 pb-0">
          <DataTable
            data={items}
            columns={columns}
            searchPlaceholder="Search materials…"
            searchKeys={["name"]}
            filters={[
              {
                key: "category",
                label: "Category",
                placeholder: "Category",
                options: Object.entries(categoryLabel).map(([v, l]) => ({ value: v, label: l })),
              },
              {
                key: "plantId",
                label: "Plant",
                placeholder: "Plant",
                options: [{ value: "tashkent", label: "Tashkent" }, { value: "angren", label: "Angren" }],
              },
            ]}
            rowActions={[
              { label: "View movements", onClick: (i) => toast.info(`Movements: ${i.name}`) },
              { label: "Adjust stock", onClick: (i) => toast.info(`Adjust: ${i.name}`) },
              { label: "Create purchase order", onClick: (i) => toast.info(`PO: ${i.name}`) },
            ]}
          />
        </div>
        <div className="h-6" />
      </SectionCard>
    </div>
  );
}
