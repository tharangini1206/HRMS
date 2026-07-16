import {

  createPayrollRepository,

  getPayrollsRepository,

  getPayrollByIdRepository,

  updatePayrollRepository,

  deletePayrollRepository

} from "../repositories/payroll.repository";

import { calculateAnnualIncomeTaxService } from "../services/tax.service";

/**
 * Create Employee Salary
 */

export const createPayrollService = async (
  body: any
) => {

  /**
   * Calculate Annual Income Tax
   */

  const annualIncomeTax =
    await calculateAnnualIncomeTaxService(
      body.annual_ctc,
      body.variable_pay_percentage
    );

  body.annual_income_tax =
    annualIncomeTax;

  return await createPayrollRepository(
    body
  );

};

/**
 * Get All Employee Salaries
 */

export const getPayrollsService = async () => {

  return await getPayrollsRepository();

};

/**
 * Get Employee Salary By Id
 */

export const getPayrollByIdService = async (
  id: string
) => {

  return await getPayrollByIdRepository(
    id
  );

};

/**
 * Update Employee Salary
 */

export const updatePayrollService = async (

  id: string,

  body: any

) => {

  /**
   * Calculate Annual Income Tax
   */

  const annualIncomeTax =
    await calculateAnnualIncomeTaxService(
      body.annual_ctc,
      body.variable_pay_percentage
    );

  body.annual_income_tax =
    annualIncomeTax;

  return await updatePayrollRepository(

    id,

    body

  );

};

/**
 * Delete Employee Salary
 */

export const deletePayrollService = async (
  id: string
) => {

  return await deletePayrollRepository(
    id
  );

};