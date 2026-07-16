import {

  createTaxConfigurationRepository,
  getTaxConfigurationsRepository,
  getTaxConfigurationByIdRepository,
  updateTaxConfigurationRepository,
  deleteTaxConfigurationRepository,
  createTaxSlabRepository,
  getTaxSlabsRepository,
  getTaxSlabByIdRepository,
  updateTaxSlabRepository,
  deleteTaxSlabRepository,
  getActiveTaxConfigurationRepository,
  getTaxSlabsByConfigurationRepository

} from "../repositories/tax.repository";

/**
 * ==========================================
 * Create Tax Configuration
 * ==========================================
 */

export const createTaxConfigurationService = async (
  body: any
) => {

  return await createTaxConfigurationRepository(
    body
  );

};

/**
 * ==========================================
 * Get All Tax Configurations
 * ==========================================
 */

export const getTaxConfigurationsService = async () => {

  return await getTaxConfigurationsRepository();

};

/**
 * ==========================================
 * Get Tax Configuration By Id
 * ==========================================
 */

export const getTaxConfigurationByIdService = async (
  id: string
) => {

  const configuration =
    await getTaxConfigurationByIdRepository(
      id
    );

  if (!configuration) {

    throw new Error(
      "Tax configuration not found."
    );

  }

  return configuration;

};

/**
 * ==========================================
 * Update Tax Configuration
 * ==========================================
 */

export const updateTaxConfigurationService = async (
  id: string,
  body: any
) => {

  const configuration =
    await getTaxConfigurationByIdRepository(
      id
    );

  if (!configuration) {

    throw new Error(
      "Tax configuration not found."
    );

  }

  return await updateTaxConfigurationRepository(
    id,
    body
  );

};

/**
 * ==========================================
 * Delete Tax Configuration
 * ==========================================
 */

export const deleteTaxConfigurationService = async (
  id: string
) => {

  const configuration =
    await getTaxConfigurationByIdRepository(
      id
    );

  if (!configuration) {

    throw new Error(
      "Tax configuration not found."
    );

  }

  return await deleteTaxConfigurationRepository(
    id
  );

};

/**
 * ==========================================
 * Create Tax Slab
 * ==========================================
 */

export const createTaxSlabService = async (
  body: any
) => {

  return await createTaxSlabRepository(
    body
  );

};

/**
 * ==========================================
 * Get All Tax Slabs
 * ==========================================
 */

export const getTaxSlabsService = async () => {

  return await getTaxSlabsRepository();

};

/**
 * ==========================================
 * Get Tax Slab By Id
 * ==========================================
 */

export const getTaxSlabByIdService = async (
  id: string
) => {

  const slab =
    await getTaxSlabByIdRepository(
      id
    );

  if (!slab) {

    throw new Error(
      "Tax slab not found."
    );

  }

  return slab;

};

/**
 * ==========================================
 * Update Tax Slab
 * ==========================================
 */

export const updateTaxSlabService = async (
  id: string,
  body: any
) => {

  const slab =
    await getTaxSlabByIdRepository(
      id
    );

  if (!slab) {

    throw new Error(
      "Tax slab not found."
    );

  }

  return await updateTaxSlabRepository(
    id,
    body
  );

};

/**
 * ==========================================
 * Delete Tax Slab
 * ==========================================
 */

export const deleteTaxSlabService = async (
  id: string
) => {

  const slab =
    await getTaxSlabByIdRepository(
      id
    );

  if (!slab) {

    throw new Error(
      "Tax slab not found."
    );

  }

  return await deleteTaxSlabRepository(
    id
  );

};



/**
 * ==========================================
 * Calculate Annual Income Tax
 * ==========================================
 */

export const calculateAnnualIncomeTaxService = async (

  annualCtc: number,

  variablePayPercentage: number,

  financialYear: string = "2026-2027",

  taxRegime: string = "new"

) => {

  /**
   * Variable Pay
   */

  const variablePay =

    annualCtc *

    (variablePayPercentage / 100);

  /**
   * Fixed Gross Annual
   */

  const fixedGrossAnnual =

    annualCtc -

    variablePay;

  /**
   * Tax Configuration
   */

  const configuration =

    await getActiveTaxConfigurationRepository(

      financialYear,

      taxRegime

    );

  if (!configuration) {

    throw new Error(
      "Active Tax Configuration not found."
    );

  }

  /**
   * Tax Slabs
   */

  const slabs =
  await getTaxSlabsByConfigurationRepository(
    configuration.id
  );

  /**
   * Taxable Income
   */

  let taxableIncome =

    fixedGrossAnnual -

    Number(
      configuration.standard_deduction
    );

  if (taxableIncome < 0) {

    taxableIncome = 0;

  }

  /**
   * Annual Tax
   */

  let annualTax = 0;

  for (const slab of slabs) {

    const from =
      Number(slab.from_amount);

    const to =
      slab.to_amount == null

        ? taxableIncome

        : Number(slab.to_amount);

    if (taxableIncome <= from) {

      continue;

    }

    const taxableAmount =

      Math.min(
        taxableIncome,
        to
      ) - from;

    annualTax +=

      taxableAmount *

      (Number(slab.tax_percentage) / 100);

  }

  /**
   * Rebate 87A
   */

  if (

    taxableIncome <=

    Number(
      configuration.rebate_87a_limit
    )

  ) {

    annualTax -= Math.min(

      annualTax,

      Number(
        configuration.rebate_87a_amount
      )

    );

  }

  /**
   * 4% Cess
   */

  annualTax +=

    annualTax *

    (

      Number(
        configuration.cess_percentage
      ) / 100

    );

  return Math.round(
    annualTax
  );

};