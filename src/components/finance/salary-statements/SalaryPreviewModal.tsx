import React from 'react';
import { X, Download } from 'lucide-react';

interface SalaryPreviewModalProps {
  isOpen: boolean;
  month: string;
  employeeId: string;
  employeeName: string;
  grossSalary: number;
  netSalary: number;
  allowances: Array<{ name: string; amount: number }>;
  deductions: Array<{ name: string; amount: number }>;
  onClose: () => void;
  onDownload: () => void;
}

export const SalaryPreviewModal: React.FC<SalaryPreviewModalProps> = ({
  isOpen,
  month,
  employeeId,
  employeeName,
  grossSalary,
  netSalary,
  allowances,
  deductions,
  onClose,
  onDownload,
}) => {
  if (!isOpen) return null;

  const totalAllowances = allowances.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/20 bg-white/90 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <h2 className="text-2xl font-bold text-slate-900">Salary Slip - {month}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100 transition"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6 space-y-6">
          {/* Employee Details */}
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Employee Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-600">Name</p>
                <p className="text-sm font-medium text-slate-900">{employeeName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Employee ID</p>
                <p className="text-sm font-medium text-slate-900">{employeeId}</p>
              </div>
            </div>
          </div>

          {/* Salary Summary */}
          <div className="rounded-xl bg-blue-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Salary Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-600">Gross Salary</p>
                <p className="text-xl font-bold text-slate-900">₹{grossSalary.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600">Net Salary</p>
                <p className="text-xl font-bold text-blue-600">₹{netSalary.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Allowances */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Allowances</h3>
            <div className="space-y-2 rounded-xl bg-emerald-50 p-4">
              {allowances.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-sm text-slate-700">{item.name}</p>
                  <p className="text-sm font-medium text-emerald-700">₹{item.amount.toLocaleString()}</p>
                </div>
              ))}
              <div className="border-t border-emerald-200 mt-2 pt-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Total Allowances</p>
                <p className="text-sm font-semibold text-emerald-700">₹{totalAllowances.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Deductions</h3>
            <div className="space-y-2 rounded-xl bg-red-50 p-4">
              {deductions.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-sm text-slate-700">{item.name}</p>
                  <p className="text-sm font-medium text-red-700">-₹{item.amount.toLocaleString()}</p>
                </div>
              ))}
              <div className="border-t border-red-200 mt-2 pt-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Total Deductions</p>
                <p className="text-sm font-semibold text-red-700">-₹{totalDeductions.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Net Salary */}
          <div className="rounded-xl bg-linear-to-r from-blue-50 to-blue-100 p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Net Salary (Take Home)</p>
              <p className="text-2xl font-bold text-blue-600">₹{netSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
          <button
            onClick={onDownload}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
