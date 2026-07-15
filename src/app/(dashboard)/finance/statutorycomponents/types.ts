export type StatutoryCalculationType = 'Percentage' | 'Fixed Amount' | 'Tax Slab' | 'Formula';
export type StatutoryBasedOn =
  | 'Basic Salary'
  | 'Gross Salary'
  | 'Net Salary'
  | 'Monthly Salary'
  | 'Annual Salary'
  | 'Custom';
export type StatutoryCategory =
  | 'Tax'
  | 'Insurance'
  | 'Retirement'
  | 'Allowance'
  | 'Deduction'
  | 'Compliance';
export type StatutoryStatus = 'Active' | 'Inactive';

export interface StatutoryComponent {
  id: number;
  component: string;
  type: StatutoryCalculationType;
  rule: string;
  basedOn: StatutoryBasedOn;
  category: StatutoryCategory;
  effectiveFrom: string;
  status: StatutoryStatus;
  editable: boolean;
  description: string;
}

export type StatutoryFormData = Omit<StatutoryComponent, 'id'>;
