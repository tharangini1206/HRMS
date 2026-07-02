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

          user_id: body.user_id,

          annual_ctc: body.annual_ctc,

          basic_percentage:
            body.basic_percentage,

          hra_percentage:
            body.hra_percentage,

          special_allowance:
            body.special_allowance,

          conveyance:
            body.conveyance,

          medical:
            body.medical,

          pf_employee_percentage:
            body.pf_employee_percentage,

          pf_employer_percentage:
            body.pf_employer_percentage,

          esi_employee_percentage:
            body.esi_employee_percentage,

          esi_employer_percentage:
            body.esi_employer_percentage,

          professional_tax_monthly:
            body.professional_tax_monthly,

          gratuity_percentage:
            body.gratuity_percentage,

          bonus_percentage:
            body.bonus_percentage,

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

export const getPayrollsRepository =
async () => {

  const { data, error } =
    await supabase
      .from("employee_salary")
      .select("*");

  if (error) {

    throw new Error(error.message);

  }

  return data;

};

/**
 * Get Employee Salary By Id
 */

export const getPayrollByIdRepository =
async (
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

export const updatePayrollRepository =
async (
  id: string,
  body: any
) => {

  const { data, error } =
    await supabase
      .from("employee_salary")
      .update({

        ...body,

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

export const deletePayrollRepository =
async (
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