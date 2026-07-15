export const EMPLOYEE_SALARY_STATUSES = ['Active', 'Inactive', 'Processed'] as const;
export type EmployeeSalaryStatus = typeof EMPLOYEE_SALARY_STATUSES[number];

export const EXPENSE_STATUSES = ['Approved', 'Pending', 'Rejected'] as const;
export type ExpenseStatus = typeof EXPENSE_STATUSES[number];

export const INVOICE_STATUSES = ['Paid', 'Pending', 'Overdue'] as const;
export type InvoiceStatus = typeof INVOICE_STATUSES[number];

export const REIMBURSEMENT_STATUSES = ['Approved', 'Pending'] as const;
export type ReimbursementStatus = typeof REIMBURSEMENT_STATUSES[number];

export const REPORT_STATUSES = ['Generated', 'Pending'] as const;
export type ReportStatus = typeof REPORT_STATUSES[number];

export const FINANCE_SALARY_OVERVIEW_STATUSES = ['Processed', 'Pending', 'Failed'] as const;
export type FinanceSalaryOverviewStatus = typeof FINANCE_SALARY_OVERVIEW_STATUSES[number];

export const SALARY_PROCESSING_STATUSES = ['Ready', 'Pending'] as const;
export type SalaryProcessingStatus = typeof SALARY_PROCESSING_STATUSES[number];

export const SALARY_COMPONENT_STATUSES = ['Active', 'Inactive'] as const;
export type SalaryComponentStatus = typeof SALARY_COMPONENT_STATUSES[number];

export const SALARY_STATEMENT_STATUSES = ['Available', 'Processing', 'Unavailable'] as const;
export type SalaryStatementStatus = typeof SALARY_STATEMENT_STATUSES[number];

export const SALARY_STATEMENT_FILTER_STATUSES = ['All', ...SALARY_STATEMENT_STATUSES] as const;
export type SalaryStatementFilterStatus = typeof SALARY_STATEMENT_FILTER_STATUSES[number];
