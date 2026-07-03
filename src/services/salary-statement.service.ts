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

    grossPayroll:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.gross_pay),

        0

      ),

    totalEarnings:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.total_earnings),

        0

      ),

    totalDeductions:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.total_deductions),

        0

      ),

    totalNetPay:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.net_pay),

        0

      ),

    totalPFEmployee:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.pf_employee),

        0

      ),

    totalPFEmployer:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.pf_employer),

        0

      ),

    totalESIEmployee:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.esi_employee),

        0

      ),

    totalESIEmployer:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.esi_employer),

        0

      ),

    totalProfessionalTax:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.professional_tax),

        0

      ),

    totalLOP:
      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.lop_deduction),

        0

      )

  };

  return {

    summary,

    payrolls

  };

};