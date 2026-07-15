'use client';

import { memo } from 'react';
import { X } from 'lucide-react';
import type { PayrollRecord } from '@/types/payroll';

interface PayrollDrawerProps {
  open: boolean;
  record: PayrollRecord | null;
  onClose: () => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const PayrollDrawer = memo(function PayrollDrawer({ open, record, onClose }: PayrollDrawerProps) {
  if (!open || !record) {
    return null;
  }

  const sections = [
    {
      title: 'Compensation',
      items: [
        ['Basic Salary', record.basicSalary],
        ['HRA', record.hra],
        ['Special Allowance', record.specialAllowance],
        ['Bonus', record.bonus],
        ['Gratuity', record.gratuity],
        ['Custom Earnings', record.customEarnings],
      ],
    },
    {
      title: 'Deductions',
      items: [
        ['PF Employee', record.pfEmployee],
        ['PF Employer', record.pfEmployer],
        ['ESI Employee', record.esiEmployee],
        ['ESI Employer', record.esiEmployer],
        ['Professional Tax', record.professionalTax],
        ['Income Tax', record.incomeTax],
        ['TDS', record.tds],
        ['LOP Deduction', record.lopDeduction],
        ['Other Deductions', record.otherDeductions],
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">
      <div className="flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Payroll Detail</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{record.employeeName}</h2>
            <p className="text-sm text-slate-500">ID: {record.employeeId} • {record.department} • {record.month}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 p-2 text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Gross Pay</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{formatCurrency(record.grossPay)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Net Pay</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{formatCurrency(record.netPay)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Working Days</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{record.workingDays}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Attendance</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{record.presentDays} present / {record.absentDays} absent</p>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="rounded-[20px] border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-900">{section.title}</h3>
                <div className="mt-4 space-y-3">
                  {section.items.map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between border-b border-slate-200 pb-2 text-sm">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(Number(value))}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
