import type { PayrollRecord } from '@/types/payroll';

let payrollMockData: PayrollRecord[] = [
  {
    id: 'PR-1001',
    employeeName: 'Aarav Sharma',
    employeeId: 'EMP-1001',
    department: 'Technology',
    month: 'June 2026',
    grossSalary: 180000,
    totalDeductions: 22500,
    netSalary: 157500,
    grossPay: 180000,
    netPay: 157500,
    payrollStatus: 'Processed',
    paymentStatus: 'Paid',
    processedBy: 'Mina Kapoor',
    processedDate: '2026-06-25',
    basicSalary: 120000,
    hra: 18000,
    specialAllowance: 12000,
    bonus: 6000,
    gratuity: 4000,
    customEarnings: 5000,
    pfEmployee: 5400,
    pfEmployer: 7200,
    esiEmployee: 1800,
    esiEmployer: 2200,
    professionalTax: 2000,
    incomeTax: 4500,
    tds: 1800,
    lopDeduction: 0,
    otherDeductions: 1500,
    grossPay: 180000,
    netPay: 157500,
    workingDays: 24,
    presentDays: 23,
    absentDays: 1,
  },
  {
    id: 'PR-1002',
    employeeName: 'Neha Verma',
    employeeId: 'EMP-1002',
    department: 'Finance',
    month: 'June 2026',
    grossSalary: 155000,
    totalDeductions: 19850,
    netSalary: 135150,
    grossPay: 155000,
    netPay: 135150,
    payrollStatus: 'Approved',
    paymentStatus: 'Scheduled',
    processedBy: 'Raj Mehta',
    processedDate: '2026-06-24',
    basicSalary: 100000,
    hra: 15000,
    specialAllowance: 10000,
    bonus: 5000,
    gratuity: 3000,
    customEarnings: 4000,
    pfEmployee: 4800,
    pfEmployer: 6500,
    esiEmployee: 1600,
    esiEmployer: 1800,
    professionalTax: 1800,
    incomeTax: 4200,
    tds: 1500,
    lopDeduction: 0,
    otherDeductions: 1200,
    grossPay: 155000,
    netPay: 135150,
    workingDays: 24,
    presentDays: 24,
    absentDays: 0,
  },
  {
    id: 'PR-1003',
    employeeName: 'Divya Rao',
    employeeId: 'EMP-1003',
    department: 'HR',
    month: 'June 2026',
    grossSalary: 142000,
    totalDeductions: 18800,
    netSalary: 123200,
    grossPay: 142000,
    netPay: 123200,
    payrollStatus: 'Processing',
    paymentStatus: 'Pending',
    processedBy: 'Sanjay Gupta',
    processedDate: '2026-06-26',
    basicSalary: 95000,
    hra: 14000,
    specialAllowance: 9000,
    bonus: 4500,
    gratuity: 2500,
    customEarnings: 3500,
    pfEmployee: 4200,
    pfEmployer: 5900,
    esiEmployee: 1500,
    esiEmployer: 1700,
    professionalTax: 1600,
    incomeTax: 3900,
    tds: 1200,
    lopDeduction: 800,
    otherDeductions: 1100,
    grossPay: 142000,
    netPay: 123200,
    workingDays: 24,
    presentDays: 22,
    absentDays: 2,
  },
];

const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const getPayrollRecords = async (): Promise<PayrollRecord[]> => {
  await delay(400);
  return [...payrollMockData];
};

export const createPayslip = async (record: PayrollRecord): Promise<PayrollRecord[]> => {
  await delay(500);
  payrollMockData = [record, ...payrollMockData];
  return [...payrollMockData];
};

export const generatePayroll = async (employeeId?: string): Promise<PayrollRecord[]> => {
  await delay(500);
  const result = payrollMockData.map((record) => ({ ...record, payrollStatus: 'Processed' as const, paymentStatus: 'Scheduled' as const }));
  
  if (employeeId) {
    return result.filter((record) => record.employeeId === employeeId);
  }
  
  payrollMockData = result;
  return [...payrollMockData];
};

export const markPayrollPaid = async (id: string, employeeId?: string): Promise<PayrollRecord[]> => {
  await delay(300);
  payrollMockData = payrollMockData.map((record) => 
    record.id === id && (!employeeId || record.employeeId === employeeId)
      ? { ...record, paymentStatus: 'Paid' as const, payrollStatus: 'Paid' as const }
      : record
  );
  return [...payrollMockData];
};
