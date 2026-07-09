import {
  createEmployeeRepository,
  getEmployeesRepository,
  getEmployeeByIdRepository,
  updateEmployeeRepository,
  deleteEmployeeRepository
} from "../repositories/employee.repository";

/**
 * Create Employee
 */
export const createEmployeeService = async (
  body: any
) => {

  return await createEmployeeRepository(body);

};

/**
 * Get All Employees
 */
export const getEmployeesService = async () => {

  return await getEmployeesRepository();

};

/**
 * Get Employee By Id
 */
export const getEmployeeByIdService = async (
  id: string
) => {

  return await getEmployeeByIdRepository(id);

};

/**
 * Update Employee
 */
export const updateEmployeeService = async (
  id: string,
  body: any
) => {

  return await updateEmployeeRepository(
    id,
    body
  );

};

/**
 * Delete Employee
 */
export const deleteEmployeeService = async (
  id: string
) => {

  return await deleteEmployeeRepository(id);

};