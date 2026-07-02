import {
  createDepartmentRepository,
  getDepartmentsRepository,
  getDepartmentByIdRepository,
  updateDepartmentRepository,
  deleteDepartmentRepository
} from "../repositories/department.repository";

/**
 * Create Department
 */

export const createDepartmentService = async (
  body: any
) => {

  return await createDepartmentRepository(body);

};

/**
 * Get All Departments
 */

export const getDepartmentsService = async () => {

  return await getDepartmentsRepository();

};

/**
 * Get Department By ID
 */

export const getDepartmentByIdService = async (
  id: string
) => {

  return await getDepartmentByIdRepository(id);

};

/**
 * Update Department
 */

export const updateDepartmentService = async (
  id: string,
  body: any
) => {

  return await updateDepartmentRepository(
    id,
    body
  );

};

/**
 * Delete Department
 */

export const deleteDepartmentService = async (
  id: string
) => {

  return await deleteDepartmentRepository(id);

};