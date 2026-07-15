'use client';

import { memo } from 'react';
import { BadgeCheck, Clock3, DollarSign, Users } from 'lucide-react';
import type { PayrollKpiSummary } from '@/types/payroll';

interface PayrollStatsProps {
  summary: PayrollKpiSummary;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const PayrollStats = memo(function PayrollStats({ summary }: PayrollStatsProps) {
  const cards = [
    {
      label: 'Total Payroll',
      value: formatCurrency(summary.totalPayroll),
      icon: DollarSign,
      accent: 'from-slate-900 to-slate-800',
    },
    {
      label: 'Employees Processed',
      value: summary.employeesProcessed.toString(),
      icon: Users,
      accent: 'from-red-500 to-red-600',
    },
    {
      label: 'Pending Payroll',
      value: summary.pendingPayroll.toString(),
      icon: Clock3,
      accent: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Paid Payroll',
      value: summary.paidPayroll.toString(),
      icon: BadgeCheck,
      accent: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.label} className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{card.label}</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{card.value}</p>
              </div>
              <div className={`rounded-2xl bg-linear-to-r ${card.accent} p-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
