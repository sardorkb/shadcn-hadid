import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  message = "No data",
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <PackageOpen className="size-10 text-muted-foreground/40" />
      <div>
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
        {description && <p className="mt-1 text-xs text-muted-foreground/70">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
