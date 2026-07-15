'use client';

import { memo } from 'react';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';
import type { TaxSlab } from '@/types/tax';

interface TaxSlabTableProps {
  items: TaxSlab[];
  onAdd: () => void;
  onEdit: (item: TaxSlab) => void;
  onDelete: (item: TaxSlab) => void;
}

const formatCurrency = (value: number | null) => {
  if (value === null) return 'Unlimited';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const TaxSlabTable = memo(function TaxSlabTable({ items, onAdd, onEdit, onDelete }: TaxSlabTableProps) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)]">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Tax Slabs</h2>
          <p className="text-sm text-slate-500">Manage progressive slabs used in payroll tax calculations.</p>
        </div>
        <button type="button" onClick={onAdd} className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white">
          <PlusCircle className="h-4 w-4" />
          Add Tax Slab
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 font-semibold text-slate-900">Slab Order</th>
              <th className="px-5 py-4 font-semibold text-slate-900">From Amount</th>
              <th className="px-5 py-4 font-semibold text-slate-900">To Amount</th>
              <th className="px-5 py-4 font-semibold text-slate-900">Tax Percentage</th>
              <th className="px-5 py-4 font-semibold text-slate-900">Status</th>
              <th className="px-5 py-4 font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-semibold text-slate-900">{item.slabOrder}</td>
                <td className="px-5 py-4 text-slate-600">{formatCurrency(item.fromAmount)}</td>
                <td className="px-5 py-4 text-slate-600">{formatCurrency(item.toAmount)}</td>
                <td className="px-5 py-4 text-slate-600">{item.taxPercentage}%</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{item.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => onEdit(item)} className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => onDelete(item)} className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
