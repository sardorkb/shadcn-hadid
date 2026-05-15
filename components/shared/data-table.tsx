"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "./empty-state";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
  render: (row: T) => React.ReactNode;
}

export interface FilterOption {
  key: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
}

export interface RowAction<T> {
  label: string;
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
}

interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: ColumnDef<T>[];
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  filters?: FilterOption[];
  rowActions?: RowAction<T>[];
  onRowClick?: (row: T) => void;
  pageSize?: number;
  toolbar?: React.ReactNode;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchPlaceholder = "Search…",
  searchKeys = [],
  filters = [],
  rowActions = [],
  onRowClick,
  pageSize = 10,
  toolbar,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const filtered = useMemo(() => {
    let rows = [...data];
    if (search && searchKeys.length > 0) {
      const q = search.toLowerCase();
      rows = rows.filter((row) =>
        searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
      );
    }
    filters.forEach((f) => {
      const val = filterValues[f.key];
      if (val && val !== "__all__") {
        rows = rows.filter((row) => String((row as Record<string, unknown>)[f.key]) === val);
      }
    });
    if (sortKey) {
      rows.sort((a, b) => {
        const av = String((a as Record<string, unknown>)[sortKey] ?? "");
        const bv = String((b as Record<string, unknown>)[sortKey] ?? "");
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }
    return rows;
  }, [data, search, searchKeys, filterValues, filters, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, totalPages - 1);
  const paged = filtered.slice(safePage * rowsPerPage, (safePage + 1) * rowsPerPage);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  }

  function getPageNumbers(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i);
    const pages: (number | "…")[] = [];
    if (safePage <= 3) {
      pages.push(0, 1, 2, 3, 4, "…", totalPages - 1);
    } else if (safePage >= totalPages - 4) {
      pages.push(0, "…", totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      pages.push(0, "…", safePage - 1, safePage, safePage + 1, "…", totalPages - 1);
    }
    return pages;
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {searchKeys.length > 0 && (
            <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="h-9 pl-9 text-sm"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              />
            </div>
          )}
          {filters.map((f) => (
            <Select
              key={f.key}
              value={filterValues[f.key] ?? "__all__"}
              onValueChange={(v) => { setFilterValues((p) => ({ ...p, [f.key]: v })); setPage(0); }}
            >
              <SelectTrigger className="h-9 w-[150px] text-sm">
                <SlidersHorizontal className="mr-1.5 size-3.5 text-muted-foreground" />
                <SelectValue placeholder={f.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">All {f.label}</SelectItem>
                {f.options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          {(search || Object.values(filterValues).some((v) => v && v !== "__all__")) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 text-muted-foreground"
              onClick={() => { setSearch(""); setFilterValues({}); setPage(0); }}
            >
              Clear filters
            </Button>
          )}
        </div>
        {toolbar && <div className="flex shrink-0 items-center gap-2">{toolbar}</div>}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    "h-11 text-xs font-semibold uppercase tracking-wide",
                    col.sortable && "cursor-pointer select-none",
                    col.className
                  )}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="text-muted-foreground/60">
                        {sortKey === col.key ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    )}
                  </span>
                </TableHead>
              ))}
              {rowActions.length > 0 && <TableHead className="w-12" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (rowActions.length > 0 ? 1 : 0)} className="p-0">
                  <EmptyState message="No records match your search." description="Try adjusting your filters." />
                </TableCell>
              </TableRow>
            ) : (
              paged.map((row, idx) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "border-b last:border-b-0",
                    onRowClick && "cursor-pointer",
                    idx % 2 === 1 && "bg-muted/20"
                  )}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.render(row)}
                    </TableCell>
                  ))}
                  {rowActions.length > 0 && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {rowActions.map((a) => (
                            <DropdownMenuItem
                              key={a.label}
                              onClick={(e) => { e.stopPropagation(); a.onClick(row); }}
                              className={a.variant === "destructive" ? "text-destructive focus:text-destructive" : undefined}
                            >
                              {a.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            {filtered.length === 0 ? "No records" : `${safePage * rowsPerPage + 1}–${Math.min((safePage + 1) * rowsPerPage, filtered.length)} of ${filtered.length}`}
          </span>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <span className="shrink-0">Rows per page</span>
            <Select value={String(rowsPerPage)} onValueChange={(v) => { setRowsPerPage(Number(v)); setPage(0); }}>
              <SelectTrigger className="h-7 w-16 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map((n) => (
                  <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPage(0)}
              disabled={safePage === 0}
            >
              <ChevronsLeft className="size-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
            >
              <ChevronLeft className="size-3.5" />
            </Button>
            {getPageNumbers().map((p, i) =>
              p === "…" ? (
                <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground">…</span>
              ) : (
                <Button
                  key={p}
                  variant={safePage === p ? "default" : "outline"}
                  size="icon"
                  className="size-8 text-xs"
                  onClick={() => setPage(p as number)}
                >
                  {(p as number) + 1}
                </Button>
              )
            )}
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
            >
              <ChevronRight className="size-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => setPage(totalPages - 1)}
              disabled={safePage >= totalPages - 1}
            >
              <ChevronsRight className="size-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
