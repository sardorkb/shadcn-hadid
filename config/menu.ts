import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Boxes,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  Gauge,
  Headphones,
  PackageSearch,
  ReceiptText,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  WalletCards,
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
    title: "Boshqaruv paneli",
    href: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Sotuvlar",
    icon: ShoppingCart,
    children: [
      { title: "Buyurtmalar", href: "/sales/orders", badge: "18" },
      { title: "Hisob-fakturalar", href: "/sales/invoices" },
      { title: "Mijozlar", href: "/sales/customers" },
    ],
  },
  {
    title: "Ombor",
    icon: Boxes,
    children: [
      { title: "Qoldiq nazorati", href: "/inventory/stock" },
      { title: "Mahsulotlar", href: "/inventory/products" },
      { title: "Ko'chirishlar", href: "/inventory/transfers" },
    ],
  },
  {
    title: "Ta'minot",
    href: "/procurement",
    icon: PackageSearch,
    badge: "4",
  },
  {
    title: "Logistika",
    href: "/logistics",
    icon: Truck,
  },
  {
    title: "Moliya",
    icon: WalletCards,
    children: [
      { title: "Bosh daftar", href: "/finance/ledger" },
      { title: "To'lovlar", href: "/finance/payments" },
      { title: "Soliq hisobotlari", href: "/finance/tax" },
    ],
  },
];

export const secondaryMenu: MenuItem[] = [
  { title: "Tahlil", href: "/analytics", icon: BarChart3 },
  { title: "Hujjatlar", href: "/documents", icon: FileText },
  { title: "Tasdiqlar", href: "/approvals", icon: ClipboardList, badge: "7" },
  { title: "Hamkorlar", href: "/partners", icon: Building2 },
  { title: "Hisoblar", href: "/accounts", icon: CreditCard },
  { title: "Jamoa", href: "/teams", icon: Users },
  { title: "Yordam", href: "/support", icon: Headphones },
  { title: "Sozlamalar", href: "/settings", icon: Settings },
  { title: "Audit jurnali", href: "/audit", icon: ReceiptText },
];
