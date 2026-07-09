import {

  createPayrollRepository,

  getPayrollsRepository,

  getPayrollByIdRepository,

  updatePayrollRepository,

  deletePayrollRepository

} from "../repositories/payroll.repository";

/**
 * Create Employee Salary
 */

export const createPayrollService = async (
  body: any
) => {

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