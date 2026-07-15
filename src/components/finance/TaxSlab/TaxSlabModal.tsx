'use client';

import { memo, useEffect, useState } from 'react';
import type { TaxSlab, TaxSlabFormData } from '@/types/tax';

interface TaxSlabModalProps {
  open: boolean;
  item: TaxSlab | null;
  onClose: () => void;
  onSave: (payload: TaxSlabFormData) => void;
}

const initialState = (item: TaxSlab | null): TaxSlabFormData => ({
  slabOrder: item?.slabOrder ?? 1,
  fromAmount: item?.fromAmount ?? 0,
  toAmount: item?.toAmount ?? null,
  taxPercentage: item?.taxPercentage ?? 0,
  status: item?.status ?? 'Active',
});

export const TaxSlabModal = memo(function TaxSlabModal({ open, item, onClose, onSave }: TaxSlabModalProps) {
  const [form, setForm] = useState<TaxSlabFormData>(initialState(item));

  useEffect(() => {
    setForm(initialState(item));
  }, [item, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
      <div className="w-full max-w-xl rounded-[20px] border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Add/Edit Tax Slab</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Tax Slab</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600">Close</button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm text-slate-600">
            <span>From Amount</span>
            <input type="number" value={form.fromAmount} onChange={(event) => setForm((current) => ({ ...current, fromAmount: Number(event.target.value) }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>To Amount</span>
            <input type="number" value={form.toAmount ?? ''} onChange={(event) => setForm((current) => ({ ...current, toAmount: event.target.value === '' ? null : Number(event.target.value) }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Tax Percentage</span>
            <input type="number" value={form.taxPercentage} onChange={(event) => setForm((current) => ({ ...current, taxPercentage: Number(event.target.value) }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Slab Order</span>
            <input type="number" value={form.slabOrder} onChange={(event) => setForm((current) => ({ ...current, slabOrder: Number(event.target.value) }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600 md:col-span-2">
            <span>Status</span>
            <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as TaxSlabFormData['status'] }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700">Cancel</button>
          <button type="button" onClick={() => onSave(form)} className="rounded-2xl bg-linear-to-r from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white">Save</button>
        </div>
      </div>
    </div>
  );
});
