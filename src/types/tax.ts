export type TaxRegime = 'Old Regime' | 'New Regime';

export type TaxStatus = 'Active' | 'Inactive';

export interface TaxConfiguration {
  id: string;
  financialYear: string;
  taxRegime: TaxRegime;
  standardDeduction: number;
  rebateLimit: number;
  rebateAmount: number;
  cessPercentage: number;
  effectiveDate: string;
  status: TaxStatus;
}

export interface TaxSlab {
  id: string;
  slabOrder: number;
  fromAmount: number;
  toAmount: number | null;
  taxPercentage: number;
  status: TaxStatus;
}

export interface TaxConfigurationFormData {
  financialYear: string;
  taxRegime: TaxRegime;
  standardDeduction: number;
  rebateLimit: number;
  rebateAmount: number;
  cessPercentage: number;
  effectiveDate: string;
  status: TaxStatus;
}

export interface TaxSlabFormData {
  slabOrder: number;
  fromAmount: number;
  toAmount: number | null;
  taxPercentage: number;
  status: TaxStatus;
}
