'use client';

import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Calendar, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  StatutoryComponent,
  StatutoryFormData,
  StatutoryCalculationType,
  StatutoryBasedOn,
  StatutoryCategory,
} from './types';

const calculationTypes: StatutoryCalculationType[] = [
  'Percentage',
  'Fixed Amount',
  'Tax Slab',
  'Formula',
];

const basedOnOptions: StatutoryBasedOn[] = [
  'Basic Salary',
  'Gross Salary',
  'Net Salary',
  'Monthly Salary',
  'Annual Salary',
  'Custom',
];

// Category depends on Component type
const categoryByComponent: Record<string, StatutoryCategory[]> = {
  'Provident Fund': ['Retirement', 'Deduction'],
  'Professional Tax': ['Tax', 'Deduction'],
  ESI: ['Insurance', 'Deduction'],
  'Income Tax': ['Tax', 'Compliance'],
  TDS: ['Tax', 'Deduction'],
};

const defaultCategoryOptions: StatutoryCategory[] = [
  'Tax',
  'Insurance',
  'Retirement',
  'Allowance',
  'Deduction',
  'Compliance',
];

const getDefaultForm = (): StatutoryFormData => ({
  component: '',
  type: 'Percentage',
  rule: '',
  basedOn: 'Basic Salary',
  category: 'Deduction',
  effectiveFrom: '',
  status: 'Active',
  editable: true,
  description: '',
});

interface AddComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StatutoryFormData) => void;
  initialData?: StatutoryComponent | null;
  existingComponents?: string[];
}

