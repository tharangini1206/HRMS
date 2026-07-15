'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SalarySummaryCards } from '@/components/finance/salary-statements/SalarySummaryCards';
import { SalaryFilters } from '@/components/finance/salary-statements/SalaryFilters';
import { SalaryStatementCard } from '@/components/finance/salary-statements/SalaryStatementCard';
import { SalaryPreviewModal } from '@/components/finance/salary-statements/SalaryPreviewModal';
import { EmptyState } from '@/components/finance/salary-statements/EmptyState';

import type { SalaryStatementStatus, SalaryStatementFilterStatus } from '@/types/finance';
import { SALARY_STATEMENT_STATUSES, SALARY_STATEMENT_FILTER_STATUSES } from '@/types/finance';

interface SalaryStatement {
  id: number;
  month: string;
  year: number;
  grossSalary: number;
  netSalary: number;
  paymentDate: string;
  employeeId: string;
  employeeName: string;
  status: SalaryStatementStatus;
  allowances: Array<{ name: string; amount: number }>;
  deductions: Array<{ name: string; amount: number }>;
}

const [AVAILABLE_STATUS, PROCESSING_STATUS, UNAVAILABLE_STATUS] = SALARY_STATEMENT_STATUSES;

const salaryStatementsData: SalaryStatement[] = [
  {
    id: 1,
    month: 'June 2026',
    year: 2026,
    grossSalary: 60000,
    netSalary: 52400,
    paymentDate: '30 Jun 2026',
    employeeId: 'EMP-1001',
    employeeName: 'John Doe',
    status: AVAILABLE_STATUS,
    allowances: [
      { name: 'Basic Salary', amount: 35000 },
      { name: 'HRA', amount: 10500 },
      { name: 'Dearness Allowance', amount: 7000 },
      { name: 'Travel Allowance', amount: 3000 },
      { name: 'Medical Allowance', amount: 2000 },
      { name: 'Other Allowance', amount: 2500 },
    ],
    deductions: [
      { name: 'Professional Tax', amount: 200 },
      { name: 'Employee PF', amount: 1800 },
      { name: 'Income Tax', amount: 3200 },
      { name: 'Health Insurance', amount: 900 },
    ],
  },
  {
    id: 2,
    month: 'May 2026',
    year: 2026,
    grossSalary: 58000,
    netSalary: 50500,
    paymentDate: '31 May 2026',
    employeeId: 'EMP-1001',
    employeeName: 'John Doe',
    status: AVAILABLE_STATUS,
    allowances: [
      { name: 'Basic Salary', amount: 35000 },
      { name: 'HRA', amount: 10500 },
      { name: 'Dearness Allowance', amount: 6500 },
      { name: 'Travel Allowance', amount: 3000 },
      { name: 'Medical Allowance', amount: 2000 },
      { name: 'Other Allowance', amount: 1000 },
    ],
    deductions: [
      { name: 'Professional Tax', amount: 200 },
      { name: 'Employee PF', amount: 1800 },
      { name: 'Income Tax', amount: 3000 },
      { name: 'Health Insurance', amount: 900 },
    ],
  },
  {
    id: 3,
    month: 'April 2026',
    year: 2026,
    grossSalary: 60000,
    netSalary: 52000,
    paymentDate: '30 Apr 2026',
    employeeId: 'EMP-1001',
    employeeName: 'John Doe',
    status: PROCESSING_STATUS,
    allowances: [
      { name: 'Basic Salary', amount: 35000 },
      { name: 'HRA', amount: 10500 },
      { name: 'Dearness Allowance', amount: 7000 },
      { name: 'Travel Allowance', amount: 3000 },
      { name: 'Medical Allowance', amount: 2000 },
      { name: 'Other Allowance', amount: 2500 },
    ],
    deductions: [
      { name: 'Professional Tax', amount: 200 },
      { name: 'Employee PF', amount: 1800 },
      { name: 'Income Tax', amount: 3200 },
      { name: 'Health Insurance', amount: 900 },
    ],
  },
  {
    id: 4,
    month: 'March 2026',
    year: 2026,
    grossSalary: 60000,
    netSalary: 52400,
    paymentDate: '31 Mar 2026',
    employeeId: 'EMP-1001',
    employeeName: 'John Doe',
    status: UNAVAILABLE_STATUS,
    allowances: [],
    deductions: [],
  },
];

export default function SalaryStatementsPage() {
  const [searchMonth, setSearchMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<SalaryStatementFilterStatus>('All');
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState<SalaryStatement | null>(null);

  // Filter statements
  const filteredStatements = useMemo(() => {
    return salaryStatementsData.filter((statement) => {
      const matchMonth = searchMonth === '' || statement.month.toLowerCase().includes(searchMonth.toLowerCase());
      const matchYear = selectedYear === '' || statement.year.toString() === selectedYear;
      const matchStatus = selectedStatus === 'All' || statement.status === selectedStatus;

      return matchMonth && matchYear && matchStatus;
    });
  }, [searchMonth, selectedYear, selectedStatus]);

  const handleResetFilters = () => {
    setSearchMonth('');
    setSelectedYear('');
    setSelectedStatus('All');
  };

  const handlePreview = (id: number) => {
    const statement = salaryStatementsData.find((s) => s.id === id);
    if (statement) {
      setSelectedStatement(statement);
      setPreviewModalOpen(true);
    }
  };

  const handleDownload = (id: number) => {
    const statement = salaryStatementsData.find((s) => s.id === id);
    if (statement) {
      // Keep existing download functionality
      console.log(`Downloading salary statement for ${statement.month}`);
      // Call your existing download API/function here
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Payslip Library</p>
          <h1 className="text-4xl font-bold text-slate-950">Salary Statements</h1>
          <p className="mt-2 text-sm text-slate-600">
            View, preview and download employee salary statements.
          </p>
        </div>
        <Link
          href="/finance"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Back to Finance Overview
        </Link>
      </div>

      {/* Summary Cards */}
      <SalarySummaryCards />

      {/* Filters */}
      <SalaryFilters
        searchMonth={searchMonth}
        selectedYear={selectedYear}
        selectedStatus={selectedStatus}
        onSearchChange={setSearchMonth}
        onYearChange={setSelectedYear}
        onStatusChange={setSelectedStatus}
        onResetFilters={handleResetFilters}
      />

      {/* Salary Statements */}
      {filteredStatements.length > 0 ? (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {filteredStatements.map((statement) => (
            <SalaryStatementCard
              key={statement.id}
              id={statement.id}
              month={statement.month}
              grossSalary={statement.grossSalary}
              netSalary={statement.netSalary}
              paymentDate={statement.paymentDate}
              employeeId={statement.employeeId}
              status={statement.status}
              onPreview={handlePreview}
              onDownload={handleDownload}
            />
          ))}
        </section>
      ) : (
        <EmptyState onResetFilters={handleResetFilters} />
      )}

      {/* Preview Modal */}
      {selectedStatement && (
        <SalaryPreviewModal
          isOpen={previewModalOpen}
          month={selectedStatement.month}
          employeeId={selectedStatement.employeeId}
          employeeName={selectedStatement.employeeName}
          grossSalary={selectedStatement.grossSalary}
          netSalary={selectedStatement.netSalary}
          allowances={selectedStatement.allowances}
          deductions={selectedStatement.deductions}
          onClose={() => setPreviewModalOpen(false)}
          onDownload={() => handleDownload(selectedStatement.id)}
        />
      )}
    </div>
  );
}
