import React, { useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface SalaryStatementCardProps {
  id: number;
  month: string;
  grossSalary: number;
  netSalary: number;
  paymentDate: string;
  employeeId: string;
  status: 'Available' | 'Processing' | 'Unavailable';
  onPreview: (id: number) => void;
  onDownload: (id: number) => void;
}

export const SalaryStatementCard: React.FC<SalaryStatementCardProps> = ({
  id,
  month,
  grossSalary,
  netSalary,
  paymentDate,
  employeeId,
  status,
  onPreview,
  onDownload,
}) => {
  const isAvailable = status === 'Available';

  return (
    <div className="group rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:shadow-lg hover:-translate-y-1">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{month}</h3>
            <p className="text-xs text-slate-500 mt-1">{employeeId}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200" />

        {/* Salary Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Gross Salary</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₹{grossSalary.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase">Net Salary</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">₹{netSalary.toLocaleString()}</p>
          </div>
        </div>

        {/* Payment Date */}
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase">Payment Date</p>
          <p className="mt-1 text-sm text-slate-700">{paymentDate}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200" />

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onPreview(id)}
            disabled={!isAvailable}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isAvailable
                ? 'border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300'
                : 'border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>

          <button
            onClick={() => onDownload(id)}
            disabled={!isAvailable}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isAvailable
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300'
                : 'border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
