"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockOrders } from "@/lib/mock-data/orders";
import { Factory, Layers, Timer, CheckCircle2 } from "lucide-react";

const mixDesigns = [
  { grade: "M150", cement: 220, sand: 810, gravel: 1100, water: 180, admixture: 0.8 },
  { grade: "M200", cement: 280, sand: 780, gravel: 1080, water: 175, admixture: 1.0 },
  { grade: "M250", cement: 330, sand: 750, gravel: 1060, water: 170, admixture: 1.2 },
  { grade: "M300", cement: 380, sand: 720, gravel: 1040, water: 165, admixture: 1.5 },
  { grade: "M350", cement: 420, sand: 690, gravel: 1020, water: 160, admixture: 1.8 },
  { grade: "M400", cement: 480, sand: 660, gravel: 1000, water: 155, admixture: 2.0 },
];

export default function ProductionPage() {
  const [activeTab, setActiveTab] = useState<"schedule" | "designs">("schedule");

  const todayOrders = mockOrders.filter(
    (o) => o.scheduledAt.startsWith("2026-05-15") && o.status !== "cancelled"
  );
  const inProd = todayOrders.filter((o) => o.status === "in-production").length;
  const totalM3 = todayOrders.reduce((s, o) => s + o.volumeM3, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        badge="Production"
        title="Daily Schedule"
        description="Today's batching schedule, mix designs, and plant utilization."
        actions={
          <>
            <Button variant="outline" onClick={() => setActiveTab("designs")}>Mix Designs</Button>
            <Button onClick={() => toast.info("Create batch form coming soon")}>Start Batch</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Today's Orders" value={String(todayOrders.length)} icon={Factory} />
        <StatCard label="Total Volume" value={`${totalM3} m³`} trend="up" icon={Layers} />
        <StatCard label="In Production" value={String(inProd)} icon={Timer} />
        <StatCard
          label="Completed Today"
          value={String(todayOrders.filter((o) => ["delivered", "invoiced"].includes(o.status)).length)}
          trend="up"
          icon={CheckCircle2}
        />
      </section>

      {activeTab === "schedule" && (
        <SectionCard title="Today's Batch Schedule — 15 May 2026">
          <div className="space-y-3">
            {todayOrders.map((order) => {
              const time = new Date(order.scheduledAt).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div
                  key={order.id}
                  className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 text-center">
                      <p className="text-lg font-bold">{time}</p>
                      <p className="text-xs text-muted-foreground">{order.plantId}</p>
                    </div>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Badge variant="outline">{order.mixGrade}</Badge>
                    <Badge variant="secondary">{order.volumeM3} m³</Badge>
                    {order.pumpTruck && <Badge variant="warning">Pump Required</Badge>}
                    <Badge
                      variant={
                        order.status === "in-production"
                          ? "warning"
                          : order.status === "delivered"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}

      {activeTab === "designs" && (
        <SectionCard title="Mix Design Library" description="kg per 1 m³ of concrete">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  {["Grade", "Cement kg", "Sand kg", "Gravel kg", "Water L", "Admixture kg", "W/C ratio"].map(
                    (h) => (
                      <th key={h} className="pb-3 pr-4 font-medium">{h}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {mixDesigns.map((d) => (
                  <tr key={d.grade} className="border-b hover:bg-secondary/20">
                    <td className="py-3 pr-4 font-semibold">{d.grade}</td>
                    <td className="py-3 pr-4">{d.cement}</td>
                    <td className="py-3 pr-4">{d.sand}</td>
                    <td className="py-3 pr-4">{d.gravel}</td>
                    <td className="py-3 pr-4">{d.water}</td>
                    <td className="py-3 pr-4">{d.admixture}</td>
                    <td className="py-3 pr-4">{(d.water / d.cement).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
