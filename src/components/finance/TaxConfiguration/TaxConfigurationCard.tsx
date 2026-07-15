'use client';

import { memo } from 'react';
import { PencilLine } from 'lucide-react';
import type { TaxConfiguration } from '@/types/tax';

interface TaxConfigurationCardProps {
  data: TaxConfiguration;
  onEdit: () => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const TaxConfigurationCard = memo(function TaxConfigurationCard({ data, onEdit }: TaxConfigurationCardProps) {
  const fields = [
    ['Financial Year', data.financialYear],
    ['Tax Regime', data.taxRegime],
    ['Standard Deduction', formatCurrency(data.standardDeduction)],
    ['87A Rebate Limit', formatCurrency(data.rebateLimit)],
    ['87A Rebate Amount', formatCurrency(data.rebateAmount)],
    ['Health & Education Cess %', `${data.cessPercentage}%`],
    ['Effective Date', data.effectiveDate],
    ['Status', data.status],
  ];

  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Tax Configuration</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Enterprise tax policy</h2>
          <p className="mt-2 text-sm text-slate-500">Maintain the annual tax framework used for payroll and statutory processing.</p>
        </div>
        <button type="button" onClick={onEdit} className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white">
          <PencilLine className="h-4 w-4" />
          Edit Configuration
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {fields.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
});
