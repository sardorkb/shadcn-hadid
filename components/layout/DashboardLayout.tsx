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
      {/* Desktop sidebar — slides in/out */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden lg:block",
          "transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <AppSidebar />
      </div>

      {/* Main area — expands when sidebar hides */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:pl-72" : "lg:pl-0",
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
