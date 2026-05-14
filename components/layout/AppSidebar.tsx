"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

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
    <div className="space-y-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        const childActive = item.children?.some((child) => isActive(pathname, child.href));
        const Icon = item.icon;

        if (item.children?.length) {
          return (
            <Collapsible key={item.title} defaultOpen={childActive}>
              <CollapsibleTrigger
                className={cn(
                  "flex h-10 w-full items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  childActive && "bg-secondary text-foreground",
                )}
              >
                <Icon className="size-4" />
                <span className="min-w-0 flex-1 text-left">{item.title}</span>
                <ChevronDown className="size-4 transition-transform data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 space-y-1 pl-7">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={onNavigate}
                    className={cn(
                      "flex h-9 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                      isActive(pathname, child.href) && "bg-primary/10 text-primary dark:bg-primary/15",
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-current opacity-60" />
                    <span className="min-w-0 flex-1 truncate">{child.title}</span>
                    {child.badge ? <Badge variant="secondary">{child.badge}</Badge> : null}
                  </Link>
                ))}
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
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  active && "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground",
                )}
              >
                <Icon className="size-4" />
                <span className="min-w-0 flex-1 truncate">{item.title}</span>
                {item.badge ? (
                  <Badge variant={active ? "secondary" : "outline"}>{item.badge}</Badge>
                ) : null}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

export function AppSidebar({ className, onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={250}>
      <aside
        className={cn(
          "flex h-full w-72 shrink-0 flex-col border-r bg-background/95 backdrop-blur",
          className,
        )}
      >
        <div className="flex h-16 items-center gap-3 px-5">
          <div className="flex size-11 items-center justify-center rounded-lg bg-white p-1 shadow-sm ring-1 ring-border dark:bg-secondary">
            <Image
              src="/logo-icon.png"
              alt="Hadid Beton"
              width={42}
              height={42}
              className="size-10 object-contain"
            />
          </div>
          <div className="min-w-0">
            <Image
              src="/logo.png"
              alt="Hadid Beton"
              width={138}
              height={58}
              priority
              className="h-8 w-auto object-contain dark:brightness-110"
            />
            <p className="truncate text-xs text-muted-foreground">ERP boshqaruvi</p>
          </div>
        </div>
        <Separator />
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-6">
            <MenuSection items={mainMenu} pathname={pathname} onNavigate={onNavigate} />
            <div>
              <p className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
                Ish maydoni
              </p>
              <MenuSection items={secondaryMenu} pathname={pathname} onNavigate={onNavigate} />
            </div>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="rounded-lg bg-secondary p-3">
            <p className="text-sm font-medium">Oy yakuni</p>
            <p className="mt-1 text-xs text-muted-foreground">84% hujjatlar solishtirildi</p>
            <div className="mt-3 h-2 rounded-full bg-background">
              <div className="h-2 w-[84%] rounded-full bg-accent" />
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
