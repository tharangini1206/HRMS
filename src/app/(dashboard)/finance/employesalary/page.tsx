"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Eye, Edit3, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

import type { EmployeeSalaryStatus } from '@/types/finance';
import { EMPLOYEE_SALARY_STATUSES } from '@/types/finance';

export const STATUS = {
  ACTIVE: EMPLOYEE_SALARY_STATUSES[0],
  INACTIVE: EMPLOYEE_SALARY_STATUSES[1],
  PROCESSED: EMPLOYEE_SALARY_STATUSES[2],
};

type Status = EmployeeSalaryStatus;

type SalaryRecord = {
  id: number;
  employee: string;
  department: string;
  basicSalary: number;
  hra: number;
  medicalAllowance: number;
  travelAllowance: number;
  bonus: number;
  specialAllowance: number;
  otherAllowance: number;
  deductions: number;
  grossSalary: number;
  netSalary: number;
  effectiveDate: string;
  status: Status;
};

const initialSalaryRecords: SalaryRecord[] = [
  {
    id: 1,
    employee: 'John Doe',
    department: 'IT',
    basicSalary: 40000,
    hra: 10000,
    medicalAllowance: 2000,
    travelAllowance: 4000,
    bonus: 2000,
    specialAllowance: 1000,
    otherAllowance: 1000,
    deductions: 5000,
    grossSalary: 60000,
    netSalary: 55000,
    effectiveDate: '2026-07-01',
    status: STATUS.ACTIVE,
  },
  {
    id: 2,
    employee: 'Alex Martin',
    department: 'HR',
    basicSalary: 34000,
    hra: 8000,
    medicalAllowance: 1500,
    travelAllowance: 3500,
    bonus: 1500,
    specialAllowance: 1000,
    otherAllowance: 1000,
    deductions: 5000,
    grossSalary: 45000,
    netSalary: 40000,
    effectiveDate: '2026-07-01',
    status: STATUS.ACTIVE,
  },
  {
    id: 3,
    employee: 'Rahul Singh',
    department: 'Sales',
    basicSalary: 38000,
    hra: 9000,
    medicalAllowance: 1500,
    travelAllowance: 2500,
    bonus: 500,
    specialAllowance: 500,
    otherAllowance: 1000,
    deductions: 5000,
    grossSalary: 52000,
    netSalary: 47000,
    effectiveDate: '2026-07-01',
    status: STATUS.ACTIVE,
  },
];

const departments = ['All Departments', 'IT', 'HR', 'Sales', 'Finance', 'Operations'];

