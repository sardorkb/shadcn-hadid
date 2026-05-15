"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <AppSidebar collapsed={!sidebarOpen} />
      </div>

      {/* Main area — padding matches sidebar width */}
      <div
        className={cn(
          "transition-[padding-left] duration-300 ease-in-out",
          sidebarOpen ? "lg:pl-72" : "lg:pl-16",
        )}
      >
        <TopHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <main className="min-h-[calc(100vh-4rem)] bg-background">
          <div className="w-full px-6 py-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
