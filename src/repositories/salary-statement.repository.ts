import { supabase } from "../config/supabase";

/**
 * Get Employee Salary Statement
 */

export const getSalaryStatementRepository = async (

  userId: string,

  monthYear: string

) => {

  /**
   * Employee
   */

  const { data: employee, error: employeeError } =
    await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", userId)
      .single();

  if (employeeError) {

    throw new Error(employeeError.message);

  }

  /**
   * Employee Salary Structure
   */

  const { data: salary, error: salaryError } =
    await supabase
      .from("employee_salary")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true)
      .single();

  if (salaryError) {

    throw new Error(salaryError.message);

  }

  /**
   * Payroll
   */

  const { data: payroll, error: payrollError } =
    await supabase
      .from("payroll")
      .select("*")
      .eq("user_id", userId)
      .eq("month_year", monthYear)
      .single();

  if (payrollError) {

    throw new Error(payrollError.message);

  }

  /**
   * Custom Components
   */

  const {

    data: salaryComponents,

    error: componentError

  } =
    await supabase
      .from("salary_components")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true)
      .lte("effective_date", monthYear);

  if (componentError) {

    throw new Error(componentError.message);

  }

  return {

    employee,

    salary,

    salaryComponents,

    payroll

  };

};

/**
 * Get Salary History
 */

export const getSalaryHistoryRepository = async (

  userId: string

) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select(`

        public_id,

        month_year,

        gross_pay,

        total_earnings,

        total_deductions,

        net_pay,

        basic,

        hra,

        special_allowance,

        bonus,

        gratuity,

        custom_earnings,

        custom_deductions,

        pf_employee,

        pf_employer,

        professional_tax,

        income_tax,

        lop_deduction,

        status,

        is_paid,

        paid_at

      `)
      .eq("user_id", userId)
      .order("month_year", {

        ascending: false

      });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Monthly Payroll Summary
 */

export const getMonthlyPayrollSummaryRepository = async (

  monthYear: string

) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select("*")
      .eq("month_year", monthYear);

  if (error) {

    throw new Error(error.message);

  }

  return data;

};