export default function EmployeeSalaryPage() {
  const [records, setRecords] = useState<SalaryRecord[]>(initialSalaryRecords);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState<SalaryRecord | null>(null);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const [formState, setFormState] = useState<SalaryRecord>({
    ...initialSalaryRecords[0],
    id: 0,
    employee: '',
    department: '',
    basicSalary: 0,
    hra: 0,
    medicalAllowance: 0,
    travelAllowance: 0,
    bonus: 0,
    specialAllowance: 0,
    otherAllowance: 0,
    deductions: 0,
    grossSalary: 0,
    netSalary: 0,
    effectiveDate: '',
    status: STATUS.ACTIVE,
  });

  const numericFields: (keyof SalaryRecord)[] = [
    'basicSalary',
    'hra',
    'medicalAllowance',
    'travelAllowance',
    'bonus',
    'specialAllowance',
    'otherAllowance',
    'deductions',
    'grossSalary',
    'netSalary',
  ];

  function parseCurrency(value: string) {
    return Number(value.replace(/\D/g, '')) || 0;
  }

  function formatCurrency(value: number) {
    return `₹${value.toLocaleString()}`;
  }

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const q = search.toLowerCase();
        const matchesSearch =
          record.employee.toLowerCase().includes(q) ||
          record.department.toLowerCase().includes(q) ||
          record.status.toLowerCase().includes(q);
        const matchesDepartment =
          departmentFilter === 'All Departments' || record.department === departmentFilter;
        return matchesSearch && matchesDepartment;
      }),
    [records, search, departmentFilter]
  );

  const openAddModal = () => {
    setFormState({
      ...initialSalaryRecords[0],
      id: Date.now(),
      employee: '',
      department: '',
      basicSalary: 0,
      hra: 0,
      medicalAllowance: 0,
      travelAllowance: 0,
      bonus: 0,
      specialAllowance: 0,
      otherAllowance: 0,
      deductions: 0,
      grossSalary: 0,
      netSalary: 0,
      effectiveDate: '',
      status: STATUS.ACTIVE,
    });
    setMode('add');
    setIsAddOpen(true);
  };

  const openViewModal = (record: SalaryRecord) => {
    setActiveRecord(record);
    setIsViewOpen(true);
  };

  const handleFormChange = (field: keyof SalaryRecord, value: string) => {
    setFormState((prev) => {
      if (numericFields.includes(field)) {
        // parse numeric inputs (allow formatted currency or raw numbers)
        return { ...prev, [field]: parseCurrency(value) } as SalaryRecord;
      }
      if (field === 'status') {
        return { ...prev, [field]: (value as Status) } as SalaryRecord;
      }
      return { ...prev, [field]: value } as SalaryRecord;
    });
  };

  const saveRecord = () => {
    // basic validation
    if (!formState.employee.trim()) return alert('Employee is required');
    if (!formState.department.trim()) return alert('Department is required');
    if (!formState.effectiveDate) return alert('Effective date is required');
    if (formState.basicSalary <= 0) return alert('Basic Salary must be greater than 0');

    const newGross =
      formState.basicSalary +
      formState.hra +
      formState.medicalAllowance +
      formState.travelAllowance +
      formState.bonus +
      formState.specialAllowance +
      formState.otherAllowance;

    const deductionValue = formState.deductions || 0;
    const grossSalary = newGross;
    const netSalary = Math.max(newGross - deductionValue, 0);

    const recordToSave: SalaryRecord = {
      ...formState,
      grossSalary,
      netSalary,
    };

    if (mode === 'add') {
      setRecords((current) => [recordToSave, ...current]);
      alert('Salary Added Successfully');
    } else {
      setRecords((current) => current.map((r) => (r.id === recordToSave.id ? recordToSave : r)));
      alert('Salary Updated Successfully');
    }

    setIsAddOpen(false);
  };

  const removeRecord = (id: number) => {
    if (!confirm('Delete this salary record?')) return;
    setRecords((current) => current.filter((record) => record.id !== id));
  };

  return (
    <div className="p-6 space-y-10">
      <div className="flex justify-end mb-4">
        <Link
          href="/dashboard/finance"
          className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Back to Finance Overview
        </Link>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Payroll • Employee salary management
          </p>
          <h1 className="text-4xl font-bold text-slate-950">Employee Salary</h1>
          <p className="max-w-2xl text-sm text-slate-500">
            View salary records, filter by department, and manage payroll approvals with the enterprise finance dashboard style.
          </p>
        </div>
      </div>

      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.18)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Employee salary</p>
            <h2 className="text-2xl font-semibold text-slate-950">Records and filters</h2>
          </div>
          <Button
            type="button"
            variant="primary"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-red-500 to-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/10 hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> Add Salary
          </Button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(240px,1fr)_280px]">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search employee"
            className="rounded-2xl border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder:text-slate-400"
          />
          <select
            value={departmentFilter}
            onChange={(event) => setDepartmentFilter(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.18)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01]">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Employee</th>
              <th className="px-6 py-4 text-left font-semibold">Department</th>
              <th className="px-6 py-4 text-left font-semibold">Gross Salary</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-600">
                  No salary records found.{' '}
                  <button
                    onClick={() => {
                      setMode('add');
                      openAddModal();
                    }}
                    className="ml-2 font-semibold text-blue-600"
                  >
                    Add Salary
                  </button>
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-900">{record.employee}</td>
                  <td className="px-6 py-4 text-slate-600">{record.department}</td>
                  <td className="px-6 py-4 text-slate-900">{formatCurrency(record.grossSalary)}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openViewModal(record)}
                        className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormState(record);
                          setMode('edit');
                          setIsAddOpen(true);
                        }}
                        className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeRecord(record.id)}
                        className="rounded-full border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={mode === 'add' ? 'Add Salary' : 'Edit Salary'}>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Employee *"
              value={formState.employee}
              onChange={(event) => handleFormChange('employee', event.target.value)}
              placeholder="Employee name"
            />
            <Input
              label="Department *"
              value={formState.department}
              onChange={(event) => handleFormChange('department', event.target.value)}
              placeholder="Department"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Basic Salary *"
              value={String(formState.basicSalary || '')}
              onChange={(event) => handleFormChange('basicSalary', event.target.value)}
              placeholder="₹0"
            />
            <Input
              label="HRA"
              value={String(formState.hra || '')}
              onChange={(event) => handleFormChange('hra', event.target.value)}
              placeholder="₹0"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Medical Allowance"
              value={String(formState.medicalAllowance || '')}
              onChange={(event) => handleFormChange('medicalAllowance', event.target.value)}
              placeholder="₹0"
            />
            <Input
              label="Travel Allowance"
              value={String(formState.travelAllowance || '')}
              onChange={(event) => handleFormChange('travelAllowance', event.target.value)}
              placeholder="₹0"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Bonus"
              value={String(formState.bonus || '')}
              onChange={(event) => handleFormChange('bonus', event.target.value)}
              placeholder="₹0"
            />
            <Input
              label="Special Allowance"
              value={String(formState.specialAllowance || '')}
              onChange={(event) => handleFormChange('specialAllowance', event.target.value)}
              placeholder="₹0"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Other Allowance"
              value={String(formState.otherAllowance || '')}
              onChange={(event) => handleFormChange('otherAllowance', event.target.value)}
              placeholder="₹0"
            />
            <Input
              label="Deductions"
              value={String(formState.deductions || '')}
              onChange={(event) => handleFormChange('deductions', event.target.value)}
              placeholder="₹0"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Effective Date"
              type="date"
              value={formState.effectiveDate}
              onChange={(event) => handleFormChange('effectiveDate', event.target.value)}
            />
            <select
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.status}
              onChange={(event) => handleFormChange('status', event.target.value)}
            >
              <option value={STATUS.ACTIVE}>{STATUS.ACTIVE}</option>
              <option value={STATUS.INACTIVE}>{STATUS.INACTIVE}</option>
              <option value={STATUS.PROCESSED}>{STATUS.PROCESSED}</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="primary" onClick={saveRecord}>
              {mode === 'add' ? 'Save' : 'Update'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="View Salary">
        {activeRecord ? (
          <div className="space-y-3 text-sm text-slate-700 max-h-[calc(100vh-12rem)] overflow-y-auto">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-lg font-semibold text-slate-900">Employee Information</h3>
              <p className="mt-2">Name: {activeRecord.employee}</p>
              <p>Department: {activeRecord.department}</p>
              <p>Status: {activeRecord.status}</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <h3 className="font-semibold text-slate-900">Basic Salary</h3>
                <p className="mt-2">{activeRecord.basicSalary}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
                <h3 className="font-semibold text-slate-900">Gross Salary</h3>
                <p className="mt-2">{activeRecord.grossSalary}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">Allowances</h3>
              <ul className="mt-2 space-y-1 text-slate-700">
                <li>HRA: {activeRecord.hra}</li>
                <li>Medical Allowance: {activeRecord.medicalAllowance}</li>
                <li>Travel Allowance: {activeRecord.travelAllowance}</li>
                <li>Bonus: {activeRecord.bonus}</li>
                <li>Special Allowance: {activeRecord.specialAllowance}</li>
                <li>Other Allowance: {activeRecord.otherAllowance}</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">Deductions</h3>
              <p className="mt-2">{activeRecord.deductions}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">Net Salary</h3>
                <p className="mt-2">{activeRecord.netSalary}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900">Effective Date</h3>
                <p className="mt-2">{activeRecord.effectiveDate}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No salary record selected.</p>
        )}
      </Modal>
    </div>
  );
}
