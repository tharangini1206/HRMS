import { supabase } from "../config/supabase";

/**
 * Create Employee Salary
 */

export const createPayrollRepository = async (
  body: any
) => {

  const { data, error } =
    await supabase
      .from("employee_salary")
      .insert([
        {

          user_id:
            body.user_id,

          annual_ctc:
            body.annual_ctc,

          variable_pay_percentage:
            body.variable_pay_percentage ?? 0,

          annual_income_tax:
            body.annual_income_tax,

          effective_date:
            body.effective_date

        }
      ])
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get All Employee Salaries
 */

export const getPayrollsRepository = async () => {

  const { data, error } =
    await supabase
      .from("employee_salary")
      .select("*")
      .order("created_at", {

        ascending: false

      });

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get Employee Salary By Id
 */

export const getPayrollByIdRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("employee_salary")
      .select("*")
      .eq("public_id", id)
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Update Employee Salary
 */

export const updatePayrollRepository = async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("employee_salary")
      .update({

        annual_ctc:
          body.annual_ctc,

        variable_pay_percentage:
          body.variable_pay_percentage,

        annual_income_tax:
          body.annual_income_tax,

        effective_date:
          body.effective_date,

        is_active:
          body.is_active,

        updated_at:
          new Date().toISOString()

      })
      .eq("public_id", id)
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Delete Employee Salary
 */

export const deletePayrollRepository = async (
  id: string
) => {

  const { data, error } =
    await supabase
      .from("employee_salary")
      .delete()
      .eq("public_id", id)
      .select()
      .single();

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

