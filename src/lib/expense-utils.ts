/**
 * Expense management utility functions with dynamic status support
 */

export interface ExpenseData {
  id: string;
  employee: string;
  department: string;
  category: string;
  amount: number;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  receipt: boolean;
  description: string;
}

export interface KPIMetrics {
  totalExpenses: number;
  approved: number;
  pending: number;
  rejected: number;
}

export interface CategoryExpense {
  name: string;
  value: number;
}

export interface DepartmentExpense {
  department: string;
  amount: number;
}

export interface ActivityLog {
  id: number;
  action: string;
  employee: string;
  detail: string;
  time: string;
}

/**
 * Get status badge color based on expense status
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Approved':
      return 'bg-emerald-100 text-emerald-700';
    case 'Pending':
      return 'bg-amber-100 text-amber-700';
    case 'Rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

/**
 * Calculate KPI metrics from expenses data
 */
export const calculateKPIMetrics = (expenses: ExpenseData[]): KPIMetrics => {
  return {
    totalExpenses: expenses.reduce((sum, item) => sum + item.amount, 0),
    approved: expenses.filter((item) => item.status === 'Approved').length,
    pending: expenses.filter((item) => item.status === 'Pending').length,
    rejected: expenses.filter((item) => item.status === 'Rejected').length,
  };
};

/**
 * Filter expenses by multiple criteria
 */
export const filterExpenses = (
  expenses: ExpenseData[],
  filters: {
    search?: string;
    category?: string;
    status?: string;
    department?: string;
    dateRange?: [Date, Date];
  }
): ExpenseData[] => {
  return expenses.filter((exp) => {
    if (filters.search && !exp.employee.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category && filters.category !== 'All Categories' && exp.category !== filters.category) {
      return false;
    }
    if (filters.status && filters.status !== 'All Status' && exp.status !== filters.status) {
      return false;
    }
    if (filters.department && filters.department !== 'All Departments' && exp.department !== filters.department) {
      return false;
    }
    return true;
  });
};

/**
 * Calculate expenses by category with percentages
 */
export const calculateByCategory = (expenses: ExpenseData[]): CategoryExpense[] => {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  if (total === 0) return [];

  const categoryMap = new Map<string, number>();
  expenses.forEach((exp) => {
    categoryMap.set(exp.category, (categoryMap.get(exp.category) || 0) + exp.amount);
  });

  return Array.from(categoryMap.entries())
    .map(([name, amount]) => ({
      name,
      value: Math.round((amount / total) * 100),
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Calculate expenses by department
 */
export const calculateByDepartment = (expenses: ExpenseData[]): DepartmentExpense[] => {
  const departmentMap = new Map<string, number>();
  expenses.forEach((exp) => {
    departmentMap.set(exp.department, (departmentMap.get(exp.department) || 0) + exp.amount);
  });

  return Array.from(departmentMap.entries())
    .map(([department, amount]) => ({ department, amount }))
    .sort((a, b) => b.amount - a.amount);
};

/**
 * Calculate monthly expenses trend
 */
export const calculateMonthlyTrend = (
  expenses: ExpenseData[]
): Array<{ month: string; amount: number }> => {
  const monthMap: { [key: string]: number } = {};

  expenses.forEach((exp) => {
    const date = new Date(exp.date);
    const month = date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });

    monthMap[month] = (monthMap[month] || 0) + exp.amount;
  });

  return Object.entries(monthMap)
    .map(([month, amount]) => ({ month, amount }))
    .sort();
};

/**
 * Calculate approval rate as percentage
 */
export const calculateApprovalRate = (expenses: ExpenseData[]): number => {
  if (expenses.length === 0) return 0;
  const approved = expenses.filter((exp) => exp.status === 'Approved').length;
  return Math.round((approved / expenses.length) * 100);
};

/**
 * Get high value expenses (over threshold)
 */
export const getHighValueExpenses = (expenses: ExpenseData[], threshold: number): ExpenseData[] => {
  return expenses.filter((exp) => exp.amount > threshold).sort((a, b) => b.amount - a.amount);
};

/**
 * Update single expense status
 */
export const updateExpenseStatus = (
  expenses: ExpenseData[],
  expenseId: string,
  newStatus: 'Approved' | 'Pending' | 'Rejected'
): ExpenseData[] => {
  return expenses.map((item) => (item.id === expenseId ? { ...item, status: newStatus } : item));
};

/**
 * Approve multiple expenses
 */
export const approveMultiple = (expenses: ExpenseData[], ids: string[]): ExpenseData[] => {
  return expenses.map((item) => (ids.includes(item.id) ? { ...item, status: 'Approved' } : item));
};

/**
 * Reject multiple expenses
 */
export const rejectMultiple = (expenses: ExpenseData[], ids: string[]): ExpenseData[] => {
  return expenses.map((item) => (ids.includes(item.id) ? { ...item, status: 'Rejected' } : item));
};

/**
 * Delete expense
 */
export const deleteExpense = (expenses: ExpenseData[], expenseId: string): ExpenseData[] => {
  return expenses.filter((item) => item.id !== expenseId);
};

/**
 * Generate comprehensive expense summary
 */
export const generateExpenseSummary = (expenses: ExpenseData[]) => {
  return {
    kpi: calculateKPIMetrics(expenses),
    byCategory: calculateByCategory(expenses),
    byDepartment: calculateByDepartment(expenses),
    monthlyTrend: calculateMonthlyTrend(expenses),
    approvalRate: calculateApprovalRate(expenses),
  };
};

/**
 * Generate recent activity log
 */
export const generateActivityLog = (expenses: ExpenseData[]): ActivityLog[] => {
  return expenses
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map((item, index) => ({
      id: index,
      action: `Status: ${item.status}`,
      employee: item.employee,
      detail: `${item.category} claim ₹${item.amount.toLocaleString()}`,
      time: item.date,
    }));
};

/**
 * Validate expense data
 */
export const validateExpense = (expense: Partial<ExpenseData>): string[] => {
  const errors: string[] = [];

  if (!expense.id || expense.id.trim() === '') errors.push('Expense ID is required');
  if (!expense.employee || expense.employee.trim() === '') errors.push('Employee name is required');
  if (!expense.department || expense.department.trim() === '') errors.push('Department is required');
  if (!expense.category || expense.category.trim() === '') errors.push('Category is required');
  if (!expense.amount || expense.amount <= 0) errors.push('Amount must be greater than 0');
  if (!expense.date) errors.push('Date is required');
  if (!expense.status) errors.push('Status is required');
  if (expense.description && expense.description.trim().length > 500)
    errors.push('Description cannot exceed 500 characters');

  return errors;
};

/**
 * Format expense for display
 */
export const formatExpenseForDisplay = (expense: ExpenseData) => {
  return {
    ...expense,
    formattedAmount: `₹${expense.amount.toLocaleString()}`,
    statusBadge: getStatusColor(expense.status),
  };
};

/**
 * Export expenses to CSV
 */
export const exportToCSV = (expenses: ExpenseData[]): void => {
  const headers = ['Expense ID', 'Employee', 'Department', 'Category', 'Amount', 'Date', 'Status', 'Description'];
  const rows = expenses.map((exp) => [
    exp.id,
    exp.employee,
    exp.department,
    exp.category,
    exp.amount,
    exp.date,
    exp.status,
    exp.description,
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};
