import {
  createRoleRepository,
  getRolesRepository,
  getRoleByIdRepository,
  updateRoleRepository,
  deleteRoleRepository
} from "../repositories/role.repository";

/**
 * Create Role
 */

export const createRoleService = async (
  body: any
) => {

  return await createRoleRepository(body);

};

/**
 * Get All Roles
 */

export const getRolesService = async () => {

  return await getRolesRepository();

};

/**
 * Get Role By Id
 */

export const getRoleByIdService = async (
  id: string
) => {

  return await getRoleByIdRepository(id);

};

/**
 * Update Role
 */

export const updateRoleService = async (
  id: string,
  body: any
) => {

  return await updateRoleRepository(
    id,
    body
  );

};

/**
 * Delete Role
 */

export const deleteRoleService = async (
  id: string
) => {

  return await deleteRoleRepository(id);

};