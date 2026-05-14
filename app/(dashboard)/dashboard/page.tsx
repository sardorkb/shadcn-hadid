import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeDollarSign,
  Boxes,
  CircleDollarSign,
  Clock3,
  PackageCheck,
  Receipt,
  Route,
  ShoppingCart,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const kpis = [
  {
    label: "Sof tushum",
    value: "23.4 mlrd so'm",
    change: "+12.4%",
    trend: "up",
    icon: CircleDollarSign,
  },
  {
    label: "Ochiq buyurtmalar",
    value: "1,284",
    change: "+7.8%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    label: "Ombor qiymati",
    value: "91.6 mlrd so'm",
    change: "-2.1%",
    trend: "down",
    icon: Boxes,
  },
  {
    label: "Yetkazish sifati",
    value: "96.8%",
    change: "+1.9%",
    trend: "up",
    icon: PackageCheck,
  },
];

const revenueBars = [62, 78, 55, 88, 74, 91, 82, 96, 86, 100, 94, 108];

const operations = [
  { label: "Yuklash", value: "418", detail: "navbatdagi buyurtmalar", icon: PackageCheck },
  { label: "Jo'natish", value: "136", detail: "rejalangan reyslar", icon: Route },
  { label: "Debitor qarz", value: "5.3 mlrd", detail: "shu hafta muddati", icon: Receipt },
  { label: "Tasdiqlar", value: "27", detail: "harakat kutilmoqda", icon: Clock3 },
];

const activity = [
  ["SO-10482", "Toshkent Qurilish", "1.06 mlrd so'm", "Chiqarildi"],
  ["PO-39218", "Bekobod Ta'minot", "398 mln so'm", "Ko'rib chiqish"],
  ["INV-77842", "Hadid Beton", "250 mln so'm", "To'landi"],
  ["TR-22109", "Markaziy ombor", "420 dona", "Yo'lda"],
];

const monthLabels = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyn",
  "Iyl",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="outline" className="mb-3 bg-background">
            Korxona boshqaruvi
          </Badge>
          <h1 className="text-3xl font-semibold tracking-normal">Boshqaruv paneli</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Bugungi ish jarayoni uchun moliya, ombor, sotuv va logistika ko'rsatkichlari.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Eksport</Button>
          <Button>
            <TrendingUp className="size-4" />
            Prognoz
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const up = kpi.trend === "up";
          return (
            <Card key={kpi.label} className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                <div className="rounded-md bg-secondary p-2">
                  <Icon className="size-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{kpi.value}</div>
                <div className="mt-2 flex items-center gap-1 text-sm">
                  {up ? (
                    <ArrowUpRight className="size-4 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="size-4 text-amber-600" />
                  )}
                  <span className={up ? "text-emerald-600" : "text-amber-600"}>{kpi.change}</span>
                  <span className="text-muted-foreground">o'tgan oyga nisbatan</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Tushum dinamikasi</CardTitle>
              <CardDescription>Hadid Beton bo'yicha oylik tan olingan tushum</CardDescription>
            </div>
            <Badge variant="success">Barqaror oqim</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex h-72 items-end gap-3 rounded-md border bg-secondary/35 p-4">
              {revenueBars.map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-primary shadow-sm"
                    style={{ height: `${height * 1.9}px` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {monthLabels[index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Ish navbati</CardTitle>
            <CardDescription>Bo'limlar bo'yicha ustuvor vazifalar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {operations.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-md bg-secondary">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <p className="text-sm font-semibold">{item.value}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>So'nggi harakatlar</CardTitle>
            <CardDescription>Operatsion holatga ta'sir qilgan tranzaksiyalar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.map(([id, company, amount, status]) => (
                <div key={id} className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{id}</p>
                    <p className="truncate text-xs text-muted-foreground">{company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{amount}</p>
                    <p className="text-xs text-muted-foreground">{status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pul aylanishi</CardTitle>
            <CardDescription>Yo'nalishlar bo'yicha aylanma kapital holati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                ["Debitor qarz", "42 kun", "72%"],
                ["Kreditor qarz", "31 kun", "55%"],
                ["Ombor", "24 kun", "46%"],
                ["Naqd zaxira", "30.4 mlrd so'm", "81%"],
              ].map(([label, value, width]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-2 rounded-full bg-accent" style={{ width }} />
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-5" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Moliyaviy zaxira</p>
                <p className="text-xs text-muted-foreground">90 kunlik operatsion reja asosida</p>
              </div>
              <Badge variant="success">
                <BadgeDollarSign className="mr-1 size-3.5" />
                9.8 oy
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
