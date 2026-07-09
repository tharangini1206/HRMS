import {

  getSalaryStatementRepository,

  getSalaryHistoryRepository,

  getMonthlyPayrollSummaryRepository

} from "../repositories/salary-statement.repository";

/**
 * Employee Salary Statement
 */

export const getSalaryStatementService = async (

  userId: string,

  monthYear: string

) => {

  return await getSalaryStatementRepository(

    userId,

    monthYear

  );

};

/**
 * Salary History
 */

export const getSalaryHistoryService = async (

  userId: string

) => {

  return await getSalaryHistoryRepository(

    userId

  );

};

/**
 * Monthly Payroll Summary
 */

export const getMonthlyPayrollSummaryService = async (

  monthYear: string

) => {

  const payrolls =
    await getMonthlyPayrollSummaryRepository(

      monthYear

    );

  const summary = {

    totalEmployees:
      payrolls.length,

    totalGrossPayroll:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.gross_pay ?? 0),

        0

      ),

    totalNetPayroll:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.net_pay ?? 0),

        0

      ),

    totalFixedGross:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.fixed_gross ?? 0),

        0

      ),

    totalBasic:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.basic ?? 0),

        0

      ),

    totalHRA:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.hra ?? 0),

        0

      ),

    totalSpecialAllowance:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.special_allowance ?? 0

          ),

        0

      ),

    totalBonus:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.bonus ?? 0),

        0

      ),

    totalGratuity:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.gratuity ?? 0

          ),

        0

      ),

    totalCustomEarnings:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.custom_earnings ?? 0

          ),

        0

      ),

    totalEarnings:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.total_earnings ?? 0

          ),

        0

      ),

    totalPFEmployee:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.pf_employee ?? 0

          ),

        0

      ),

    totalPFEmployer:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.pf_employer ?? 0

          ),

        0

      ),

    totalProfessionalTax:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.professional_tax ?? 0

          ),

        0

      ),

    totalIncomeTax:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.income_tax ?? 0

          ),

        0

      ),

    totalCustomDeductions:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.custom_deductions ?? 0

          ),

        0

      ),

    totalLOPDeduction:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.lop_deduction ?? 0

          ),

        0

      ),

    totalDeductions:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum +

          Number(

            payroll.total_deductions ?? 0

          ),

        0

      )

  };

  return {

    summary,

    payrolls

  };

};