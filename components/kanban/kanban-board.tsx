"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface KanbanCard {
  id: string | number;
  title: string;
  subtitle?: string;
  meta?: string;
  badge?: { label: string; variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" };
  extra?: React.ReactNode;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCard[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  className?: string;
}

export function KanbanBoard({ columns, onCardClick, className }: KanbanBoardProps) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
      {columns.map((col) => (
        <div key={col.id} className="flex w-72 shrink-0 flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {col.color && (
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: col.color }} />
              )}
              <span className="text-sm font-semibold">{col.title}</span>
            </div>
            <Badge variant="secondary">{col.cards.length}</Badge>
          </div>
          <div className="flex flex-col gap-2">
            {col.cards.map((card) => (
              <Card
                key={card.id}
                className="cursor-pointer shadow-sm transition-shadow hover:shadow-md"
                onClick={() => onCardClick?.(card, col.id)}
              >
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm">{card.title}</CardTitle>
                  {card.subtitle && (
                    <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                  )}
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center justify-between gap-2">
                    {card.meta && (
                      <span className="text-xs text-muted-foreground">{card.meta}</span>
                    )}
                    {card.badge && (
                      <Badge variant={card.badge.variant ?? "secondary"} className="text-xs">
                        {card.badge.label}
                      </Badge>
                    )}
                  </div>
                  {card.extra && <div className="mt-2">{card.extra}</div>}
                </CardContent>
              </Card>
            ))}
            {col.cards.length === 0 && (
              <div className="rounded-lg border border-dashed py-8 text-center text-xs text-muted-foreground">
                Empty
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
