import { Search, RotateCcw } from 'lucide-react';

import type { SalaryStatementFilterStatus } from '@/types/finance';
import { SALARY_STATEMENT_FILTER_STATUSES } from '@/types/finance';

interface SalaryFiltersProps {
  searchMonth: string;
  selectedYear: string;
  selectedStatus: SalaryStatementFilterStatus;
  onSearchChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onStatusChange: (value: SalaryStatementFilterStatus) => void;
  onResetFilters: () => void;
}

const years = ['2026', '2025', '2024', '2023'];
const statuses: SalaryStatementFilterStatus[] = SALARY_STATEMENT_FILTER_STATUSES as SalaryStatementFilterStatus[];

export const SalaryFilters: React.FC<SalaryFiltersProps> = ({
  searchMonth,
  selectedYear,
  selectedStatus,
  onSearchChange,
  onYearChange,
  onStatusChange,
  onResetFilters,
}) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search month..."
              value={searchMonth}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Year Dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as SalaryStatementFilterStatus)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Reset Button */}
          <button
            onClick={onResetFilters}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
