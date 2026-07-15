'use client';

import { memo, useEffect, useState } from 'react';
import type { TaxConfiguration, TaxConfigurationFormData } from '@/types/tax';

interface TaxConfigurationModalProps {
  open: boolean;
  data: TaxConfiguration | null;
  onClose: () => void;
  onSave: (payload: TaxConfigurationFormData) => void;
}

const initialState = (data: TaxConfiguration | null): TaxConfigurationFormData => ({
  financialYear: data?.financialYear ?? '2026-27',
  taxRegime: data?.taxRegime ?? 'New Regime',
  standardDeduction: data?.standardDeduction ?? 50000,
  rebateLimit: data?.rebateLimit ?? 700000,
  rebateAmount: data?.rebateAmount ?? 25000,
  cessPercentage: data?.cessPercentage ?? 4,
  effectiveDate: data?.effectiveDate ?? '2026-04-01',
  status: data?.status ?? 'Active',
});

export const TaxConfigurationModal = memo(function TaxConfigurationModal({ open, data, onClose, onSave }: TaxConfigurationModalProps) {
  const [form, setForm] = useState<TaxConfigurationFormData>(initialState(data));

  useEffect(() => {
    setForm(initialState(data));
  }, [data, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
      <div className="w-full max-w-2xl rounded-[20px] border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Edit Configuration</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Tax Configuration</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-600">Close</button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm text-slate-600">
            <span>Financial Year</span>
            <input value={form.financialYear} onChange={(event) => setForm((current) => ({ ...current, financialYear: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Tax Regime</span>
            <select value={form.taxRegime} onChange={(event) => setForm((current) => ({ ...current, taxRegime: event.target.value as TaxConfigurationFormData['taxRegime'] }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none">
              <option>New Regime</option>
              <option>Old Regime</option>
            </select>
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Standard Deduction</span>
            <input type="number" value={form.standardDeduction} onChange={(event) => setForm((current) => ({ ...current, standardDeduction: Number(event.target.value) }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Rebate Limit</span>
            <input type="number" value={form.rebateLimit} onChange={(event) => setForm((current) => ({ ...current, rebateLimit: Number(event.target.value) }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Rebate Amount</span>
            <input type="number" value={form.rebateAmount} onChange={(event) => setForm((current) => ({ ...current, rebateAmount: Number(event.target.value) }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Cess %</span>
            <input type="number" value={form.cessPercentage} onChange={(event) => setForm((current) => ({ ...current, cessPercentage: Number(event.target.value) }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Effective Date</span>
            <input type="date" value={form.effectiveDate} onChange={(event) => setForm((current) => ({ ...current, effectiveDate: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none" />
          </label>
          <label className="space-y-1 text-sm text-slate-600">
            <span>Status</span>
            <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as TaxConfigurationFormData['status'] }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none">
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
