import {

  createOnboardingRepository,

  getOnboardingsRepository,

  getOnboardingByIdRepository,

  updateOnboardingRepository,

  deleteOnboardingRepository

} from "../repositories/onboarding.repository";

/**
 * Create Employee Onboarding
 */

export const createOnboardingService = async (

  body: any

) => {

  return await createOnboardingRepository(body);

};

/**
 * Get All Employee Onboardings
 */

export const getOnboardingsService = async () => {

  return await getOnboardingsRepository();

};

/**
 * Get Employee Onboarding By Id
 */

export const getOnboardingByIdService = async (

  id: string

) => {

  return await getOnboardingByIdRepository(id);

};

/**
 * Update Employee Onboarding
 */

export const updateOnboardingService = async (

  id: string,

  body: any

) => {

  return await updateOnboardingRepository(

    id,

    body

  );

};

/**
 * Delete Employee Onboarding
 */

export const deleteOnboardingService = async (

  id: string

) => {

  return await deleteOnboardingRepository(id);

};