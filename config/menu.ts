import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  ClipboardCheck,
  Coins,
  Container,
  Factory,
  FileText,
  Gauge,
  Settings,
  ShoppingCart,
  Truck,
  UserRound,
  Users,
  Warehouse,
} from "lucide-react";

export type MenuChild = {
  title: string;
  href: string;
  badge?: string;
};

export type MenuItem = {
  title: string;
  href?: string;
  icon: LucideIcon;
  badge?: string;
  children?: MenuChild[];
};

export const mainMenu: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Building2,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    badge: "3",
  },
  {
    title: "Production",
    icon: Factory,
    children: [
      { title: "Schedule", href: "/production" },
      { title: "Mix Designs", href: "/production/mix-designs" },
      { title: "Batch Tickets", href: "/production/batches" },
    ],
  },
  {
    title: "Quality Control",
    href: "/quality",
    icon: ClipboardCheck,
  },
  {
    title: "Fleet & Logistics",
    icon: Truck,
    children: [
      { title: "Trucks", href: "/fleet" },
      { title: "Delivery Tickets", href: "/fleet/deliveries" },
    ],
  },
  {
    title: "Inventory",
    icon: Warehouse,
    children: [
      { title: "Stock", href: "/inventory" },
      { title: "Movements", href: "/inventory/movements" },
    ],
  },
  {
    title: "Purchasing",
    icon: Container,
    children: [
      { title: "Suppliers", href: "/purchasing" },
      { title: "Purchase Orders", href: "/purchasing/orders" },
    ],
  },
  {
    title: "HR",
    href: "/hr",
    icon: UserRound,
  },
  {
    title: "Finance",
    icon: Coins,
    children: [
      { title: "Invoices", href: "/finance" },
      { title: "Payments", href: "/finance/payments" },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const secondaryMenu: MenuItem[] = [
  { title: "Documentation", href: "/docs", icon: FileText },
];
