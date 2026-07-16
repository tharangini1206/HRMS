import { supabase } from "../config/supabase";

/**
 * Monthly Payroll Report
 */

export const getMonthlyPayrollReportRepository = async (
  monthYear: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select(`
        gross_pay,
        net_pay,
        total_earnings,
        total_deductions,
        pf_employee,
        pf_employer,
        professional_tax,
        income_tax,
        tds_deduction,
        lop_deduction
      `)
      .eq("month_year", monthYear)
      .eq("status", "paid");

  if (error) {

    throw new Error(error.message);

  }

  return data;

};



/**
 * Department Wise Payroll Report
 */

export const getDepartmentPayrollReportRepository = async (
  monthYear: string
) => {

  /**
   * Payroll
   */

  const { data: payrolls, error: payrollError } =
    await supabase
      .from("payroll")
      .select("*")
      .eq("month_year", monthYear);

  if (payrollError) {

    throw new Error(payrollError.message);

  }

  /**
   * Employee Profiles
   */

  const { data: profiles, error: profileError } =
    await supabase
      .from("employee_profiles")
      .select(`
        user_id,
        departments(
          id,
          name
        )
      `);

  if (profileError) {

    throw new Error(profileError.message);

  }

  /**
   * Map Department
   */

  const profileMap = new Map();

  profiles.forEach((profile: any) => {

    profileMap.set(
      profile.user_id,
      profile.departments?.name ?? "No Department"
    );

  });

  /**
   * Report
   */

  const report: any = {};

  payrolls.forEach((payroll: any) => {

    const department =
      profileMap.get(payroll.user_id) ?? "No Department";

    if (!report[department]) {

      report[department] = {

        department,

        total_employees: 0,

        total_gross_salary: 0,

        total_net_salary: 0,

        total_deductions: 0

      };

    }

    report[department].total_employees += 1;

    report[department].total_gross_salary +=
      Number(payroll.gross_pay);

    report[department].total_net_salary +=
      Number(payroll.net_pay);

    report[department].total_deductions +=
      Number(payroll.total_deductions);

  });

  return Object.values(report);

};

/**
 * Salary Paid Report
 */

export const getSalaryPaidReportRepository = async (
  monthYear: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select(`
        gross_pay,
        net_pay,
        total_deductions
      `)
      .eq("month_year", monthYear)
      .eq("status", "paid");

  if (error) {

    throw new Error(error.message);

  }

  let employeesPaid = 0;

  let totalGrossSalary = 0;

  let totalNetSalaryPaid = 0;

  let totalDeductions = 0;

  data.forEach((payroll: any) => {

    employeesPaid++;

    totalGrossSalary +=
      Number(payroll.gross_pay);

    totalNetSalaryPaid +=
      Number(payroll.net_pay);

    totalDeductions +=
      Number(payroll.total_deductions);

  });

  return {

    month_year: monthYear,

    employees_paid: employeesPaid,

    total_gross_salary:
      Number(totalGrossSalary.toFixed(2)),

    total_net_salary_paid:
      Number(totalNetSalaryPaid.toFixed(2)),

    total_deductions:
      Number(totalDeductions.toFixed(2)),

    total_payment_processed:
      Number(totalNetSalaryPaid.toFixed(2))

  };

};

/**
 * Tax Report
 */

export const getTaxReportRepository = async (
  monthYear: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select(`
        income_tax,
        tds_deduction,
        pf_employee,
        pf_employer,
        professional_tax
      `)
      .eq("month_year", monthYear)
      .eq("status", "paid");

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Payroll Status Report
 */

export const getPayrollStatusReportRepository = async (
  monthYear: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select("status")
      .eq("month_year", monthYear);

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * LOP Report
 */

export const getLopReportRepository = async (
  monthYear: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select(`
        user_id,
        lop_days,
        lop_deduction,
        gross_pay,
        net_pay
      `)
      .eq("month_year", monthYear)
      .gt("lop_days", 0);

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Payroll Dashboard Report
 */

export const getPayrollDashboardReportRepository = async (
  monthYear: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select(`
        gross_pay,
        net_pay,
        total_deductions,
        status
      `)
      .eq("month_year", monthYear);

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Yearly Payroll Report
 */

export const getYearlyPayrollReportRepository = async (
  year: string
) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select(`
        month_year,
        gross_pay,
        net_pay,
        total_deductions,
        total_earnings
      `)
      .gte("month_year", `${year}-01-01`)
      .lte("month_year", `${year}-12-31`)
      .eq("status", "paid")
      .order("month_year", {

        ascending: true

      });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};