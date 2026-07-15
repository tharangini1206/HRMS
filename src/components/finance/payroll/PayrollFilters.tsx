'use client';

import { memo } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import type { PayrollFilters as PayrollFilterState } from '@/types/payroll';
import { PAYROLL_STATUSES } from '@/types/payroll';

interface PayrollFiltersProps {
  filters: PayrollFilterState;
  onChange: (key: keyof PayrollFilterState, value: string) => void;
  onReset: () => void;
  onGenerate: () => void;
}

export const PayrollFilters = memo(function PayrollFilters({ filters, onChange, onReset, onGenerate }: PayrollFiltersProps) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-900">Payroll Filters</h3>
          </div>
          <p className="mt-1 text-sm text-slate-500">Adjust the payout view before processing or exporting payroll.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-1 text-sm text-slate-600">
            <span>Month</span>
            <select value={filters.month} onChange={(event) => onChange('month', event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400">
              <option>June 2026</option>
              <option>July 2026</option>
              <option>August 2026</option>
            </select>
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Department</span>
            <select value={filters.department} onChange={(event) => onChange('department', event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400">
              <option>All Departments</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>HR</option>
            </select>
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Employee</span>
            <input value={filters.employee} onChange={(event) => onChange('employee', event.target.value)} placeholder="Search by name or ID" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Status</span>
            <select value={filters.status} onChange={(event) => onChange('status', event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400">
              <option>All</option>
              {PAYROLL_STATUSES.filter((status) => status !== 'Draft').map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onReset} className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button type="button" onClick={onGenerate} className="flex flex-1 items-center justify-center rounded-2xl bg-linear-to-r from-red-500 to-red-600 px-3 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/20">
              Generate Payroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
