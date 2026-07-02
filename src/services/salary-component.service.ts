import {

  createSalaryComponentRepository,

  getSalaryComponentsRepository,

  getSalaryComponentByIdRepository,

  updateSalaryComponentRepository,

  deleteSalaryComponentRepository,

  getSalaryComponentsByUserRepository


} from "../repositories/salary-component.repository";

/**
 * Create Salary Component
 */

export const createSalaryComponentService = async (
  body: any
) => {

  return await createSalaryComponentRepository(body);

};

/**
 * Get All Salary Components
 */

export const getSalaryComponentsService = async () => {

  return await getSalaryComponentsRepository();

};

/**
 * Get Salary Component By Id
 */

export const getSalaryComponentByIdService = async (
  id: string
) => {

  return await getSalaryComponentByIdRepository(id);

};

/**
 * Update Salary Component
 */

export const updateSalaryComponentService = async (
  id: string,
  body: any
) => {

  return await updateSalaryComponentRepository(
    id,
    body
  );

};

/**
 * Delete Salary Component
 */

export const deleteSalaryComponentService = async (
  id: string
) => {

  return await deleteSalaryComponentRepository(id);

};

/**
 * Get Salary Components By User Id
 */

export const getSalaryComponentsByUserService =
async (
  userId: string
) => {

  return await getSalaryComponentsByUserRepository(
    userId
  );

};