'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePayroll } from '@/hooks/usePayroll';
import { PayslipPreview } from '@/components/finance/Payslip/PayslipPreview';
import type { PayrollRecord } from '@/types/payroll';

export default function PayslipPage() {
  const searchParams = useSearchParams();
  const { payrollQuery } = usePayroll();

  const records = useMemo(() => payrollQuery.data ?? [], [payrollQuery.data]);
  const selectedId = searchParams.get('selectedId');

  const selectedRecord = useMemo(() => {
    if (!records.length) return null;
    if (selectedId) {
      const found = records.find((record) => record.id === selectedId);
      if (found) return found;
    }
    return records[0] ?? null;
  }, [records, selectedId]);

  if (payrollQuery.isLoading) {
    return <div className="p-6 text-sm text-slate-500">Loading payslip preview...</div>;
  }

  if (payrollQuery.isError) {
    return <div className="p-6 text-sm text-red-600">Unable to load payslip preview right now.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Payslip</p>
        <h1 className="text-3xl font-semibold text-slate-950">Payslip preview and delivery</h1>
        <p className="text-sm text-slate-500">Preview the payslip HTML layout and prepare it for delivery to employees.</p>
      </div>

      {/* Payslip Preview */}
      {selectedRecord ? (
        <PayslipPreview record={selectedRecord} />
      ) : (
        <div className="rounded-[20px] border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
          <p className="text-sm text-slate-500">No payslips available. Generate payroll to create payslips.</p>
        </div>
      )}
    </div>
  );
}
