import {
  ArrowUpDown,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const orders = [
  {
    id: "SO-10492",
    customer: "Toshkent Qurilish",
    channel: "Ulgurji",
    owner: "M. Chen",
    date: "14-may, 2026",
    total: "1.06 mlrd so'm",
    status: "Chiqarildi",
    priority: "Yuqori",
  },
  {
    id: "SO-10491",
    customer: "Samarqand Beton Servis",
    channel: "Chakana",
    owner: "S. Kim",
    date: "14-may, 2026",
    total: "157 mln so'm",
    status: "Yuklanmoqda",
    priority: "Oddiy",
  },
  {
    id: "SO-10490",
    customer: "Meridian Qurilish",
    channel: "Loyiha",
    owner: "A. Patel",
    date: "13-may, 2026",
    total: "2.91 mlrd so'm",
    status: "Kredit blok",
    priority: "Yuqori",
  },
  {
    id: "SO-10489",
    customer: "Bekobod Ta'minot",
    channel: "Distribyutor",
    owner: "L. Carter",
    date: "13-may, 2026",
    total: "398 mln so'm",
    status: "Tasdiqlandi",
    priority: "Oddiy",
  },
  {
    id: "SO-10488",
    customer: "Chirchiq Maxsus Qurilish",
    channel: "Ulgurji",
    owner: "N. Brooks",
    date: "12-may, 2026",
    total: "714 mln so'm",
    status: "Fakturalandi",
    priority: "Past",
  },
];

function statusVariant(status: string): "warning" | "success" | "secondary" {
  if (status === "Kredit blok") return "warning";
  if (status === "Fakturalandi" || status === "Chiqarildi") return "success";
  return "secondary";
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge variant="outline" className="mb-3 bg-background">
            Sotuv operatsiyalari
          </Badge>
          <h1 className="text-3xl font-semibold tracking-normal">Sotuv buyurtmalari</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Buyurtmalar oqimi, kredit nazorati, yuklash holati va tushum chiqarilishini kuzating.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="size-4" />
            Eksport
          </Button>
          <Button>
            <Plus className="size-4" />
            Yangi buyurtma
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["Bugungi buyurtmalar", "4.13 mlrd so'm", "24 ta buyurtma yaratildi"],
          ["Kredit nazorati", "2.91 mlrd so'm", "1 ta mijoz blokda"],
          ["Jo'natishga tayyor", "418", "37 ta buyurtmadagi mahsulotlar"],
        ].map(([label, value, detail]) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-2xl">{value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="shadow-soft">
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Buyurtmalar reyestri</CardTitle>
              <CardDescription>Mijoz va bajarilish holati bo'yicha jonli savdo navbati</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Filter className="size-4" />
                Filtrlar
              </Button>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="size-4" />
                Ustunlar
              </Button>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Buyurtma, mijoz yoki mas'ulni qidirish" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Holat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha holatlar</SelectItem>
                <SelectItem value="released">Chiqarildi</SelectItem>
                <SelectItem value="picking">Yuklanmoqda</SelectItem>
                <SelectItem value="hold">Kredit blok</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="30">
              <SelectTrigger>
                <SelectValue placeholder="Davr" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">So'nggi 7 kun</SelectItem>
                <SelectItem value="30">So'nggi 30 kun</SelectItem>
                <SelectItem value="90">So'nggi 90 kun</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-secondary/70 text-muted-foreground">
                <tr>
                  {["Buyurtma", "Mijoz", "Kanal", "Mas'ul", "Sana", "Jami", "Holat", "Ustuvorlik", ""].map(
                    (header) => (
                      <th key={header} className="h-11 px-5 text-left font-medium">
                        <span className="inline-flex items-center gap-1">
                          {header}
                          {header ? <ArrowUpDown className="size-3.5" /> : null}
                        </span>
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t transition-colors hover:bg-secondary/35">
                    <td className="px-5 py-4 font-medium">{order.id}</td>
                    <td className="px-5 py-4">{order.customer}</td>
                    <td className="px-5 py-4 text-muted-foreground">{order.channel}</td>
                    <td className="px-5 py-4 text-muted-foreground">{order.owner}</td>
                    <td className="px-5 py-4 text-muted-foreground">{order.date}</td>
                    <td className="px-5 py-4 font-medium">{order.total}</td>
                    <td className="px-5 py-4">
                      <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={order.priority === "Yuqori" ? "warning" : "outline"}>
                        {order.priority}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={`${order.id} amallari`}>
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Buyurtmani ochish</DropdownMenuItem>
                          <DropdownMenuItem>Blokdan chiqarish</DropdownMenuItem>
                          <DropdownMenuItem>Tasdiq yuborish</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
