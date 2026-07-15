export const PAYROLL_STATUSES = ['Draft', 'Processing', 'Processed', 'Approved', 'Paid'] as const;
export type PayrollStatus = typeof PAYROLL_STATUSES[number];

export const PAYROLL_PAYMENT_STATUSES = ['Pending', 'Scheduled', 'Paid'] as const;
export type PayrollPaymentStatus = typeof PAYROLL_PAYMENT_STATUSES[number];

export interface SalaryComponentEntry {
  name: string;
  amount: number;
}

export interface StatutoryComponentEntry {
  name: string;
  amount: number;
  category: 'Employee' | 'Employer' | 'Deduction';
}

export interface PayrollRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  designation: string;
  branch: string;
  employmentType: string;
  month: string;
  financialYear: string;
  grossSalary: number;
  grossPay: number;
  totalEarnings: number;
  totalDeductions: number;
  netSalary: number;
  netPay: number;
  payrollStatus: PayrollStatus;
  paymentStatus: PayrollPaymentStatus;
  processedBy: string;
  processedDate: string;
  generatedDate: string;
  salaryComponents: SalaryComponentEntry[];
  statutoryComponents: StatutoryComponentEntry[];
  paymentMode: string;
  transactionId: string;
  bankName: string;
  accountNumber: string;
  panNumber: string;
  uanNumber: string;
  remarks: string;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  bonus: number;
  gratuity: number;
  medicalAllowance: number;
  conveyance: number;
  customEarnings: number;
  pfEmployee: number;
  pfEmployer: number;
  esiEmployee: number;
  esiEmployer: number;
  professionalTax: number;
  incomeTax: number;
  tds: number;
  lopDeduction: number;
  otherDeductions: number;
  insurance: number;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  paidLeave: number;
  lopDays: number;
  attendancePercentage: number;
}

export interface PayrollFilters {
  month: string;
  department: string;
  employee: string;
  status: string;
}

export interface PayrollKpiSummary {
  totalPayroll: number;
  employeesProcessed: number;
  pendingPayroll: number;
  paidPayroll: number;
}

export interface PayrollTrendPoint {
  month: string;
  payroll: number;
  taxes: number;
}

export interface PayrollDistributionPoint {
  name: string;
  value: number;
}
