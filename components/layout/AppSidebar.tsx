"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Circle } from "lucide-react";

import { mainMenu, secondaryMenu, type MenuItem } from "@/config/menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type AppSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

function isActive(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuSection({
  items,
  pathname,
  onNavigate,
}: {
  items: MenuItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-0.5">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        const childActive = item.children?.some((c) => isActive(pathname, c.href));
        const Icon = item.icon;

        if (item.children?.length) {
          return (
            <Collapsible key={item.title} defaultOpen={childActive}>
              <CollapsibleTrigger
                className={cn(
                  "group flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium",
                  "text-muted-foreground transition-colors duration-150",
                  "hover:bg-secondary hover:text-foreground",
                  childActive && "bg-secondary/80 text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate text-left">{item.title}</span>
                {item.badge && (
                  <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
                    {item.badge}
                  </Badge>
                )}
                <ChevronDown className="size-3.5 shrink-0 text-muted-foreground/60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-0.5 overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1 data-[state=closed]:duration-150 data-[state=open]:duration-200">
                <div className="ml-3 space-y-0.5 border-l border-border/60 pl-4 py-1">
                  {item.children.map((child) => {
                    const childIsActive = isActive(pathname, child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onNavigate}
                        className={cn(
                          "flex h-8 items-center gap-2.5 rounded-md px-3 text-sm",
                          "text-muted-foreground transition-colors duration-150",
                          "hover:bg-secondary hover:text-foreground",
                          childIsActive && "bg-primary/10 font-medium text-primary dark:bg-primary/20",
                        )}
                      >
                        <Circle
                          className={cn(
                            "size-1.5 shrink-0 fill-current",
                            childIsActive ? "text-primary" : "text-muted-foreground/40"
                          )}
                        />
                        <span className="min-w-0 flex-1 truncate">{child.title}</span>
                        {child.badge && (
                          <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                            {child.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        }

        return (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                href={item.href ?? "#"}
                onClick={onNavigate}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium",
                  "text-muted-foreground transition-colors duration-150",
                  "hover:bg-secondary hover:text-foreground",
                  active && [
                    "bg-primary text-primary-foreground",
                    "shadow-sm shadow-primary/30",
                    "hover:bg-primary hover:text-primary-foreground",
                  ],
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate">{item.title}</span>
                {item.badge && (
                  <Badge
                    variant={active ? "secondary" : "outline"}
                    className="h-5 px-1.5 text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              {item.title}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

export function AppSidebar({ className, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={300}>
      <aside
        className={cn(
          "flex h-full w-72 shrink-0 flex-col",
          "border-r bg-card",
          className,
        )}
      >
        {/* Logo */}
        <div className="relative flex h-[4.5rem] items-center gap-3.5 overflow-hidden px-4">
          {/* gradient wash */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
          {/* decorative arc */}
          <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/8" />

          {/* Icon with primary bg + glow */}
          <div className="relative shrink-0">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/40">
              <Image
                src="/logo-icon.png"
                alt="Hadid Beton"
                width={30}
                height={30}
                priority
                className="size-[1.7rem] object-contain brightness-[8] saturate-0"
              />
            </div>
            {/* Live pulse dot */}
            <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500 ring-[1.5px] ring-card" />
            </span>
          </div>

          {/* Name */}
          <div className="relative min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-black tracking-tight text-foreground">HADID</span>
              <span className="text-[15px] font-extralight tracking-[0.18em] text-foreground/60">BETON</span>
            </div>
            <p className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-[0.28em] text-primary">
              ERP Platform
            </p>
          </div>
        </div>

        <Separator />

        {/* Nav */}
        <ScrollArea className="flex-1 px-3 py-4 scrollbar-thin">
          <div className="space-y-6">
            {/* Main navigation */}
            <MenuSection items={mainMenu} pathname={pathname} onNavigate={onNavigate} />

            {/* Secondary navigation */}
            <div>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                Workspace
              </p>
              <MenuSection items={secondaryMenu} pathname={pathname} onNavigate={onNavigate} />
            </div>
          </div>
        </ScrollArea>

        {/* Bottom status card */}
        <div className="border-t p-3">
          <div className="rounded-xl bg-primary/8 p-3.5 dark:bg-primary/12">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">May 2026</p>
              <span className="text-[10px] font-medium text-primary">84%</span>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Month-end closing progress</p>
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: "84%" }}
              />
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
