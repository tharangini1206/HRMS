import {
  createDesignationRepository,
  getDesignationsRepository,
  getDesignationByIdRepository,
  updateDesignationRepository,
  deleteDesignationRepository
} from "../repositories/designation.repository";

/**
 * Create Designation
 */

export const createDesignationService = async (
  body: any
) => {

  return await createDesignationRepository(body);

};

/**
 * Get All Designations
 */

export const getDesignationsService = async () => {

  return await getDesignationsRepository();

};

/**
 * Get Designation By ID
 */

export const getDesignationByIdService = async (
  id: string
) => {

  return await getDesignationByIdRepository(id);

};

/**
 * Update Designation
 */

export const updateDesignationService = async (
  id: string,
  body: any
) => {

  return await updateDesignationRepository(
    id,
    body
  );

};

/**
 * Delete Designation
 */

export const deleteDesignationService = async (
  id: string
) => {

  return await deleteDesignationRepository(id);

};