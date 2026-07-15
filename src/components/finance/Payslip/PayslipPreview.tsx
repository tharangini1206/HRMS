'use client';

import { memo } from 'react';
import { Download, Mail, Printer, Share2 } from 'lucide-react';
import type { PayrollRecord } from '@/types/payroll';

interface PayslipPreviewProps {
  record: PayrollRecord;
  pdfMode?: boolean;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const PayslipPreview = memo(function PayslipPreview({ record, pdfMode = false }: PayslipPreviewProps) {
  const totalEarnings = record.basicSalary + record.hra + record.specialAllowance + record.bonus + record.gratuity + 2000 + 1500 + 1000;
  const totalDeductions = record.pfEmployee + record.esiEmployee + record.professionalTax + record.incomeTax + record.tds + record.lopDeduction + record.otherDeductions;
  const totalEmployerContribution = record.pfEmployer + record.esiEmployer;

  return (
    <div className="rounded-[20px] border border-slate-200 bg-white shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)]">
      

      {/* Company Header */}
      <div className={pdfMode ? 'border-b border-slate-200 bg-slate-100 p-8' : 'border-b border-slate-200 bg-linear-to-r from-slate-50 to-slate-100 p-8'}>
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold text-xl">CT</div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">COFOMO TECH</h1>
                <p className="text-sm text-slate-600">Employee Payroll Management System</p>
              </div>
            </div>
            <div className="text-right space-y-1 text-xs text-slate-600">
              <p><span className="font-semibold">Hyderabad, Telangana, India</span></p>
              <p>Email: <span className="font-medium">hr@cofomotech.com</span></p>
              <p>Phone: <span className="font-medium">+91 9876543210</span></p>
              <p>Website: <span className="font-medium">www.cofomotech.com</span></p>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900">PAYSLIP</h2>
            <p className="text-sm text-slate-600">Salary Month: {record.month}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6 max-w-4xl mx-auto">
        {/* Employee Information & Payroll Information */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Employee Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Employee Name</span>
                <span className="font-semibold text-slate-900">{record.employeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Employee ID</span>
                <span className="font-semibold text-slate-900">{record.employeeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">PAN</span>
                <span className="font-semibold text-slate-900">{record.panNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">UAN</span>
                <span className="font-semibold text-slate-900">{record.uanNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Department</span>
                <span className="font-semibold text-slate-900">{record.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Designation</span>
                <span className="font-semibold text-slate-900">Senior Developer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Joining Date</span>
                <span className="font-semibold text-slate-900">01-Jan-2020</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Payroll Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Payroll ID</span>
                <span className="font-semibold text-slate-900">{record.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Processed By</span>
                <span className="font-semibold text-slate-900">{record.processedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Processed Date</span>
                <span className="font-semibold text-slate-900">{record.processedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Payroll Status</span>
                <span className={`font-semibold px-2 py-1 rounded text-xs ${record.payrollStatus === 'Processed' || record.payrollStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {record.payrollStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Financial Year</span>
                <span className="font-semibold text-slate-900">2025-26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Summary */}
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Summary</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="text-center p-3 bg-slate-50 rounded">
              <p className="text-xs text-slate-600 font-semibold">Gross Salary</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(record.grossSalary)}</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded">
              <p className="text-xs text-slate-600 font-semibold">Net Salary</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(record.netSalary)}</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded">
              <p className="text-xs text-slate-600 font-semibold">Working Days</p>
              <p className="text-lg font-bold text-slate-900">{record.workingDays}</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded">
              <p className="text-xs text-slate-600 font-semibold">Present Days</p>
              <p className="text-lg font-bold text-slate-900">{record.presentDays}</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded">
              <p className="text-xs text-slate-600 font-semibold">Absent Days</p>
              <p className="text-lg font-bold text-slate-900">{record.absentDays}</p>
            </div>
          </div>
          <div className="mt-4 text-center p-3 bg-blue-50 rounded">
            <p className="text-xs text-slate-600 font-semibold">Attendance</p>
            <p className="text-xl font-bold text-slate-900">{record.presentDays} / {record.workingDays}</p>
          </div>
        </div>

        {/* Earnings and Deductions */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Earnings</h3>
            <div className="space-y-2 text-sm">
              {[
                ['Basic Salary', record.basicSalary],
                ['HRA', record.hra],
                ['Special Allowance', record.specialAllowance],
                ['Bonus', record.bonus],
                ['Medical Allowance', 2000],
                ['Travel Allowance', 1500],
                ['Conveyance', 1000],
                ['Gratuity', record.gratuity],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(Number(value))}</span>
                </div>
              ))}
              <div className="flex justify-between border-t-2 border-slate-300 pt-2 mt-2">
                <span className="font-bold text-slate-900">Total Earnings</span>
                <span className="font-bold text-emerald-600">{formatCurrency(totalEarnings)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Deductions</h3>
            <div className="space-y-2 text-sm">
              {[
                ['PF Employee', record.pfEmployee],
                ['ESI Employee', record.esiEmployee],
                ['Professional Tax', record.professionalTax],
                ['Income Tax', record.incomeTax],
                ['TDS', record.tds],
                ['LOP Deduction', record.lopDeduction],
                ['Other Deductions', record.otherDeductions],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-600">{label}</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(Number(value))}</span>
                </div>
              ))}
              <div className="flex justify-between border-t-2 border-slate-300 pt-2 mt-2">
                <span className="font-bold text-slate-900">Total Deductions</span>
                <span className="font-bold text-red-600">{formatCurrency(totalDeductions)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Employer Contributions */}
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Employer Contributions</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              ['PF Employer', record.pfEmployer],
              ['ESI Employer', record.esiEmployer],
              ['Gratuity Contribution', 5000],
            ].map(([label, value]) => (
              <div key={label} className="text-center p-3 bg-slate-50 rounded">
                <p className="text-xs text-slate-600 font-semibold">{label}</p>
                <p className="text-lg font-bold text-slate-900">{formatCurrency(Number(value))}</p>
              </div>
            ))}
            <div className="text-center p-3 bg-blue-50 rounded">
              <p className="text-xs text-slate-600 font-semibold">Total Employer Contribution</p>
              <p className="text-lg font-bold text-blue-600">{formatCurrency(totalEmployerContribution + 5000)}</p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Payment Information</h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <p className="text-xs text-slate-600 font-semibold mb-1">Payment Status</p>
              <p className={`text-sm font-semibold px-2 py-1 rounded inline-block ${record.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : record.paymentStatus === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                {record.paymentStatus}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-semibold mb-1">Payment Date</p>
              <p className="text-sm font-semibold text-slate-900">30-Jun-2026</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-semibold mb-1">Payment Mode</p>
              <p className="text-sm font-semibold text-slate-900">Bank Transfer</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-semibold mb-1">Transaction ID</p>
              <p className="text-sm font-semibold text-slate-900">TXN-2026-0625</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-semibold mb-1">Bank Name</p>
              <p className="text-sm font-semibold text-slate-900">ICICI Bank</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-semibold mb-1">Account Number</p>
              <p className="text-sm font-semibold text-slate-900">****6789</p>
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div className="rounded-lg border border-slate-200 p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">Remarks</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p>✓ Payroll generated successfully.</p>
            <p>✓ No pending deductions.</p>
            <p>✓ Attendance marked for {record.presentDays} days.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 pt-6 mt-8 text-center text-xs text-slate-500 space-y-2">
          <p>This is a computer-generated payslip and does not require a signature.</p>
          <p className="font-semibold">© 2026 COFOMO TECH | Employee Payroll Management System</p>
        </div>
      </div>
    </div>
  );
});

export function PayslipPdfPreview({ record }: PayslipPreviewProps) {
  const totalEarnings = record.basicSalary + record.hra + record.specialAllowance + record.bonus + record.gratuity + 2000 + 1500 + 1000;
  const totalDeductions = record.pfEmployee + record.esiEmployee + record.professionalTax + record.incomeTax + record.tds + record.lopDeduction + record.otherDeductions;
  const totalEmployerContribution = record.pfEmployer + record.esiEmployer;

  const contentStyle = {
    color: '#0f172a',
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    boxShadow: '0 20px 70px -40px rgba(15, 23, 42, 0.25)',
  } as const;

  return (
    <div style={{ width: '794px', ...contentStyle, border: '1px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end', padding: '24px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
        {['Download PDF', 'Print', 'Email', 'Share'].map((label) => (
          <button
            key={label}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '24px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              padding: '10px 16px',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#475569',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', padding: '32px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#ef4444', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.25rem' }}>
                CT
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>COFOMO TECH</h1>
                <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: '#475569' }}>Employee Payroll Management System</p>
              </div>
            </div>
            <div style={{ textAlign: 'right', color: '#475569', fontSize: '0.75rem' }}>
              <p style={{ margin: 0, fontWeight: 700 }}>Hyderabad, Telangana, India</p>
              <p style={{ margin: '4px 0 0' }}>Email: hr@cofomotech.com</p>
              <p style={{ margin: '4px 0 0' }}>Phone: +91 9876543210</p>
              <p style={{ margin: '4px 0 0' }}>Website: www.cofomotech.com</p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>PAYSLIP</h2>
            <p style={{ margin: '8px 0 0', fontSize: '0.875rem', color: '#475569' }}>Salary Month: {record.month}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '32px', maxWidth: '960px', margin: '0 auto', display: 'grid', gap: '24px' }}>
        <section style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
          {[
            {
              title: 'Employee Information',
              rows: [
                ['Employee Name', record.employeeName],
                ['Employee ID', record.employeeId],
                ['PAN', record.panNumber],
                ['UAN', record.uanNumber],
                ['Department', record.department],
                ['Designation', 'Senior Developer'],
                ['Joining Date', '01-Jan-2020'],
              ],
            },
            {
              title: 'Payroll Information',
              rows: [
                ['Payroll ID', record.id],
                ['Processed By', record.processedBy],
                ['Processed Date', record.processedDate],
                ['Payroll Status', record.payrollStatus],
                ['Financial Year', '2025-26'],
              ],
            },
          ].map((block) => (
            <div key={block.title} style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: '16px' }}>{block.title}</h3>
              <div style={{ display: 'grid', gap: '12px', fontSize: '0.875rem', color: '#475569' }}>
                {block.rows.map(([label, value]) => (
                  <div key={String(label)} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{label}</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: '16px' }}>Summary</h3>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            {[
              ['Gross Salary', formatCurrency(record.grossSalary)],
              ['Net Salary', formatCurrency(record.netSalary)],
              ['Working Days', record.workingDays],
              ['Present Days', record.presentDays],
              ['Absent Days', record.absentDays],
            ].map(([label, value]) => (
              <div key={label} style={{ borderRadius: '16px', backgroundColor: '#f8fafc', padding: '16px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>{label}</p>
                <p style={{ margin: '8px 0 0', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{value}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center', borderRadius: '16px', padding: '16px', backgroundColor: '#e0f2fe' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Attendance</p>
            <p style={{ margin: '8px 0 0', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{record.presentDays} / {record.workingDays}</p>
          </div>
        </section>

        <section style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: '16px' }}>Earnings</h3>
            <div style={{ display: 'grid', gap: '12px', color: '#475569', fontSize: '0.875rem' }}>
              {[
                ['Basic Salary', record.basicSalary],
                ['HRA', record.hra],
                ['Special Allowance', record.specialAllowance],
                ['Bonus', record.bonus],
                ['Medical Allowance', 2000],
                ['Travel Allowance', 1500],
                ['Conveyance', 1000],
                ['Gratuity', record.gratuity],
              ].map(([label, value]) => (
                <div key={String(label)} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <span>{label}</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{formatCurrency(Number(value))}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', marginTop: '8px', borderTop: '2px solid #cbd5e1' }}>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>Total Earnings</span>
                <span style={{ fontWeight: 700, color: '#047857' }}>{formatCurrency(totalEarnings)}</span>
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: '16px' }}>Deductions</h3>
            <div style={{ display: 'grid', gap: '12px', color: '#475569', fontSize: '0.875rem' }}>
              {[
                ['PF Employee', record.pfEmployee],
                ['ESI Employee', record.esiEmployee],
                ['Professional Tax', record.professionalTax],
                ['Income Tax', record.incomeTax],
                ['TDS', record.tds],
                ['LOP Deduction', record.lopDeduction],
                ['Other Deductions', record.otherDeductions],
              ].map(([label, value]) => (
                <div key={String(label)} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <span>{label}</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{formatCurrency(Number(value))}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', marginTop: '8px', borderTop: '2px solid #cbd5e1' }}>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>Total Deductions</span>
                <span style={{ fontWeight: 700, color: '#b91c1c' }}>{formatCurrency(totalDeductions)}</span>
              </div>
            </div>
          </div>
        </section>

        <section style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: '16px' }}>Employer Contributions</h3>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            {[
              ['PF Employer', record.pfEmployer],
              ['ESI Employer', record.esiEmployer],
              ['Gratuity Contribution', 5000],
            ].map(([label, value]) => (
              <div key={String(label)} style={{ borderRadius: '16px', backgroundColor: '#f8fafc', padding: '16px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>{label}</p>
                <p style={{ margin: '10px 0 0', fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{formatCurrency(Number(value))}</p>
              </div>
            ))}
            <div style={{ borderRadius: '16px', backgroundColor: '#dbeafe', padding: '16px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Total Employer Contribution</p>
              <p style={{ margin: '10px 0 0', fontSize: '1rem', fontWeight: 700, color: '#1d4ed8' }}>{formatCurrency(totalEmployerContribution + 5000)}</p>
            </div>
          </div>
        </section>

        <section style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: '16px' }}>Payment Information</h3>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', fontSize: '0.875rem', color: '#475569' }}>
            {[
              ['Payment Status', record.paymentStatus],
              ['Payment Date', '30-Jun-2026'],
              ['Payment Mode', 'Bank Transfer'],
              ['Transaction ID', 'TXN-2026-0625'],
              ['Bank Name', 'ICICI Bank'],
              ['Account Number', '****6789'],
            ].map(([label, value]) => (
              <div key={String(label)}>
                <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>{label}</p>
                <p style={{ margin: '8px 0 0', fontWeight: 700, color: '#0f172a' }}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#475569', marginBottom: '16px' }}>Remarks</h3>
          <div style={{ display: 'grid', gap: '8px', color: '#475569', fontSize: '0.875rem' }}>
            <p style={{ margin: 0 }}>✓ Payroll generated successfully.</p>
            <p style={{ margin: 0 }}>✓ No pending deductions.</p>
            <p style={{ margin: 0 }}>✓ Attendance marked for {record.presentDays} days.</p>
          </div>
        </section>

        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px', marginTop: '32px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem' }}>
          <p style={{ margin: 0 }}>This is a computer-generated payslip and does not require a signature.</p>
          <p style={{ margin: '8px 0 0', fontWeight: 700 }}>© 2026 COFOMO TECH | Employee Payroll Management System</p>
        </div>
      </div>
    </div>
  );
}
