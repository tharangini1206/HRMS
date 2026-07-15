'use client';

import { FinanceHeader } from '@/components/finance/shared/FinanceHeader';
import { FinanceSidebar } from '@/components/finance/shared/FinanceSidebar';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isHovered } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Fixed Sidebar */}
      <FinanceSidebar />

      {/* Main Content Area */}
      <div
        className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-out"
        style={{ marginLeft: isHovered ? '288px' : '80px' }}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-30">
          <FinanceHeader />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
