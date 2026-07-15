'use client';

import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import type { PayrollRecord, SalaryComponentEntry, StatutoryComponentEntry } from '@/types/payroll';
import { PAYROLL_STATUSES, PAYROLL_PAYMENT_STATUSES } from '@/types/payroll';

const companySettings = {
  logo: 'CT',
  companyName: 'COFOMO TECH',
  address: 'Hyderabad, Telangana, India',
  email: 'hr@cofomotech.com',
  phone: '+91 9876543210',
  website: 'www.cofomotech.com',
  allowManualOverride: true,
};

const employees = [
  {
    employeeId: 'EMP-1001',
    employeeName: 'Aarav Sharma',
    department: 'Technology',
    designation: 'Senior Developer',
    joiningDate: '01-Jan-2020',
    employmentType: 'Full Time',
    branch: 'Hyderabad',
  },
  {
    employeeId: 'EMP-1002',
    employeeName: 'Priya Singh',
    department: 'Finance',
    designation: 'Finance Analyst',
    joiningDate: '05-Feb-2021',
    employmentType: 'Contract',
    branch: 'Bangalore',
  },
  {
    employeeId: 'EMP-1003',
    employeeName: 'Divya Rao',
    department: 'HR',
    designation: 'HR Manager',
    joiningDate: '12-Mar-2019',
    employmentType: 'Full Time',
    branch: 'Mumbai',
  },
];

const salaryComponentDefaults: SalaryComponentEntry[] = [
  { name: 'Basic Salary', amount: 120000 },
  { name: 'HRA', amount: 18000 },
  { name: 'Special Allowance', amount: 12000 },
  { name: 'Medical Allowance', amount: 2000 },
  { name: 'Conveyance', amount: 1000 },
  { name: 'Travel Allowance', amount: 1500 },
  { name: 'Bonus', amount: 6000 },
  { name: 'Gratuity', amount: 4000 },
];

const statutoryComponentDefaults: StatutoryComponentEntry[] = [
  { name: 'PF Employee', amount: 5400, category: 'Employee' },
  { name: 'ESI Employee', amount: 1800, category: 'Employee' },
  { name: 'Professional Tax', amount: 2000, category: 'Employee' },
  { name: 'Income Tax', amount: 4500, category: 'Employee' },
  { name: 'TDS', amount: 1800, category: 'Employee' },
  { name: 'LOP Deduction', amount: 0, category: 'Employee' },
  { name: 'Other Deductions', amount: 1500, category: 'Employee' },
  { name: 'PF Employer', amount: 7200, category: 'Employer' },
  { name: 'ESI Employer', amount: 2200, category: 'Employer' },
  { name: 'Gratuity', amount: 5000, category: 'Employer' },
  { name: 'Insurance', amount: 0, category: 'Employer' },
];

const formSchema = z
  .object({
    employeeId: z.string().min(1, 'Select employee'),
    employeeName: z.string().min(1),
    department: z.string().min(1),
    designation: z.string().min(1),
    branch: z.string().min(1),
    employmentType: z.string().min(1),
    joiningDate: z.string().min(1),
    payrollMonth: z.string().min(1, 'Payroll month is required'),
    financialYear: z.string().min(1, 'Financial year is required'),
    payrollStatus: z.string().min(1, 'Payroll status is required'),
    processedDate: z.string().min(1, 'Processed date is required'),
    processedBy: z.string().min(1, 'Processed by is required'),
    panNumber: z.string().optional(),
    uanNumber: z.string().optional(),
    workingDays: z.number().positive('Working days must be greater than zero'),
    presentDays: z.number().min(0),
    absentDays: z.number().min(0),
    paidLeave: z.number().min(0),
    lopDays: z.number().min(0),
    salaryComponents: z.array(
      z.object({
        name: z.string(),
        amount: z.number().nonnegative('Amount cannot be negative'),
      })
    ),
    statutoryComponents: z.array(
      z.object({
        name: z.string(),
        amount: z.number().nonnegative('Amount cannot be negative'),
        category: z.enum(['Employee', 'Employer', 'Deduction']),
      })
    ),
    paymentStatus: z.string().min(1, 'Payment status is required'),
    paymentDate: z.string().min(1, 'Payment date is required'),
    paymentMode: z.string().min(1, 'Payment mode is required'),
    transactionId: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    remarks: z.string().optional(),
  })
  .refine((data) => data.presentDays <= data.workingDays, {
    message: 'Present days cannot exceed working days',
    path: ['presentDays'],
  });

