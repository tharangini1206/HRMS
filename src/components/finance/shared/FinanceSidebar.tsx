'use client';

import React from 'react';
import {
  Home,
  Wallet,
  Users,
  Layers,
  FileText,
  Receipt,
  CreditCard,
  RotateCcw,
  FileCheck,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Percent,
  FileStack,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useSidebar } from '@/contexts/SidebarContext';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: 'Main',
    items: [
      { label: 'Dashboard', href: '/finance', icon: <Home className="h-5 w-5" /> },
    ],
  },
  {
    title: 'Payroll',
    items: [
      { label: 'Payroll', href: '/finance/payroll', icon: <Wallet className="h-5 w-5" /> },
      { label: 'Payslip', href: '/finance/payslip', icon: <FileStack className="h-5 w-5" /> },
      { label: 'Tax Configuration', href: '/finance/tax-configuration', icon: <Settings className="h-5 w-5" /> },
      { label: 'Tax Slabs', href: '/finance/tax-slabs', icon: <Percent className="h-5 w-5" /> },
      { label: 'Employee Salary', href: '/finance/employesalary', icon: <Users className="h-5 w-5" /> },
      { label: 'Salary Components', href: '/finance/salarycomponents', icon: <Layers className="h-5 w-5" /> },
      { label: 'Statutory Components', href: '/finance/statutorycomponents', icon: <FileText className="h-5 w-5" /> },
      { label: 'Salary Statements', href: '/finance/salarystatements', icon: <Receipt className="h-5 w-5" /> },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Expenses', href: '/finance/expenses', icon: <CreditCard className="h-5 w-5" /> },
      { label: 'Reimbursements', href: '/finance/reimbursements', icon: <RotateCcw className="h-5 w-5" /> },
      { label: 'Invoices', href: '/finance/invoices', icon: <FileCheck className="h-5 w-5" /> },
    ],
  },
  {
    title: 'Insights',
    items: [
      { label: 'Reports', href: '/finance/reports', icon: <BarChart3 className="h-5 w-5" /> },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Settings', href: '/finance/settings', icon: <Settings className="h-5 w-5" /> },
    ],
  },
];

export const FinanceSidebar: React.FC = () => {
  const { isHovered, setIsHovered } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // ignore logout failures
    }
    router.push('/login');
  };

  return (
    <aside
      className="group fixed inset-y-0 left-0 z-40 flex flex-col rounded-r-3xl bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 backdrop-blur-xl transition-all duration-300 ease-out"
      style={{
        width: isHovered ? '288px' : '80px',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="navigation"
      aria-label="Finance sidebar navigation"
    >
      {/* Glassmorphism border */}
      <div className="absolute inset-0 rounded-r-3xl border-r border-white/10 opacity-50" />

      {/* Content wrapper */}
      <div className="relative flex flex-col h-full overflow-hidden">
        {/* Logo section */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-white/10 overflow-hidden">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div
            className={`space-y-1 whitespace-nowrap transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-sm font-semibold text-white">Finance Hub</p>
            <p className="text-xs text-slate-400">Payroll Management</p>
          </div>
        </div>

        {/* Navigation sections */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-2 py-4 space-y-6">
          {menuSections.map((section) => (
            <div key={section.title} className="space-y-2">
              {/* Section title */}
              <div
                className={`px-3 py-2 transition-all duration-300 overflow-hidden ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {section.title}
                </p>
              </div>

              {/* Menu items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/finance' && pathname?.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group/item relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                        isActive ? 'bg-linear-to-r from-red-500 to-red-600 text-white shadow-[0_25px_80px_-56px_rgba(248,113,113,0.45)]' : 'text-slate-300 hover:bg-red-500/10 hover:text-white'
                      }`}
                      aria-label={item.label}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {/* Icon container */}
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                        isActive ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-linear-to-br from-white/10 to-transparent group-hover/item:from-red-500/20 group-hover/item:to-red-500/10'
                      }`}>
                        {item.icon}
                      </div>

                      {/* Label */}
                      <span
                        className={`transition-all duration-300 ${
                          isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                        } overflow-hidden`}
                      >
                        {item.label}
                      </span>

                      {/* Hover indicator */}
                      <ChevronRight className={`ml-auto h-4 w-4 transition-all duration-200 ${
                        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
                      } ${isActive ? 'text-white' : 'text-slate-400 group-hover/item:text-white'}` } />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-2 border-t border-white/10" />

        {/* Logout section */}
        <div className="px-2 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="group/btn relative flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-linear-to-r from-red-500/10 to-red-600/10 px-3 py-2.5 text-sm font-medium text-red-300 transition-all duration-200 hover:border-red-500/30 hover:bg-linear-to-r hover:from-red-500/20 hover:to-red-600/20 hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            aria-label="Logout from account"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span
              className={`transition-all duration-300 ${
                isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'
              } overflow-hidden`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Smooth gradient overlay at bottom for scroll indication */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-slate-950 to-transparent pointer-events-none" />

      {/* Hide scrollbar styles - add to global CSS or use inline */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </aside>
  );
};
