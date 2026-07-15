import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPayslip, generatePayroll, getPayrollRecords, markPayrollPaid } from '@/features/finance/api/payrollApi';

export function usePayroll() {
  const queryClient = useQueryClient();

  const payrollQuery = useQuery({
    queryKey: ['payroll-records'],
    queryFn: getPayrollRecords,
  });

  const createPayslipMutation = useMutation({
    mutationFn: async (record: Parameters<typeof createPayslip>[0]) => createPayslip(record),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll-records'] });
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (employeeId?: string) => generatePayroll(employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll-records'] });
    },
  });

  const markPaidMutation = useMutation({
    mutationFn: async ({ id, employeeId }: { id: string; employeeId?: string }) => markPayrollPaid(id, employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payroll-records'] });
    },
  });

  return {
    payrollQuery,
    createPayslipMutation,
    generateMutation,
    markPaidMutation,
  };
}
