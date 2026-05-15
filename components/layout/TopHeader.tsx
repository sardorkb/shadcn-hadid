"use client";

import {
  Bell,
  Building,
  CalendarDays,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import * as React from "react";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
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
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/* Current logged-in employee — swap with real auth session later */
const currentUser = {
  name: "Sherzod Mirzaev",
  position: "General Manager",
  initials: "SM",
  email: "s.mirzaev@hadid.uz",
  plant: "Tashkent",
  avatarUrl: "", // replace with real URL when available
};

export function TopHeader() {
  const [open, setOpen] = React.useState(false);
  const [notifCount] = React.useState(3);

  return (
    <TooltipProvider delayDuration={200}>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/95 px-4 shadow-sm backdrop-blur-md lg:px-6">

        {/* ── Mobile hamburger ─────────────────────────────────── */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <AppSidebar onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* ── Company / plant selector ─────────────────────────── */}
        <div className="hidden items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm md:flex">
          <Building className="size-4 shrink-0 text-primary" />
          <Select defaultValue="tashkent">
            <SelectTrigger className="h-7 w-40 border-0 bg-transparent px-0 text-sm shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tashkent">Toshkent Zavodi</SelectItem>
              <SelectItem value="angren">Angren Zavodi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Global search ────────────────────────────────────── */}
        <div className="relative hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-9 max-w-md rounded-lg border-border/60 bg-background pl-9 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-1"
            placeholder="Search orders, invoices, customers…"
            type="search"
          />
        </div>

        {/* ── Right actions ────────────────────────────────────── */}
        <div className="ml-auto flex items-center gap-1.5">

          {/* Live badge */}
          <Badge variant="success" className="hidden h-7 gap-1.5 rounded-full px-3 text-xs font-medium sm:inline-flex">
            <span className="size-1.5 rounded-full bg-current" />
            Live
          </Badge>

          <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />

          {/* Calendar */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9 rounded-full" aria-label="Calendar">
                <CalendarDays className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Calendar</TooltipContent>
          </Tooltip>

          {/* Notifications */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative size-9 rounded-full"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
                {notifCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                    {notifCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>

          {/* Theme toggle */}
          <ThemeToggle />

          <Separator orientation="vertical" className="mx-1 hidden h-6 sm:block" />

          {/* ── Employee profile ─────────────────────────────── */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex h-10 items-center gap-2.5 rounded-xl px-2 pr-3",
                  "transition-colors hover:bg-secondary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                {/* Avatar */}
                <Avatar className="size-8 ring-2 ring-primary/25 ring-offset-1 ring-offset-card">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback className="bg-primary text-[11px] font-bold text-primary-foreground">
                    {currentUser.initials}
                  </AvatarFallback>
                </Avatar>

                {/* Name + position — visible from xl */}
                <div className="hidden text-left xl:block">
                  <p className="text-[13px] font-semibold leading-tight text-foreground">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] leading-tight text-muted-foreground">
                    {currentUser.position}
                  </p>
                </div>
                <ChevronDown className="hidden size-3.5 text-muted-foreground xl:block" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 p-0" sideOffset={8}>
              {/* Profile header */}
              <div className="flex items-center gap-3 border-b bg-secondary/30 px-4 py-4">
                <Avatar className="size-11 ring-2 ring-primary/20 ring-offset-1">
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
                    {currentUser.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{currentUser.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{currentUser.position}</p>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground/70">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <div className="p-1">
                <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Account
                </DropdownMenuLabel>
                <DropdownMenuItem className="gap-2 rounded-md">
                  <UserRound className="size-4 text-muted-foreground" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 rounded-md">
                  <Settings className="size-4 text-muted-foreground" />
                  Preferences
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />

              <div className="p-1">
                <DropdownMenuItem className="gap-2 rounded-md text-destructive focus:text-destructive">
                  <LogOut className="size-4" />
                  Sign out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
}
