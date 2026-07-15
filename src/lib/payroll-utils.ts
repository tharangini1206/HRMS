/**
 * Payroll utility functions for data formatting and calculations
 */

/**
 * Format currency values to Indian Rupee format
 * @param value - The numerical value to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }
  if (value >= 1000000) {
    return `₹${(value / 1000000).toFixed(1)}L`;
  }
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }
  return `₹${value.toFixed(0)}`;
};

/**
 * Calculate total of numerical values in an array
 * @param arr - Array of numbers
 * @returns Sum of all values
 */
export const calculateTotal = (arr: number[]): number => {
  return arr.reduce((sum, val) => sum + val, 0);
};

/**
 * Calculate percentage of a value from total
 * @param value - The value to calculate percentage for
 * @param total - The total value
 * @returns Percentage value
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Calculate progress percentage
 * @param completed - Number of completed items
 * @param total - Total number of items
 * @returns Progress percentage
 */
export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Calculate net salary (gross - deductions)
 * @param gross - Gross salary
 * @param deductions - Total deductions
 * @returns Net salary
 */
export const calculateNetSalary = (gross: number, deductions: number): number => {
  return Math.max(gross - deductions, 0);
};

/**
 * Filter payroll data by department
 * @param data - Array of payroll data
 * @param department - Department to filter by
 * @returns Filtered data
 */
export const filterByDepartment = (
  data: Array<{ department: string; [key: string]: any }>,
  department: string
): Array<{ department: string; [key: string]: any }> => {
  if (department === 'All Departments') return data;
  return data.filter((item) => item.department === department);
};

/**
 * Calculate payroll statistics
 * @param data - Array of payroll data
 * @returns Statistics object
 */
export const calculatePayrollStats = (
  data: Array<{ grossSalary: number; deductions: number; netSalary: number; status: string }>
) => {
  const totalGross = calculateTotal(data.map((item) => item.grossSalary));
  const totalDeductions = calculateTotal(data.map((item) => item.deductions));
  const totalNet = calculateTotal(data.map((item) => item.netSalary));
  const processed = data.filter((item) => item.status === 'Processed').length;
  const pending = data.filter((item) => item.status === 'Pending').length;

  return {
    totalGross,
    totalDeductions,
    totalNet,
    processed,
    pending,
    total: data.length,
  };
};

/**
 * Group payroll data by department
 * @param data - Array of payroll data with employee count
 * @returns Grouped data by department
 */
export const groupByDepartment = (
  data: Array<{ department: string; value?: number }>
): Array<{ name: string; value: number }> => {
  const grouped = data.reduce((acc, item) => {
    const existing = acc.find((d) => d.name === item.department);
    if (existing) {
      existing.value += item.value || 1;
    } else {
      acc.push({ name: item.department, value: item.value || 1 });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  return grouped;
};

/**
 * Calculate average salary by department
 * @param data - Array of payroll data
 * @returns Array of average salary by department
 */
export const calculateAvgSalaryByDept = (
  data: Array<{ department: string; netSalary: number }>
): Array<{ department: string; avgSalary: number }> => {
  const grouped = data.reduce((acc, item) => {
    const existing = acc.find((d) => d.department === item.department);
    if (existing) {
      existing.salaries.push(item.netSalary);
    } else {
      acc.push({ department: item.department, salaries: [item.netSalary] });
    }
    return acc;
  }, [] as Array<{ department: string; salaries: number[] }>);

  return grouped.map((item) => ({
    department: item.department,
    avgSalary: Math.round(calculateTotal(item.salaries) / item.salaries.length),
  }));
};

/**
 * Format date to readable string
 * @param date - Date object or date string
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
