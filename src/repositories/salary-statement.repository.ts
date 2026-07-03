import { supabase } from "../config/supabase";

/**
 * Get Employee Salary Statement
 */

export const getSalaryStatementRepository = async (

  userId: string,

  monthYear: string

) => {

  /**
   * Get Payroll
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
   * Get Employee
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

  return {

    employee,

    payroll

  };

};

/**
 * Get Employee Salary History
 */

export const getSalaryHistoryRepository = async (

  userId: string

) => {

  const { data, error } =
    await supabase
      .from("payroll")
      .select("*")
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