export const AddComponentModal: React.FC<AddComponentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  existingComponents = [],
}) => {
  const [formData, setFormData] = useState<StatutoryFormData>(getDefaultForm());
  const [errors, setErrors] = useState<Partial<Record<keyof StatutoryFormData, string>>>({});
  const [showDescription, setShowDescription] = useState(!!initialData?.description);
  const [isLoading, setIsLoading] = useState(false);
  const componentNameRef = useRef<HTMLInputElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Autofocus on component name field
  useEffect(() => {
    if (isOpen && componentNameRef.current) {
      setTimeout(() => componentNameRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const next = initialData ? { ...initialData } : getDefaultForm();
    setFormData(next);
    setErrors({});
    setShowDescription(!!initialData?.description);
  }, [initialData, isOpen]);

  const handleClose = () => {
    setFormData(getDefaultForm());
    setErrors({});
    setShowDescription(false);
    setIsLoading(false);
    onClose();
  };

  const handleChange = <K extends keyof StatutoryFormData>(key: K, value: StatutoryFormData[K]) => {
    setFormData((current) => {
      const next = { ...current, [key]: value };
      
      // Auto-update category when component changes
      if (key === 'component') {
        const compStr = value as string;
        const suggestedCategories = categoryByComponent[compStr];
        if (suggestedCategories && !suggestedCategories.includes(next.category as StatutoryCategory)) {
          next.category = suggestedCategories[0];
        }
      }
      
      return next;
    });
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const handleToggleStatus = () => {
    setFormData((current) => ({
      ...current,
      status: current.status === 'Active' ? 'Inactive' : 'Active',
    }));
  };

  const getAvailableCategories = (): StatutoryCategory[] => {
    if (formData.component && categoryByComponent[formData.component]) {
      return categoryByComponent[formData.component];
    }
    return defaultCategoryOptions;
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ruleValue =
      formData.type === 'Tax Slab'
        ? 'As per Government Tax Slabs'
        : formData.rule.trim();

    const validationErrors: Partial<Record<keyof StatutoryFormData, string>> = {};

    // Validation: Component name
    if (!formData.component.trim()) {
      validationErrors.component = 'Component name is required.';
    }

    // Validation: Duplicate check (only if creating new, not editing)
    if (!initialData && formData.component.trim()) {
      const isDuplicate = existingComponents.some(
        (comp) => comp.toLowerCase() === formData.component.toLowerCase()
      );
      if (isDuplicate) {
        validationErrors.component = 'This component already exists. Please choose a different name.';
      }
    }

    // Validation: Calculation type
    if (!formData.type) {
      validationErrors.type = 'Calculation type is required.';
    }

    // Validation: Rule/Value
    if (!ruleValue) {
      validationErrors.rule = 'Rule / value is required.';
    }

    // Validation: Based on
    if (!formData.basedOn) {
      validationErrors.basedOn = 'Based on is required.';
    }

    // Validation: Effective date
    if (!formData.effectiveFrom) {
      validationErrors.effectiveFrom = 'Effective date is required.';
    }

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600));

      onSave({
        ...formData,
        rule: ruleValue,
      });

      handleClose();
    } catch (error) {
      console.error('Error saving component:', error);
      setErrors({ component: 'Failed to save component. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRuleInput = () => {
    if (formData.type === 'Tax Slab') {
      return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          As per Government Tax Slabs
        </div>
      );
    }

    const placeholders: Record<string, string> = {
      Percentage: 'Enter Percentage (e.g., 12)',
      'Fixed Amount': 'Enter Fixed Amount (e.g., 200)',
      Formula: 'Enter Formula (e.g., Basic * 0.12)',
    };

    const placeholder = placeholders[formData.type] || 'Enter value';

    const suffix =
      formData.type === 'Percentage'
        ? '%'
        : formData.type === 'Fixed Amount'
        ? '₹'
        : '';

    return (
      <div>
        <label className="block text-sm font-medium text-slate-900">
          Rule / Value <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-2">
          <input
            type="text"
            placeholder={placeholder}
            value={formData.rule}
            onChange={(event) => handleChange('rule', event.target.value)}
            className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 ${
              errors.rule ? 'border-red-500' : ''
            }`}
          />
          {suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 pointer-events-none">
              {suffix}
            </span>
          )}
        </div>
        {errors.rule && <p className="mt-1 text-xs text-red-500">{errors.rule}</p>}
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="w-full max-w-3xl rounded-5xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Close Icon */}
        <div className="bg-linear-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-8 py-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0B1020]">
              {initialData ? 'Edit Statutory Component' : 'Add Statutory Component'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {initialData ? 'Update payroll deduction rule details.' : 'Create a new payroll deduction rule.'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-500 hover:text-slate-700 transition p-1 -m-1"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-8 py-6">
          <form id="statutory-form" className="space-y-6" onSubmit={handleSave}>
            {/* General Information Section */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">General Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900">
                    Component Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={componentNameRef}
                    type="text"
                    placeholder="Provident Fund (PF)"
                    value={formData.component}
                    onChange={(event) => handleChange('component', event.target.value)}
                    className={`mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 ${
                      errors.component ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.component && <p className="mt-1 text-xs text-red-500">{errors.component}</p>}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-900">
                      Calculation Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.type}
                      onChange={(event) => handleChange('type', event.target.value as StatutoryCalculationType)}
                      className={`mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 ${
                        errors.type ? 'border-red-500' : ''
                      }`}
                    >
                      {calculationTypes.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900">
                      Based On <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.basedOn}
                      onChange={(event) => handleChange('basedOn', event.target.value as StatutoryBasedOn)}
                      className={`mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 ${
                        errors.basedOn ? 'border-red-500' : ''
                      }`}
                    >
                      {basedOnOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.basedOn && <p className="mt-1 text-xs text-red-500">{errors.basedOn}</p>}
                  </div>
                </div>

                {renderRuleInput()}
              </div>
            </div>

            {/* Payroll Configuration Section */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Payroll Configuration</h3>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-900">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(event) => handleChange('category', event.target.value as StatutoryCategory)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    >
                      {getAvailableCategories().map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900">
                      Effective Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="date"
                        value={formData.effectiveFrom}
                        onChange={(event) => handleChange('effectiveFrom', event.target.value)}
                        className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2 pr-10 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 ${
                          errors.effectiveFrom ? 'border-red-500' : ''
                        }`}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                    {errors.effectiveFrom && <p className="mt-1 text-xs text-red-500">{errors.effectiveFrom}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <button
                type="button"
                onClick={() => setShowDescription(!showDescription)}
                className="flex w-full items-center justify-between text-sm font-semibold text-slate-900 hover:text-slate-700 transition"
              >
                <span>Additional Information</span>
                {showDescription ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {showDescription && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-900">
                    Description <span className="text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(event) => handleChange('description', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                    placeholder="Optional details about this statutory rule"
                  />
                </div>
              )}
            </div>

            {/* Status Section */}
            <div className="rounded-2xl border border-slate-200 bg-linear-to-r from-slate-50 to-slate-100 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Status</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Enable this component in payroll calculations.
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleToggleStatus}
                    className={`relative inline-flex h-10 w-20 items-center rounded-full transition-colors ${
                      formData.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span className="sr-only">Toggle status</span>
                    <span
                      className={`inline-block h-8 w-8 transform rounded-full bg-white shadow transition-transform ${
                        formData.status === 'Active' ? 'translate-x-10' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    formData.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {formData.status}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Footer */}
        <div className="border-t border-slate-200 bg-white px-8 py-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            onClick={handleClose}
            variant="secondary"
            disabled={isLoading}
            className="rounded-2xl px-6 py-2 text-sm font-medium border border-slate-300"
          >
            Cancel
          </Button>
          <button
            type="submit"
            form="statutory-form"
            disabled={isLoading}
            className="rounded-2xl bg-[#0F172A] text-white hover:bg-slate-800 transition-colors px-6 py-2 text-sm font-medium shadow-lg disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 mr-2 border-2 border-white border-r-transparent rounded-full animate-spin" />
                {initialData ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              initialData ? 'Update Component' : 'Save Component'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
