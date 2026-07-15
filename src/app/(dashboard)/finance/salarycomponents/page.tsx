'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

import type { SalaryComponentStatus } from '@/types/finance';
import { SALARY_COMPONENT_STATUSES } from '@/types/finance';

type SalaryComponent = {
  id: number;
  name: string;
  type: 'Earning' | 'Deduction';
  calculation: 'Percentage' | 'Fixed Amount' | 'Amount';
  value: string;
  status: SalaryComponentStatus;
};

const [ACTIVE_STATUS, INACTIVE_STATUS] = SALARY_COMPONENT_STATUSES;

const initialComponents: SalaryComponent[] = [
  { id: 1, name: 'Basic Salary', type: 'Earning', calculation: 'Fixed Amount', value: '₹35,000', status: ACTIVE_STATUS },
  { id: 2, name: 'HRA', type: 'Earning', calculation: 'Percentage', value: '20%', status: ACTIVE_STATUS },
  { id: 3, name: 'Special Allowance', type: 'Earning', calculation: 'Fixed Amount', value: '₹12,000', status: ACTIVE_STATUS },
  { id: 4, name: 'Medical Allowance', type: 'Earning', calculation: 'Amount', value: '₹2,000', status: ACTIVE_STATUS },
  { id: 5, name: 'Travel Allowance', type: 'Earning', calculation: 'Fixed Amount', value: '₹1,500', status: INACTIVE_STATUS },
  { id: 6, name: 'Conveyance', type: 'Earning', calculation: 'Fixed Amount', value: '₹1,000', status: ACTIVE_STATUS },
  { id: 7, name: 'Bonus', type: 'Earning', calculation: 'Percentage', value: 'Variable', status: ACTIVE_STATUS },
  { id: 8, name: 'Gratuity', type: 'Earning', calculation: 'Fixed Amount', value: '₹4,000', status: ACTIVE_STATUS },
];

export default function SalaryComponentsPage() {
  const [components, setComponents] = useState(initialComponents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Earning' as SalaryComponent['type'],
    calculation: 'Fixed Amount' as SalaryComponent['calculation'],
    value: '',
    status: ACTIVE_STATUS as SalaryComponent['status'],
  });

  const handleOpenModal = () => {
    setEditingId(null);
    setFormData({ name: '', type: 'Earning', calculation: 'Fixed Amount', value: '', status: ACTIVE_STATUS });
    setIsModalOpen(true);
  };

  const handleEdit = (component: SalaryComponent) => {
    setEditingId(component.id);
    setFormData({
      name: component.name,
      type: component.type,
      calculation: component.calculation,
      value: component.value,
      status: component.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this component?')) {
      setComponents((current) => current.filter((component) => component.id !== id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', type: 'Earning', calculation: 'Fixed Amount', value: '', status: ACTIVE_STATUS });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.value.trim()) {
      return;
    }

    if (editingId) {
      setComponents((current) =>
        current.map((component) =>
          component.id === editingId
            ? {
                ...component,
                name: formData.name.trim(),
                type: formData.type,
                calculation: formData.calculation,
                value: formData.value.trim(),
                status: formData.status,
              }
            : component
        )
      );
    } else {
      const newComponent: SalaryComponent = {
        id: Date.now(),
        name: formData.name.trim(),
        type: formData.type,
        calculation: formData.calculation,
        value: formData.value.trim(),
        status: formData.status,
      };

      setComponents((current) => [newComponent, ...current]);
    }

    handleCloseModal();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Finance</p>
          <h1 className="text-4xl font-bold text-slate-950">Salary Components</h1>
        </div>
        <Link href="/finance" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
          Back to Finance Overview
        </Link>
      </div>

      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Salary structure</h2>
            <p className="mt-2 text-sm text-slate-600">
              Manage reusable salary components for payroll and employee compensation.
            </p>
          </div>
          <Button
            onClick={handleOpenModal}
            className="rounded-2xl bg-linear-to-r from-red-500 to-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/10 hover:brightness-105"
          >
            + Add Component
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Type</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Value</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {components.map((component) => (
                <tr key={component.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-900">{component.name}</div>
                    <div className="text-sm text-slate-500">{component.calculation}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-700">{component.type}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{component.value}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${component.status === ACTIVE_STATUS ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {component.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(component)}
                        className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                        title="Edit component"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(component.id)}
                        className="rounded-full border border-red-100 bg-white p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                        title="Delete component"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingId ? 'Edit Component' : 'Add Component'}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Component Name"
            placeholder="Enter component name"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Type
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={formData.type}
                onChange={(event) => setFormData((current) => ({ ...current, type: event.target.value as SalaryComponent['type'] }))}
              >
                <option value="Earning">Earning</option>
                <option value="Deduction">Deduction</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Calculation
              <select
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={formData.calculation}
                onChange={(event) => setFormData((current) => ({ ...current, calculation: event.target.value as SalaryComponent['calculation'] }))}
              >
                <option value="Percentage">Percentage</option>
                <option value="Fixed Amount">Fixed Amount</option>
                <option value="Amount">Amount</option>
              </select>
            </label>
          </div>

          <Input
            label="Value"
            placeholder="Enter value or percentage"
            value={formData.value}
            onChange={(event) => setFormData((current) => ({ ...current, value: event.target.value }))}
          />

                  <label className="block text-sm font-medium text-slate-700">
            Status
            <select
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              value={formData.status}
              onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value as SalaryComponent['status'] }))}
            >
              {SALARY_COMPONENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">{editingId ? 'Update' : 'Save'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
