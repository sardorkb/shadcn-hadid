import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: string;
  description?: string;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  noPadding?: boolean;
}

export function SectionCard({
  title,
  description,
  headerExtra,
  children,
  className,
  contentClassName,
  noPadding,
}: SectionCardProps) {
  return (
    <Card className={cn("shadow-soft", className)}>
      {(title || description || headerExtra) && (
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerExtra && <div className="shrink-0">{headerExtra}</div>}
        </CardHeader>
      )}
      <CardContent className={cn(noPadding && "p-0", contentClassName)}>{children}</CardContent>
    </Card>
  );
}
