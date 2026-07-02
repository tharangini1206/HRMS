import { getUserRoleRepository } from "../repositories/rbac.repository";

/**
 * Get Logged In User Role
 */

export const getUserRoleService = async (
  authUserId: string
) => {

  return await getUserRoleRepository(
    authUserId
  );

};