import {

  getMonthlyPayrollReportRepository,

  getDepartmentPayrollReportRepository,

  getSalaryPaidReportRepository,

  getTaxReportRepository,

  getPayrollStatusReportRepository,

  getLopReportRepository,

  getPayrollDashboardReportRepository,

  getYearlyPayrollReportRepository

} from "../repositories/payroll-report.repository";

/**
 * Monthly Payroll Report
 */

export const getMonthlyPayrollReportService = async (

  monthYear: string

) => {

  const payrolls =
    await getMonthlyPayrollReportRepository(

      monthYear

    );

  return {

    month_year:
      monthYear,

    total_employees:
      payrolls.length,

    total_gross_salary:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.gross_pay),

        0

      ),

    total_net_salary:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.net_pay),

        0

      ),

    total_earnings:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.total_earnings),

        0

      ),

    total_deductions:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.total_deductions),

        0

      ),

    total_pf_employee:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.pf_employee),

        0

      ),

    total_pf_employer:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.pf_employer),

        0

      ),

    total_professional_tax:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.professional_tax),

        0

      ),

    total_income_tax:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.income_tax),

        0

      ),

    total_tds:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.tds_deduction),

        0

      ),

    total_lop:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.lop_deduction),

        0

      )

  };

};

/**
 * Department Wise Payroll Report
 */

export const getDepartmentPayrollReportService = async (

  monthYear: string

) => {

  return await getDepartmentPayrollReportRepository(

    monthYear

  );

};

/**
 * Salary Paid Report
 */

export const getSalaryPaidReportService = async (
  monthYear: string
) => {

  return await getSalaryPaidReportRepository(
    monthYear
  );

};

/**
 * Tax Report
 */

export const getTaxReportService = async (

  monthYear: string

) => {

  const payrolls =
    await getTaxReportRepository(

      monthYear

    );

  return {

    month_year:
      monthYear,

    total_income_tax:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.income_tax),

        0

      ),

    total_tds:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.tds_deduction),

        0

      ),

    total_pf_employee:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.pf_employee),

        0

      ),

    total_pf_employer:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.pf_employer),

        0

      ),

    total_professional_tax:

      payrolls.reduce(

        (sum: number, payroll: any) =>

          sum + Number(payroll.professional_tax),

        0

      )

  };

};

/**
 * Payroll Status Report
 */

export const getPayrollStatusReportService = async (
  monthYear: string
) => {

  const payrolls =
    await getPayrollStatusReportRepository(
      monthYear
    );

  return {

    month_year: monthYear,

    processed:
      payrolls.filter(
        (p: any) => p.status === "processed"
      ).length,

    approved:
      payrolls.filter(
        (p: any) => p.status === "approved"
      ).length,

    paid:
      payrolls.filter(
        (p: any) => p.status === "paid"
      ).length,

    rejected:
      payrolls.filter(
        (p: any) => p.status === "rejected"
      ).length,

    total_payrolls:
      payrolls.length

  };

};

/**
 * LOP Report
 */

export const getLopReportService = async (
  monthYear: string
) => {

  return await getLopReportRepository(
    monthYear
  );

};

/**
 * Payroll Dashboard Report
 */

export const getPayrollDashboardReportService = async (
  monthYear: string
) => {

  const payrolls =
    await getPayrollDashboardReportRepository(
      monthYear
    );

  return {

    month_year: monthYear,

    total_employees:
      payrolls.length,

    processed:
      payrolls.filter(
        (p: any) => p.status === "processed"
      ).length,

    approved:
      payrolls.filter(
        (p: any) => p.status === "approved"
      ).length,

    paid:
      payrolls.filter(
        (p: any) => p.status === "paid"
      ).length,

    rejected:
      payrolls.filter(
        (p: any) => p.status === "rejected"
      ).length,

    total_gross_salary: Number(
      payrolls
        .reduce(
          (sum: number, p: any) => sum + Number(p.gross_pay),
          0
        )
        .toFixed(2)
    ),

    total_net_salary: Number(
      payrolls
        .reduce(
          (sum: number, p: any) => sum + Number(p.net_pay),
          0
        )
        .toFixed(2)
    ),

    total_deductions: Number(
      payrolls
        .reduce(
          (sum: number, p: any) => sum + Number(p.total_deductions),
          0
        )
        .toFixed(2)
    )

  };

};

/**
 * Yearly Payroll Report
 */

export const getYearlyPayrollReportService = async (
  year: string
) => {

  const payrolls =
    await getYearlyPayrollReportRepository(
      year
    );

  return {

    year,

    total_payrolls:
      payrolls.length,

    total_gross_salary:
      Number(

        payrolls.reduce(

          (sum: number, payroll: any) =>

            sum + Number(payroll.gross_pay),

          0

        ).toFixed(2)

      ),

    total_net_salary:
      Number(

        payrolls.reduce(

          (sum: number, payroll: any) =>

            sum + Number(payroll.net_pay),

          0

        ).toFixed(2)

      ),

    total_earnings:
      Number(

        payrolls.reduce(

          (sum: number, payroll: any) =>

            sum + Number(payroll.total_earnings),

          0

        ).toFixed(2)

      ),

    total_deductions:
      Number(

        payrolls.reduce(

          (sum: number, payroll: any) =>

            sum + Number(payroll.total_deductions),

          0

        ).toFixed(2)

      )

  };

};