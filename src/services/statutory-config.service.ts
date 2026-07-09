import {

  createStatutoryConfigRepository,

  getStatutoryConfigsRepository,

  getStatutoryConfigByIdRepository,

  updateStatutoryConfigRepository,

  deleteStatutoryConfigRepository,

  getActiveStatutoryConfigsRepository

} from "../repositories/statutory-config.repository";

/**
 * Create Statutory Configuration
 */

export const createStatutoryConfigService = async (
  body: any
) => {

  return await createStatutoryConfigRepository(
    body
  );

};

/**
 * Get All Statutory Configurations
 */

export const getStatutoryConfigsService = async () => {

  return await getStatutoryConfigsRepository();

};

/**
 * Get Statutory Configuration By Id
 */

export const getStatutoryConfigByIdService = async (
  id: string
) => {

  return await getStatutoryConfigByIdRepository(
    id
  );

};

/**
 * Update Statutory Configuration
 */

export const updateStatutoryConfigService = async (
  id: string,
  body: any
) => {

  return await updateStatutoryConfigRepository(
    id,
    body
  );

};

/**
 * Delete Statutory Configuration
 */

export const deleteStatutoryConfigService = async (
  id: string
) => {

  return await deleteStatutoryConfigRepository(
    id
  );

};

/**
 * Get Active Statutory Configurations
 */

export const getActiveStatutoryConfigsService =
async () => {

  return await getActiveStatutoryConfigsRepository();

};