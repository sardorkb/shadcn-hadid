"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Factory,
  Plus,
  Users,
} from "lucide-react";
import { AreaChartCard } from "@/components/charts/area-chart-card";
import { BarChartCard } from "@/components/charts/bar-chart-card";
import { GaugeCard } from "@/components/charts/gauge-card";
import { KanbanBoard, type KanbanColumn } from "@/components/kanban/kanban-board";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { FormSheet } from "@/components/shared/form-sheet";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ─── helpers ──────────────────────────────────────────────────── */

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border bg-muted/40 px-5 py-4 text-xs leading-relaxed text-foreground">
        <code>{code.trim()}</code>
      </pre>
      <Button
        size="sm"
        variant="outline"
        className="absolute right-3 top-3 h-7 text-xs"
        onClick={() => {
          navigator.clipboard.writeText(code.trim());
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}

function DocSection({
  id,
  title,
  description,
  preview,
  code,
  notes,
}: {
  id: string;
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  notes?: string[];
}) {
  return (
    <div id={id} className="scroll-mt-20 space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          {notes && <TabsTrigger value="notes">Notes</TabsTrigger>}
        </TabsList>
        <TabsContent value="preview">
          <div className="rounded-lg border bg-background p-6">{preview}</div>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock code={code} />
        </TabsContent>
        {notes && (
          <TabsContent value="notes">
            <ul className="space-y-1.5 rounded-lg border bg-muted/30 px-5 py-4">
              {notes.map((n, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="mt-0.5 shrink-0 text-muted-foreground">•</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        )}
      </Tabs>
      <Separator />
    </div>
  );
}

/* ─── demo data ─────────────────────────────────────────────────── */

interface DemoRow {
  id: string;
  name: string;
  role: string;
  status: "active" | "inactive";
  plant: string;
}

const demoRows: DemoRow[] = [
  { id: "1", name: "Sherzod Mirzaev", role: "Manager", status: "active", plant: "Tashkent" },
  { id: "2", name: "Kamol Toshev", role: "Operator", status: "active", plant: "Tashkent" },
  { id: "3", name: "Lola Ergasheva", role: "Lab Tech", status: "inactive", plant: "Angren" },
  { id: "4", name: "Aziz Qodirov", role: "Dispatcher", status: "active", plant: "Angren" },
  { id: "5", name: "Maftuna Xoliqova", role: "Accountant", status: "active", plant: "Tashkent" },
];

const demoColumns: ColumnDef<DemoRow>[] = [
  { key: "name", label: "Name", sortable: true, render: (r) => <span className="font-medium">{r.name}</span> },
  { key: "role", label: "Role", render: (r) => <Badge variant="outline">{r.role}</Badge> },
  { key: "plant", label: "Plant", render: (r) => <span className="text-muted-foreground">{r.plant}</span> },
  { key: "status", label: "Status", render: (r) => <Badge variant={r.status === "active" ? "success" : "secondary"}>{r.status}</Badge> },
];

const demoChartData = [
  { month: "Jan", revenue: 480, volume: 370 },
  { month: "Feb", revenue: 520, volume: 400 },
  { month: "Mar", revenue: 780, volume: 600 },
  { month: "Apr", revenue: 920, volume: 705 },
  { month: "May", revenue: 430, volume: 330 },
];

const demoKanban: KanbanColumn[] = [
  {
    id: "draft", title: "Draft", color: "#94a3b8",
    cards: [{ id: "k1", title: "ORD-2026-008", subtitle: "Bekobod Ta'minot", meta: "6 m³ · M200" }],
  },
  {
    id: "confirmed", title: "Confirmed", color: "#3b82f6",
    cards: [
      { id: "k2", title: "ORD-2026-002", subtitle: "Yunusobod JTMM", meta: "48 m³ · M400", badge: { label: "Pump", variant: "warning" } },
      { id: "k3", title: "ORD-2026-007", subtitle: "Navoiy Kimyo", meta: "8 m³ · M150" },
    ],
  },
  {
    id: "in-production", title: "In Production", color: "#f59e0b",
    cards: [{ id: "k4", title: "ORD-2026-001", subtitle: "Toshkent Qurilish", meta: "24 m³ · M300", badge: { label: "Pump", variant: "warning" } }],
  },
  {
    id: "delivered", title: "Delivered", color: "#10b981",
    cards: [{ id: "k5", title: "ORD-2026-005", subtitle: "Angren Sanoat", meta: "30 m³ · M250" }],
  },
];

/* ─── page ──────────────────────────────────────────────────────── */

export default function DocsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    toast.success("Saved!");
    setDrawerOpen(false);
  }

  const toc = [
    { id: "page-header", label: "PageHeader" },
    { id: "stat-card", label: "StatCard" },
    { id: "section-card", label: "SectionCard" },
    { id: "data-table", label: "DataTable" },
    { id: "form-sheet", label: "FormSheet (Drawer)" },
    { id: "kanban", label: "KanbanBoard" },
    { id: "area-chart", label: "AreaChartCard" },
    { id: "bar-chart", label: "BarChartCard" },
    { id: "gauge", label: "GaugeCard" },
    { id: "badges", label: "Badge variants" },
    { id: "empty-state", label: "EmptyState" },
  ];

  return (
    <div className="flex gap-8">
      {/* Sticky TOC */}
      <aside className="hidden w-52 shrink-0 xl:block">
        <div className="sticky top-24 space-y-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Components
          </p>
          {toc.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t.label}
            </a>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-10">
        <PageHeader
          badge="Developer Reference"
          title="Component Library"
          description="All shared components used across Hadid Beton ERP. Click the Code tab to copy usage."
        />

        {/* How to add a new page */}
        <SectionCard title="How to add a new module page">
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">Three steps to create any new ERP page:</p>
            <CodeBlock code={`// 1. Create the page file
// app/(dashboard)/my-module/page.tsx

import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function MyModulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        badge="Module Label"
        title="My Module"
        description="Brief description of what this module does."
        actions={
          <Button><Plus className="size-4" />New Item</Button>
        }
      />
      {/* Add StatCards, DataTable, SectionCards here */}
    </div>
  );
}

// 2. Add to config/menu.ts mainMenu array:
{ title: "My Module", href: "/my-module", icon: SomeIcon }

// 3. Add mock data in lib/mock-data/my-module.ts
// and the API wrapper in lib/api/my-module.ts`} />
          </div>
        </SectionCard>

        <Separator />

        {/* ── PageHeader ── */}
        <DocSection
          id="page-header"
          title="PageHeader"
          description="Standard page title block with optional badge label and action slot on the right."
          preview={
            <PageHeader
              badge="Module label"
              title="Page Title"
              description="A short description of this page's purpose for the user."
              actions={
                <>
                  <Button variant="outline"><Download className="size-4" />Export</Button>
                  <Button><Plus className="size-4" />Create</Button>
                </>
              }
            />
          }
          code={`import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

<PageHeader
  badge="Module label"          // optional grey chip
  title="Page Title"
  description="A short description."
  actions={
    <>
      <Button variant="outline">Export</Button>
      <Button><Plus className="size-4" />Create</Button>
    </>
  }
/>`}
          notes={[
            "`badge` is optional — omit it for pages without a module category label.",
            "`actions` accepts any ReactNode — typically 1–2 Buttons.",
            "Stacks vertically on mobile, side-by-side on lg screens.",
          ]}
        />

        {/* ── StatCard ── */}
        <DocSection
          id="stat-card"
          title="StatCard"
          description="KPI card with icon, large value, and optional trend indicator."
          preview={
            <div className="grid grid-cols-3 gap-4">
              <StatCard label="Today's Volume" value="114 m³" change="+8% vs yesterday" trend="up" icon={Factory} />
              <StatCard label="Active Deliveries" value="3" change="5 orders pending" trend="neutral" icon={CheckCircle2} />
              <StatCard label="Overdue Invoices" value="100 mln so'm" change="1 invoice" trend="down" icon={AlertTriangle} />
            </div>
          }
          code={`import { StatCard } from "@/components/shared/stat-card";
import { Factory } from "lucide-react";

<StatCard
  label="Today's Volume"
  value="114 m³"
  change="+8% vs yesterday"   // optional
  trend="up"                   // "up" | "down" | "neutral"
  icon={Factory}               // any lucide icon
/>`}
          notes={[
            "`trend='up'` shows green arrow, `trend='down'` shows amber arrow, `trend='neutral'` shows text only.",
            "Wrap multiple StatCards in a `<section className='grid gap-4 sm:grid-cols-4'>` to get the standard KPI row.",
          ]}
        />

        {/* ── SectionCard ── */}
        <DocSection
          id="section-card"
          title="SectionCard"
          description="Titled card wrapper. Use for content blocks inside a page."
          preview={
            <SectionCard
              title="Recent Orders"
              description="Last 5 confirmed orders"
              headerExtra={<Badge variant="success">Live</Badge>}
            >
              <p className="text-sm text-muted-foreground">Your content goes here.</p>
            </SectionCard>
          }
          code={`import { SectionCard } from "@/components/shared/section-card";

<SectionCard
  title="Recent Orders"
  description="Last 5 confirmed orders"    // optional
  headerExtra={<Badge>Live</Badge>}         // optional — rendered top-right
  noPadding                                // optional — removes CardContent padding
>
  <p>Your content</p>
</SectionCard>`}
        />

        {/* ── DataTable ── */}
        <DocSection
          id="data-table"
          title="DataTable"
          description="Full-featured table: search, column filters, sort, pagination, row actions, alternating rows."
          preview={
            <DataTable
              data={demoRows}
              columns={demoColumns}
              searchPlaceholder="Search employees…"
              searchKeys={["name", "role"]}
              filters={[
                { key: "plant", label: "Plant", placeholder: "Plant", options: [{ value: "Tashkent", label: "Tashkent" }, { value: "Angren", label: "Angren" }] },
                { key: "status", label: "Status", placeholder: "Status", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
              ]}
              rowActions={[
                { label: "Edit", onClick: (r) => toast.info(`Edit ${r.name}`) },
                { label: "Delete", onClick: (r) => toast.warning(`Delete ${r.name}`), variant: "destructive" },
              ]}
              pageSize={3}
            />
          }
          code={`import { DataTable, type ColumnDef } from "@/components/shared/data-table";

interface Item { id: string; name: string; role: string; status: string }

const columns: ColumnDef<Item>[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
    render: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    key: "status",
    label: "Status",
    render: (row) => <Badge variant="success">{row.status}</Badge>,
  },
];

<DataTable
  data={items}                          // T[] where T has an id field
  columns={columns}
  searchPlaceholder="Search…"
  searchKeys={["name", "role"]}         // which fields to search
  filters={[
    {
      key: "status",
      label: "Status",
      placeholder: "Status",
      options: [{ value: "active", label: "Active" }],
    },
  ]}
  rowActions={[
    { label: "Edit", onClick: (row) => handleEdit(row) },
    { label: "Delete", onClick: (row) => handleDelete(row), variant: "destructive" },
  ]}
  onRowClick={(row) => router.push(\`/items/\${row.id}\`)}
  pageSize={10}
  toolbar={<Button>Export</Button>}     // optional right-side toolbar
/>`}
          notes={[
            "Every item in `data` must have an `id: string | number` field.",
            "`searchKeys` controls which fields the search input checks.",
            "`filters` generates Select dropdowns — each `key` must match a field on your data object.",
            "Pass `noPadding` to the parent `SectionCard` when the table sits directly inside a card.",
          ]}
        />

        {/* ── FormSheet ── */}
        <DocSection
          id="form-sheet"
          title="FormSheet (Drawer)"
          description="Slide-in panel for create/edit forms. Sticky header + scrollable body + sticky footer."
          preview={
            <div className="flex items-center gap-3">
              <Button onClick={() => setDrawerOpen(true)}>
                <Plus className="size-4" />
                Open Drawer
              </Button>
              <span className="text-sm text-muted-foreground">Click to see the live drawer →</span>
              <FormSheet
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                title="New Item"
                description="Fill in the details and click Save."
                onSubmit={handleSave}
                isSubmitting={saving}
                submitLabel="Save item"
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Item name</Label>
                    <Input placeholder="Enter name…" />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Category</Label>
                    <Input placeholder="Category…" />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">Active</p>
                      <p className="text-xs text-muted-foreground">Enable this item</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </FormSheet>
            </div>
          }
          code={`"use client";
import { useState } from "react";
import { toast } from "sonner";
import { FormSheet } from "@/components/shared/form-sheet";

function MyPage() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await saveToApi(formData);   // your actual save logic
    setSaving(false);
    toast.success("Saved successfully");
    setOpen(false);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>New Item</Button>

      <FormSheet
        open={open}
        onOpenChange={setOpen}
        title="New Item"
        description="Fill in the details."
        onSubmit={handleSave}
        isSubmitting={saving}
        submitLabel="Create Item"
        width="md"               // "sm" | "md" | "lg"
      >
        {/* your form fields here */}
        <Input placeholder="Name" />
      </FormSheet>
    </>
  );
}`}
          notes={[
            "Uses Radix UI Sheet under the hood — slides in from the right edge.",
            "Clicking outside the drawer does NOT close it (prevents accidental loss of form data).",
            "The footer with Cancel/Save is only rendered when `onSubmit` is provided.",
            "`isSubmitting` shows a spinner on the Save button and disables it.",
          ]}
        />

        {/* ── KanbanBoard ── */}
        <DocSection
          id="kanban"
          title="KanbanBoard"
          description="Horizontal scrollable kanban with typed columns and cards."
          preview={<KanbanBoard columns={demoKanban} onCardClick={(c) => toast.info(c.title)} />}
          code={`import { KanbanBoard, type KanbanColumn } from "@/components/kanban/kanban-board";

const columns: KanbanColumn[] = [
  {
    id: "draft",
    title: "Draft",
    color: "#94a3b8",   // optional dot color
    cards: [
      {
        id: "k1",
        title: "ORD-2026-008",
        subtitle: "Bekobod Ta'minot",
        meta: "6 m³ · M200",
        badge: { label: "Pump", variant: "warning" },
      },
    ],
  },
];

<KanbanBoard
  columns={columns}
  onCardClick={(card, columnId) => console.log(card.id, columnId)}
/>`}
        />

        {/* ── Charts ── */}
        <DocSection
          id="area-chart"
          title="AreaChartCard"
          description="Time-series area chart inside a Card. All Recharts — responsive."
          preview={
            <AreaChartCard
              title="Monthly Revenue"
              description="mln so'm"
              data={demoChartData}
              xKey="month"
              yKey="revenue"
              height={220}
            />
          }
          code={`import { AreaChartCard } from "@/components/charts/area-chart-card";

<AreaChartCard
  title="Monthly Revenue"
  description="mln so'm"
  data={[{ month: "Jan", revenue: 480 }, ...]}
  xKey="month"
  yKey="revenue"
  yLabel="mln so'm"               // optional Y axis label
  color="hsl(var(--primary))"     // optional line color
  height={280}                    // optional height (default 280)
  headerExtra={<Badge>Live</Badge>}
/>`}
        />

        <DocSection
          id="bar-chart"
          title="BarChartCard"
          description="Grouped or single-series bar chart."
          preview={
            <BarChartCard
              title="Volume by Grade"
              data={[
                { grade: "M200", m3: 68 },
                { grade: "M300", m3: 96 },
                { grade: "M400", m3: 48 },
              ]}
              xKey="grade"
              bars={[{ key: "m3", label: "m³" }]}
              height={220}
            />
          }
          code={`import { BarChartCard } from "@/components/charts/bar-chart-card";

<BarChartCard
  title="Volume by Grade"
  data={[{ grade: "M200", m3: 68 }, ...]}
  xKey="grade"
  bars={[
    { key: "m3", label: "Volume (m³)" },
    { key: "target", label: "Target", color: "#f59e0b" },  // multi-bar
  ]}
/>`}
        />

        <DocSection
          id="gauge"
          title="GaugeCard"
          description="Radial gauge for utilization percentages."
          preview={<GaugeCard title="Plant Utilization" description="Today vs capacity" value={72} />}
          code={`import { GaugeCard } from "@/components/charts/gauge-card";

<GaugeCard
  title="Plant Utilization"
  description="Today vs capacity"
  value={72}
  max={100}      // default 100
  unit="%"       // default "%"
  color="hsl(var(--primary))"   // optional
/>`}
        />

        {/* ── Badge variants ── */}
        <DocSection
          id="badges"
          title="Badge variants"
          description="All available Badge variants for status indicators."
          preview={
            <div className="flex flex-wrap gap-3">
              {[
                ["default", "Default"],
                ["secondary", "Secondary"],
                ["outline", "Outline"],
                ["success", "Success"],
                ["warning", "Warning"],
                ["destructive", "Destructive"],
              ].map(([v, l]) => (
                <Badge key={v} variant={v as "default" | "secondary" | "outline" | "success" | "warning" | "destructive"}>
                  {l}
                </Badge>
              ))}
            </div>
          }
          code={`import { Badge } from "@/components/ui/badge";

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Blocked</Badge>
<Badge variant="secondary">Inactive</Badge>
<Badge variant="outline">Draft</Badge>`}
          notes={[
            "`success` = emerald (active, delivered, paid).",
            "`warning` = amber (pending, in-production, partial).",
            "`destructive` = red (blocked, failed, overdue, cancelled).",
            "`secondary` = muted grey (inactive, on-leave, neutral states).",
          ]}
        />

        {/* ── EmptyState ── */}
        <DocSection
          id="empty-state"
          title="EmptyState"
          description="Placeholder rendered inside DataTable or empty lists."
          preview={
            <EmptyState
              message="No orders found"
              description="Try adjusting your search or filters."
              action={<Button size="sm"><Plus className="size-4" />New Order</Button>}
            />
          }
          code={`import { EmptyState } from "@/components/shared/empty-state";

<EmptyState
  message="No orders found"
  description="Try adjusting your search or filters."
  action={<Button size="sm">New Order</Button>}
/>`}
        />

        {/* ── Swapping mock for real API ── */}
        <SectionCard title="Replacing mock data with a real API">
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              Every module has a thin API layer in <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/api/</code>.
              Swap the implementation in one file — the page components don't change.
            </p>
            <CodeBlock code={`// lib/api/customers.ts — current (mock)
import { mockCustomers } from "@/lib/mock-data/customers";
export async function getCustomers() {
  return mockCustomers;
}

// lib/api/customers.ts — after swap (real API)
export async function getCustomers() {
  const res = await fetch("/api/customers");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

// The page component stays exactly the same:
const customers = await getCustomers();`} />
            <p className="text-muted-foreground">
              Zod schemas in <code className="rounded bg-muted px-1 py-0.5 text-xs">lib/schemas/</code> validate the response shape in both cases.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
