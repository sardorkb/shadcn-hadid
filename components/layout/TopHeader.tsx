"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Bell,
  Building,
  CalendarDays,
  Check,
  Menu,
  Moon,
  Search,
  Sun,
  UserRound,
} from "lucide-react";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function TopHeader() {
  const [open, setOpen] = React.useState(false);
  const { setTheme, theme } = useTheme();

  return (
    <TooltipProvider delayDuration={200}>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur lg:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Menyuni ochish">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigatsiya</SheetTitle>
            <AppSidebar onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="hidden items-center gap-2 rounded-md border bg-card px-3 py-2 shadow-sm md:flex">
          <Building className="size-4 text-primary" />
          <Select defaultValue="northstar">
            <SelectTrigger className="h-7 w-44 border-0 bg-transparent px-0 shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="northstar">Hadid Beton</SelectItem>
              <SelectItem value="atlas">Toshkent Zavodi</SelectItem>
              <SelectItem value="prime">Chirchiq Filiali</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-10 max-w-xl pl-9"
            placeholder="Buyurtma, faktura yoki yetkazib beruvchini qidirish"
            type="search"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Badge variant="success" className="hidden h-8 gap-1.5 px-3 sm:inline-flex">
            <Check className="size-3.5" />
            Jonli
          </Badge>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Kalendar">
                <CalendarDays className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Kalendar</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Bildirishnomalar">
                <Bell className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bildirishnomalar</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Mavzu">
                <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="size-4" />
                Yorug'
                {theme === "light" ? <Check className="ml-auto size-4" /> : null}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="size-4" />
                Qorong'i
                {theme === "dark" ? <Check className="ml-auto size-4" /> : null}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <UserRound className="size-4" />
                Tizim
                {theme === "system" ? <Check className="ml-auto size-4" /> : null}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 gap-2 px-2">
                <Avatar>
                  <AvatarImage src="/logo-icon.png" alt="Hadid Beton" />
                  <AvatarFallback>HB</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium xl:inline">Hadid Beton</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <Image
                  src="/logo-icon.png"
                  alt="Hadid Beton"
                  width={24}
                  height={24}
                  className="size-6 object-contain"
                />
                ERP boshqaruvi
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Afzalliklar</DropdownMenuItem>
              <DropdownMenuItem>Xavfsizlik</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
}
