import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopHeader } from "@/components/layout/TopHeader";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <AppSidebar />
      </div>
      <div className="lg:pl-72">
        <TopHeader />
        <main className="min-h-[calc(100vh-4rem)] bg-background">
          <div className="w-full px-6 py-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
