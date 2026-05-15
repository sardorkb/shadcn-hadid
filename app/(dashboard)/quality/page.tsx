"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, CheckCircle2, XCircle, Clock } from "lucide-react";

interface Sample {
  id: string;
  batchId: string;
  orderId: string;
  grade: string;
  slump: number;
  day7Strength: number | null;
  day28Strength: number | null;
  requiredStrength: number;
  takenAt: string;
  status: "pending-7d" | "pending-28d" | "pass" | "fail";
  technician: string;
}

const mockSamples: Sample[] = [
  { id: "QC-001", batchId: "BATCH-001", orderId: "ORD-2026-001", grade: "M300", slump: 14, day7Strength: 24.8, day28Strength: null, requiredStrength: 30, takenAt: "2026-05-15", status: "pending-28d", technician: "Lola Ergasheva" },
  { id: "QC-002", batchId: "BATCH-002", orderId: "ORD-2026-003", grade: "M200", slump: 12, day7Strength: 16.2, day28Strength: null, requiredStrength: 20, takenAt: "2026-05-15", status: "pending-28d", technician: "Lola Ergasheva" },
  { id: "QC-003", batchId: "BATCH-099", orderId: "ORD-2026-098", grade: "M400", slump: 11, day7Strength: 35.1, day28Strength: 47.5, requiredStrength: 40, takenAt: "2026-04-17", status: "pass", technician: "Lola Ergasheva" },
  { id: "QC-004", batchId: "BATCH-098", orderId: "ORD-2026-095", grade: "M300", slump: 16, day7Strength: 18.9, day28Strength: 26.4, requiredStrength: 30, takenAt: "2026-04-16", status: "fail", technician: "Lola Ergasheva" },
  { id: "QC-005", batchId: "BATCH-097", orderId: "ORD-2026-090", grade: "M250", slump: 13, day7Strength: 20.5, day28Strength: null, requiredStrength: 25, takenAt: "2026-05-08", status: "pending-28d", technician: "Lola Ergasheva" },
  { id: "QC-006", batchId: "BATCH-095", orderId: "ORD-2026-085", grade: "M200", slump: 12, day7Strength: 17.1, day28Strength: 23.8, requiredStrength: 20, takenAt: "2026-04-10", status: "pass", technician: "Lola Ergasheva" },
];

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "secondary" | "outline" }> = {
  "pending-7d":  { label: "Awaiting 7d",  variant: "secondary" },
  "pending-28d": { label: "Awaiting 28d", variant: "warning"   },
  pass:          { label: "Pass",          variant: "success"   },
  fail:          { label: "Fail",          variant: "destructive"},
};

const columns: ColumnDef<Sample>[] = [
  { key: "id", label: "Sample", sortable: true, render: (s) => <span className="font-medium">{s.id}</span> },
  { key: "orderId", label: "Order", render: (s) => <span className="text-muted-foreground">{s.orderId}</span> },
  { key: "grade", label: "Grade", render: (s) => <Badge variant="outline">{s.grade}</Badge> },
  { key: "slump", label: "Slump (cm)", render: (s) => <span>{s.slump} cm</span> },
  {
    key: "day7Strength",
    label: "7-day (MPa)",
    render: (s) => <span>{s.day7Strength != null ? `${s.day7Strength} MPa` : "—"}</span>,
  },
  {
    key: "day28Strength",
    label: "28-day (MPa)",
    render: (s) => (
      <span className={s.day28Strength != null && s.day28Strength < s.requiredStrength ? "text-destructive font-medium" : ""}>
        {s.day28Strength != null ? `${s.day28Strength} MPa` : "—"}
      </span>
    ),
  },
  { key: "requiredStrength", label: "Required", render: (s) => <span className="text-muted-foreground">{s.requiredStrength} MPa</span> },
  { key: "takenAt", label: "Taken", sortable: true, render: (s) => <span className="text-muted-foreground text-sm">{s.takenAt}</span> },
  { key: "status", label: "Status", render: (s) => <Badge variant={statusConfig[s.status].variant}>{statusConfig[s.status].label}</Badge> },
];

export default function QualityPage() {
  const [samples] = useState(mockSamples);

  const passing = samples.filter((s) => s.status === "pass").length;
  const failing = samples.filter((s) => s.status === "fail").length;
  const pending = samples.filter((s) => s.status.startsWith("pending")).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lab Samples"
        description="Slump tests, 7-day and 28-day compressive strength tracking per batch."
        actions={
          <>
            <Button variant="outline">Export Report</Button>
            <Button onClick={() => toast.info("New sample form coming soon")}>Log Sample</Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Total Samples" value={String(samples.length)} icon={ClipboardCheck} />
        <StatCard label="Passing" value={String(passing)} trend="up" icon={CheckCircle2} />
        <StatCard label="Failing" value={String(failing)} trend={failing > 0 ? "down" : "neutral"} icon={XCircle} />
        <StatCard label="Awaiting Results" value={String(pending)} icon={Clock} />
      </section>

      <SectionCard title="Sample Register" noPadding>
        <div className="p-6 pb-0">
          <DataTable
            data={samples}
            columns={columns}
            searchPlaceholder="Search by sample or order ID…"
            searchKeys={["id", "orderId", "batchId"]}
            filters={[
              {
                key: "status",
                label: "Status",
                placeholder: "Status",
                options: Object.entries(statusConfig).map(([v, c]) => ({ value: v, label: c.label })),
              },
              {
                key: "grade",
                label: "Grade",
                placeholder: "Grade",
                options: ["M150","M200","M250","M300","M350","M400"].map((g) => ({ value: g, label: g })),
              },
            ]}
            rowActions={[
              { label: "Enter 7d result", onClick: (s) => toast.info(`7d result for ${s.id}`) },
              { label: "Enter 28d result", onClick: (s) => toast.info(`28d result for ${s.id}`) },
              { label: "Generate report", onClick: (s) => toast.info(`Report for ${s.id}`) },
            ]}
          />
        </div>
        <div className="h-6" />
      </SectionCard>
    </div>
  );
}
