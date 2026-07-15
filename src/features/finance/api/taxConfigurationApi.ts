import type { TaxConfiguration, TaxConfigurationFormData } from '@/types/tax';

const taxConfigurationMockData: TaxConfiguration = {
  id: 'TC-001',
  financialYear: '2026-27',
  taxRegime: 'New Regime',
  standardDeduction: 50000,
  rebateLimit: 700000,
  rebateAmount: 25000,
  cessPercentage: 4,
  effectiveDate: '2026-04-01',
  status: 'Active',
};

const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const getTaxConfiguration = async (): Promise<TaxConfiguration> => {
  await delay(400);
  return taxConfigurationMockData;
};

export const updateTaxConfiguration = async (payload: TaxConfigurationFormData): Promise<TaxConfiguration> => {
  await delay(350);
  return {
    id: taxConfigurationMockData.id,
    ...payload,
  };
};
