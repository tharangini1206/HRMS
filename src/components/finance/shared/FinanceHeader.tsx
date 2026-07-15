"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Bell, MessageSquare, Moon, Search, Sun, UserCircle, ChevronDown, LogOut } from 'lucide-react';
import { authService } from '@/services/auth.service';

export const FinanceHeader: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // ignore logout failures and redirect anyway
    }
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-18 items-center justify-between gap-4 border-b border-slate-200/70 bg-white/80 px-6 backdrop-blur-xl shadow-sm">
      <div className="flex-1">
        <label className="relative block w-full">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search employees..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/90 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
          aria-label="Messages"
        >
          <MessageSquare className="h-5 w-5" />
        </button>

        {(!pathname || !pathname.startsWith('/finance')) && (
          <button
            type="button"
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        )}

        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 outline-animate-border"
          aria-label="Profile menu"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <UserCircle className="h-5 w-5" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-semibold text-slate-900">Finance Manager</p>
            <p className="text-xs text-slate-500">finance@hrms.com</p>
          </div>
          <ChevronDown className="hidden sm:block h-4 w-4 text-slate-500" />
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 outline-animate-border"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
};
