import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className={cn("shadow-soft", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {Icon && (
          <div className="rounded-md bg-secondary p-2">
            <Icon className="size-4 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {change && (
          <div className="mt-2 flex items-center gap-1 text-sm">
            {up && <ArrowUpRight className="size-4 text-emerald-600" />}
            {down && <ArrowDownRight className="size-4 text-amber-600" />}
            <span className={cn(up && "text-emerald-600", down && "text-amber-600")}>{change}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
