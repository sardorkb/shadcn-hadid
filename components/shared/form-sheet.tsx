"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

interface FormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  width?: "sm" | "md" | "lg";
}

const widthClass = {
  sm: "sm:max-w-[420px]",
  md: "sm:max-w-[540px]",
  lg: "sm:max-w-[680px]",
};

export function FormSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  isSubmitting,
  submitLabel = "Save changes",
  width = "md",
}: FormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={`flex flex-col p-0 ${widthClass[width]}`}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b px-6 py-5">
          <div>
            <SheetTitle className="text-base font-semibold">{title}</SheetTitle>
            {description && (
              <SheetDescription className="mt-0.5 text-sm">{description}</SheetDescription>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="mt-0.5 size-8 shrink-0"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

        {/* Sticky footer */}
        {onSubmit && (
          <>
            <Separator />
            <div className="flex items-center justify-end gap-3 px-6 py-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={onSubmit} disabled={isSubmitting} className="min-w-[120px]">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving…
                  </span>
                ) : (
                  submitLabel
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
