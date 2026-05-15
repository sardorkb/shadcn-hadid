"use client";

import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const plants = [
  { id: "tashkent", name: "Toshkent Plant", location: "Yunusobod tumani, Toshkent", capacity: 300, active: true },
  { id: "angren", name: "Angren Plant", location: "Sanoat hududi, Angren", capacity: 150, active: true },
];

const roles = [
  { name: "Admin", desc: "Full system access", users: 1 },
  { name: "Manager", desc: "All modules except user management", users: 2 },
  { name: "Dispatcher", desc: "Orders, fleet, production schedule", users: 1 },
  { name: "Operator", desc: "Production and batching only", users: 2 },
  { name: "Driver", desc: "Delivery tickets (mobile view)", users: 9 },
  { name: "Lab Tech", desc: "Quality control module", users: 1 },
  { name: "Accountant", desc: "Finance and reports", users: 1 },
];

const priceList = [
  { grade: "M150", price: 1_050_000 },
  { grade: "M200", price: 1_200_000 },
  { grade: "M250", price: 1_300_000 },
  { grade: "M300", price: 1_450_000 },
  { grade: "M350", price: 1_600_000 },
  { grade: "M400", price: 1_750_000 },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Company profile, plants, users, mix design library, and system preferences."
        actions={
          <Button onClick={() => toast.success("Settings saved")}>Save Changes</Button>
        }
      />

      <Tabs defaultValue="company">
        <TabsList className="mb-6">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="plants">Plants</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="pricelist">Price List</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <SectionCard title="Company Profile">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Company Name", value: "Hadid Beton MChJ" },
                { label: "Tax ID (INN)", value: "302415678" },
                { label: "Phone", value: "+998 71 200 00 01" },
                { label: "Email", value: "info@hadid-beton.uz" },
                { label: "Address", value: "Toshkent shahri, Yunusobod tumani" },
                { label: "Bank Account", value: "20208000100123456789" },
              ].map((f) => (
                <div key={f.label} className="space-y-1.5">
                  <Label>{f.label}</Label>
                  <Input defaultValue={f.value} />
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="plants">
          <div className="space-y-4">
            {plants.map((plant) => (
              <SectionCard
                key={plant.id}
                title={plant.name}
                description={plant.location}
                headerExtra={<Badge variant={plant.active ? "success" : "secondary"}>{plant.active ? "Active" : "Inactive"}</Badge>}
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label>Plant Name</Label>
                    <Input defaultValue={plant.name} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Location</Label>
                    <Input defaultValue={plant.location} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Daily Capacity (m³)</Label>
                    <Input type="number" defaultValue={plant.capacity} />
                  </div>
                </div>
              </SectionCard>
            ))}
            <Button variant="outline" onClick={() => toast.info("Add plant form coming soon")}>
              Add Plant
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <SectionCard title="Roles & Permissions (RBAC)">
            <div className="space-y-3">
              {roles.map((role) => (
                <div key={role.name} className="flex items-center justify-between rounded-lg border px-4 py-3">
                  <div>
                    <p className="font-medium text-sm">{role.name}</p>
                    <p className="text-xs text-muted-foreground">{role.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{role.users} user{role.users !== 1 ? "s" : ""}</Badge>
                    <Button size="sm" variant="outline" onClick={() => toast.info(`Edit role: ${role.name}`)}>
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button onClick={() => toast.info("Invite user form coming soon")}>Invite User</Button>
          </SectionCard>
        </TabsContent>

        <TabsContent value="pricelist">
          <SectionCard title="Standard Price List" description="Base price per m³ — exclusive of pump surcharge and delivery distance">
            <div className="space-y-3">
              {priceList.map((p) => (
                <div key={p.grade} className="flex items-center gap-4">
                  <Badge variant="outline" className="w-16 justify-center">{p.grade}</Badge>
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      type="number"
                      defaultValue={p.price}
                      className="max-w-[200px]"
                      step={50_000}
                    />
                    <span className="text-sm text-muted-foreground">so'm / m³</span>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground">Pump truck surcharge: <Input className="inline-block w-32 mx-2" defaultValue="350000" type="number" /> so'm / m³</p>
          </SectionCard>
        </TabsContent>

        <TabsContent value="preferences">
          <SectionCard title="System Preferences">
            <div className="space-y-5">
              {[
                { label: "Language", desc: "Default UI language", value: "English (EN)" },
                { label: "Currency", desc: "Display currency", value: "UZS — Uzbek So'm" },
                { label: "Volume Unit", desc: "Concrete volume", value: "m³" },
                { label: "Weight Unit", desc: "Raw materials", value: "kg / ton" },
              ].map((p) => (
                <div key={p.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{p.value}</span>
                </div>
              ))}
              <Separator />
              {[
                { label: "Email notifications", desc: "Receive order and invoice alerts" },
                { label: "Low stock alerts", desc: "Notify when materials hit minimum threshold" },
                { label: "Daily production report", desc: "Auto-generate and email at 18:00" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                  <Switch defaultChecked onClick={() => toast.info(`Toggle: ${s.label}`)} />
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
