import type { TaxSlab, TaxSlabFormData } from '@/types/tax';

const taxSlabMockData: TaxSlab[] = [
  { id: 'TS-001', slabOrder: 1, fromAmount: 0, toAmount: 300000, taxPercentage: 0, status: 'Active' },
  { id: 'TS-002', slabOrder: 2, fromAmount: 300001, toAmount: 600000, taxPercentage: 5, status: 'Active' },
  { id: 'TS-003', slabOrder: 3, fromAmount: 600001, toAmount: 1200000, taxPercentage: 10, status: 'Active' },
  { id: 'TS-004', slabOrder: 4, fromAmount: 1200001, toAmount: 1800000, taxPercentage: 20, status: 'Inactive' },
];

const delay = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const getTaxSlabs = async (): Promise<TaxSlab[]> => {
  await delay(400);
  return taxSlabMockData;
};

export const createTaxSlab = async (payload: TaxSlabFormData): Promise<TaxSlab> => {
  await delay(350);
  return {
    id: `TS-${Date.now()}`,
    ...payload,
  };
};

export const updateTaxSlab = async (id: string, payload: TaxSlabFormData): Promise<TaxSlab> => {
  await delay(350);
  return {
    id,
    ...payload,
  };
};

export const deleteTaxSlab = async (id: string): Promise<string> => {
  await delay(250);
  return id;
};
