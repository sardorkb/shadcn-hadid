import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, change, trend, icon: Icon, className }: StatCardProps) {
  const up = trend === "up";
  const down = trend === "down";

  return (
    <Card
      className={cn(
        "relative overflow-hidden border bg-card shadow-sm transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
            <p className="truncate text-3xl font-bold tracking-tight">{value}</p>
          </div>
          {Icon && (
            <div className="shrink-0 rounded-xl bg-primary/10 p-3 dark:bg-primary/15">
              <Icon className="size-5 text-primary" />
            </div>
          )}
        </div>
        {change && (
          <div className="mt-4 flex items-center gap-1.5">
            {up && <ArrowUpRight className="size-3.5 shrink-0 text-emerald-500" />}
            {down && <ArrowDownRight className="size-3.5 shrink-0 text-amber-500" />}
            <span
              className={cn(
                "text-xs font-medium",
                up && "text-emerald-600 dark:text-emerald-500",
                down && "text-amber-600 dark:text-amber-500",
                !up && !down && "text-muted-foreground"
              )}
            >
              {change}
            </span>
          </div>
        )}
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />
    </Card>
  );
}
