'use client';

import { memo } from 'react';
import { Download, Eye } from 'lucide-react';
import type { PayrollRecord, PayrollStatus, PayrollPaymentStatus } from '@/types/payroll';
import { PAYROLL_STATUSES, PAYROLL_PAYMENT_STATUSES } from '@/types/payroll';

interface PayrollTableProps {
  records: PayrollRecord[];
  onView: (record: PayrollRecord) => void;
  onDownload: (record: PayrollRecord) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const PayrollTable = memo(function PayrollTable({ records, onView, onDownload }: PayrollTableProps) {
  const [DRAFT_STATUS, PROCESSING_STATUS, PROCESSED_STATUS, APPROVED_STATUS, PAID_STATUS] = PAYROLL_STATUSES;
  const [PENDING_PAYMENT_STATUS, SCHEDULED_PAYMENT_STATUS, PAID_PAYMENT_STATUS] = PAYROLL_PAYMENT_STATUSES;

  const payrollStatusStyleMap: Record<PayrollStatus, string> = {
    [DRAFT_STATUS]: 'bg-slate-100 text-slate-600',
    [PROCESSING_STATUS]: 'bg-amber-100 text-amber-700',
    [PROCESSED_STATUS]: 'bg-emerald-100 text-emerald-700',
    [APPROVED_STATUS]: 'bg-indigo-100 text-indigo-700',
    [PAID_STATUS]: 'bg-emerald-100 text-emerald-700',
  };

  const paymentStatusStyleMap: Record<PayrollPaymentStatus, string> = {
    [PENDING_PAYMENT_STATUS]: 'bg-slate-100 text-slate-600',
    [SCHEDULED_PAYMENT_STATUS]: 'bg-sky-100 text-sky-700',
    [PAID_PAYMENT_STATUS]: 'bg-emerald-100 text-emerald-700',
  };

  const getPayrollStatusClass = (status: PayrollStatus) => payrollStatusStyleMap[status] ?? 'bg-slate-100 text-slate-600';
  const getPaymentStatusClass = (status: PayrollPaymentStatus) => paymentStatusStyleMap[status] ?? 'bg-slate-100 text-slate-600';

  return (
    <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 font-semibold text-slate-900">Employee</th>
              <th className="px-5 py-4 font-semibold text-slate-900">Month</th>
              <th className="px-5 py-4 font-semibold text-right text-slate-900">Gross Salary</th>
              <th className="px-5 py-4 font-semibold text-right text-slate-900">Deductions</th>
              <th className="px-5 py-4 font-semibold text-right text-slate-900">Net Salary</th>
              <th className="px-5 py-4 font-semibold text-slate-900">Payroll Status</th>
              <th className="px-5 py-4 font-semibold text-slate-900">Payment Status</th>
              <th className="px-5 py-4 font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <div className="font-semibold text-slate-900">{record.employeeName}</div>
                  <div className="text-xs text-slate-500">{record.employeeId} • {record.department}</div>
                </td>
                <td className="px-5 py-4 text-slate-600">{record.month}</td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">{formatCurrency(record.grossSalary)}</td>
                <td className="px-5 py-4 text-right text-slate-600">{formatCurrency(record.totalDeductions)}</td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">{formatCurrency(record.netSalary)}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPayrollStatusClass(record.payrollStatus)}`}>
                    {record.payrollStatus}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPaymentStatusClass(record.paymentStatus)}`}>
                    {record.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onView(record)}
                      title="View Payslip"
                      aria-label={`View payslip for ${record.employeeName}`}
                      className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDownload(record)}
                      title="Download PDF"
                      aria-label={`Download payslip PDF for ${record.employeeName}`}
                      className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                    >
                      <Download className="h-4 w-4" />
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