type GeneratePayslipFormValues = z.infer<typeof formSchema>;

interface GeneratePayslipModalProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onCreate: (record: PayrollRecord) => void;
}

export const GeneratePayslipModal: React.FC<GeneratePayslipModalProps> = ({ open, isLoading, onClose, onCreate }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GeneratePayslipFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: employees[0].employeeId,
      employeeName: employees[0].employeeName,
      department: employees[0].department,
      designation: employees[0].designation,
      branch: employees[0].branch,
      employmentType: employees[0].employmentType,
      joiningDate: employees[0].joiningDate,
      payrollMonth: 'June 2026',
      financialYear: '2025-26',
      payrollStatus: PAYROLL_STATUSES[2],
      processedDate: new Date().toISOString().slice(0, 10),
      processedBy: 'Payroll Team',
      workingDays: 24,
      presentDays: 24,
      absentDays: 0,
      paidLeave: 0,
      lopDays: 0,
      salaryComponents: salaryComponentDefaults,
      statutoryComponents: statutoryComponentDefaults,
      paymentStatus: PAYROLL_PAYMENT_STATUSES[2],
      paymentDate: new Date().toISOString().slice(0, 10),
      paymentMode: 'Bank Transfer',
      	  transactionId: 'TXN-2026-0001',
      bankName: 'ICICI Bank',
      accountNumber: '****6789',
      	  panNumber: 'ABCDE1234F',
      	  uanNumber: '100200300400',
      	  remarks: 'Payroll generated successfully.',
    },
  });

  const salaryComponents = useFieldArray({ control, name: 'salaryComponents' });
  const statutoryComponents = useFieldArray({ control, name: 'statutoryComponents' });

  const watchedValues = watch();

  useEffect(() => {
    const selectedEmployee = employees.find((item) => item.employeeId === watchedValues.employeeId);
    if (selectedEmployee) {
      setValue('employeeName', selectedEmployee.employeeName);
      setValue('department', selectedEmployee.department);
      setValue('designation', selectedEmployee.designation);
      setValue('branch', selectedEmployee.branch);
      setValue('employmentType', selectedEmployee.employmentType);
      setValue('joiningDate', selectedEmployee.joiningDate);
    }
  }, [watchedValues.employeeId, setValue]);

  const totalEarnings = useMemo(
    () => watchedValues.salaryComponents?.reduce((sum, item) => sum + (item?.amount ?? 0), 0) ?? 0,
    [watchedValues.salaryComponents]
  );

  const employeeDeductions = useMemo(
    () =>
      watchedValues.statutoryComponents?.reduce((sum, item) =>
        item.category === 'Employee' || item.name === 'LOP Deduction' || item.name === 'Other Deductions' ? sum + (item?.amount ?? 0) : sum,
        0
      ) ?? 0,
    [watchedValues.statutoryComponents]
  );

  const employerContribution = useMemo(
    () =>
      watchedValues.statutoryComponents?.reduce((sum, item) =>
        item.category === 'Employer' ? sum + (item?.amount ?? 0) : sum,
        0
      ) ?? 0,
    [watchedValues.statutoryComponents]
  );

  const grossSalary = totalEarnings;
  const totalDeductions = employeeDeductions;
  const netSalary = totalEarnings - totalDeductions;
  const attendancePercentage = watchedValues.workingDays > 0 ? (watchedValues.presentDays / watchedValues.workingDays) * 100 : 0;

  const handleCreate = (values: GeneratePayslipFormValues) => {
    const newRecord: PayrollRecord = {
      id: `PR-${Date.now()}`,
      employeeId: values.employeeId,
      employeeName: values.employeeName,
      department: values.department,
      designation: values.designation,
      branch: values.branch,
      employmentType: values.employmentType,
      month: values.payrollMonth,
      financialYear: values.financialYear,
      grossSalary,
      totalEarnings,
      totalDeductions,
      netSalary,
      grossPay: grossSalary,
      netPay: netSalary,
      payrollStatus: values.payrollStatus as PayrollRecord['payrollStatus'],
      paymentStatus: values.paymentStatus as PayrollRecord['paymentStatus'],
      processedBy: values.processedBy,
      processedDate: values.processedDate,
      generatedDate: new Date().toISOString(),
      salaryComponents: values.salaryComponents,
      statutoryComponents: values.statutoryComponents,
      paymentMode: values.paymentMode,
      transactionId: values.transactionId ?? '',
      bankName: values.bankName ?? '',
      accountNumber: values.accountNumber ?? '',
      panNumber: values.panNumber ?? '',
      uanNumber: values.uanNumber ?? '',
      remarks: values.remarks ?? '',
      basicSalary: values.salaryComponents.find((item) => item.name === 'Basic Salary')?.amount ?? 0,
      hra: values.salaryComponents.find((item) => item.name === 'HRA')?.amount ?? 0,
      specialAllowance: values.salaryComponents.find((item) => item.name === 'Special Allowance')?.amount ?? 0,
      medicalAllowance: values.salaryComponents.find((item) => item.name === 'Medical Allowance')?.amount ?? 0,
      conveyance: values.salaryComponents.find((item) => item.name === 'Conveyance')?.amount ?? 0,
      bonus: values.salaryComponents.find((item) => item.name === 'Bonus')?.amount ?? 0,
      gratuity: values.salaryComponents.find((item) => item.name === 'Gratuity')?.amount ?? 0,
      customEarnings: 0,
      pfEmployee: values.statutoryComponents.find((item) => item.name === 'PF Employee')?.amount ?? 0,
      pfEmployer: values.statutoryComponents.find((item) => item.name === 'PF Employer')?.amount ?? 0,
      esiEmployee: values.statutoryComponents.find((item) => item.name === 'ESI Employee')?.amount ?? 0,
      esiEmployer: values.statutoryComponents.find((item) => item.name === 'ESI Employer')?.amount ?? 0,
      professionalTax: values.statutoryComponents.find((item) => item.name === 'Professional Tax')?.amount ?? 0,
      incomeTax: values.statutoryComponents.find((item) => item.name === 'Income Tax')?.amount ?? 0,
      tds: values.statutoryComponents.find((item) => item.name === 'TDS')?.amount ?? 0,
      lopDeduction: values.statutoryComponents.find((item) => item.name === 'LOP Deduction')?.amount ?? 0,
      otherDeductions: values.statutoryComponents.find((item) => item.name === 'Other Deductions')?.amount ?? 0,
      insurance: values.statutoryComponents.find((item) => item.name === 'Insurance')?.amount ?? 0,
      workingDays: values.workingDays,
      presentDays: values.presentDays,
      absentDays: values.absentDays,
      paidLeave: values.paidLeave,
      lopDays: values.lopDays,
      attendancePercentage,
    };

    onCreate(newRecord);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="w-full max-w-7xl overflow-hidden rounded-4xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Generate Payslip</h2>
            <p className="text-sm text-slate-500">Use salary and statutory components to create a new payslip record.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleCreate)} className="flex h-full flex-col">
          <div className="space-y-8 overflow-y-auto p-6">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Company Information</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Logo</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{companySettings.logo}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Company</p>
                    <p className="mt-2 font-semibold text-slate-900">{companySettings.companyName}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Contact</p>
                    <p className="mt-2 text-slate-700">{companySettings.address}</p>
                    <p className="text-slate-700">{companySettings.email}</p>
                    <p className="text-slate-700">{companySettings.phone}</p>
                    <p className="text-slate-700">{companySettings.website}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Employee Information</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-600">
                    <span>Employee</span>
                    <select {...register('employeeId')} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none">
                      {employees.map((employee) => (
                        <option key={employee.employeeId} value={employee.employeeId}>
                          {employee.employeeName} • {employee.employeeId}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="space-y-2 text-sm text-slate-600">
                    <span>Name</span>
                    <input value={watchedValues.employeeName} readOnly className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900" />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <span>ID</span>
                    <input value={watchedValues.employeeId} readOnly className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900" />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <span>PAN</span>
                    <input {...register('panNumber')} placeholder="ABCDE1234F" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <span>UAN</span>
                    <input {...register('uanNumber')} placeholder="100200300400" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <span>Department</span>
                    <input value={watchedValues.department} readOnly className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900" />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <span>Designation</span>
                    <input value={watchedValues.designation} readOnly className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900" />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <span>Branch</span>
                    <input value={watchedValues.branch} readOnly className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900" />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <span>Employment Type</span>
                    <input value={watchedValues.employmentType} readOnly className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900" />
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <span>Joining Date</span>
                    <input value={watchedValues.joiningDate} readOnly className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Payroll Details</h3>
                <div className="mt-4 space-y-4 text-sm text-slate-700">
                  <label className="block">
                    <span className="text-slate-600">Payroll Month</span>
                    <input {...register('payrollMonth')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                    {errors.payrollMonth && <p className="mt-1 text-xs text-red-500">{errors.payrollMonth.message}</p>}
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Financial Year</span>
                    <input {...register('financialYear')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                    {errors.financialYear && <p className="mt-1 text-xs text-red-500">{errors.financialYear.message}</p>}
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Payroll Status</span>
                    <select {...register('payrollStatus')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none">
                      {PAYROLL_STATUSES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Processed Date</span>
                    <input type="date" {...register('processedDate')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Processed By</span>
                    <input {...register('processedBy')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </label>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Attendance</h3>
                <div className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-slate-600">Working Days</span>
                    <input type="number" {...register('workingDays', { valueAsNumber: true })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                    {errors.workingDays && <p className="mt-1 text-xs text-red-500">{errors.workingDays.message}</p>}
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Present Days</span>
                    <input type="number" {...register('presentDays', { valueAsNumber: true })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                    {errors.presentDays && <p className="mt-1 text-xs text-red-500">{errors.presentDays.message}</p>}
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Absent Days</span>
                    <input type="number" {...register('absentDays', { valueAsNumber: true })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Paid Leave</span>
                    <input type="number" {...register('paidLeave', { valueAsNumber: true })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-slate-600">LOP Days</span>
                    <input type="number" {...register('lopDays', { valueAsNumber: true })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </label>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Attendance %</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{attendancePercentage.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Summary</h3>
                <div className="mt-4 space-y-4 text-sm text-slate-700">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Gross Salary</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">₹{grossSalary.toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total Deductions</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">₹{totalDeductions.toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Net Salary</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">₹{netSalary.toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Employer Contribution</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">₹{employerContribution.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Salary Components</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  {salaryComponents.fields.map((field, index) => (
                    <label key={field.id} className="grid gap-2">
                      <span className="text-slate-600">{field.name}</span>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`salaryComponents.${index}.amount`, { valueAsNumber: true })}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Statutory Components</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  {statutoryComponents.fields.map((field, index) => (
                    <label key={field.id} className="grid gap-2">
                      <span className="text-slate-600">{field.name}</span>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`statutoryComponents.${index}.amount`, { valueAsNumber: true })}
                        disabled={!companySettings.allowManualOverride}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </label>
                  ))}
                </div>
                {!companySettings.allowManualOverride && (
                  <p className="mt-3 text-xs text-slate-500">Manual override is disabled for statutory values.</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Payment Information</h3>
                <div className="mt-4 grid gap-4 text-sm text-slate-700">
                  <label className="block">
                    <span className="text-slate-600">Payment Status</span>
                    <select {...register('paymentStatus')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none">
                      {PAYROLL_PAYMENT_STATUSES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Payment Date</span>
                    <input type="date" {...register('paymentDate')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Payment Mode</span>
                    <select {...register('paymentMode')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none">
                      <option>Bank Transfer</option>
                      <option>Cheque</option>
                      <option>Cash</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Transaction ID</span>
                    <input {...register('transactionId')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Bank Name</span>
                    <input {...register('bankName')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-slate-600">Account Number</span>
                    <input {...register('accountNumber')} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none" />
                  </label>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Remarks</h3>
                <label className="block text-sm text-slate-600">
                  <span className="sr-only">Remarks</span>
                  <textarea {...register('remarks')} rows={8} className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none"></textarea>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 bg-slate-100 px-6 py-4">
            <div className="text-sm text-slate-600">All calculations update automatically as values change.</div>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {isLoading ? 'Generating...' : 'Generate Payslip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
