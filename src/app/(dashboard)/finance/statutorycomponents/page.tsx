'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AddComponentModal } from './AddComponentModal';
import { StatutoryTable } from './StatutoryTable';
import { StatutoryComponent, StatutoryFormData } from './types';

const initialComponents: StatutoryComponent[] = [
  { id: 1, component: 'Provident Fund (PF)', type: 'Percentage', rule: '12%', basedOn: 'Basic Salary', category: 'Tax', effectiveFrom: '2024-04-01', status: 'Active', editable: true, description: 'Standard provident fund contribution.' },
  { id: 2, component: 'Professional Tax', type: 'Fixed Amount', rule: '₹200', basedOn: 'Monthly Salary', category: 'Deduction', effectiveFrom: '2024-04-01', status: 'Active', editable: true, description: 'Monthly professional tax deduction.' },
  { id: 3, component: 'ESI Employee', type: 'Percentage', rule: '0.75%', basedOn: 'Basic Salary', category: 'Insurance', effectiveFrom: '2024-04-01', status: 'Active', editable: true, description: 'Employee State Insurance contribution.' },
  { id: 4, component: 'Income Tax', type: 'Percentage', rule: 'Slab Based', basedOn: 'Gross Salary', category: 'Tax', effectiveFrom: '2024-04-01', status: 'Active', editable: true, description: 'Income tax deduction as per tax slabs.' },
  { id: 5, component: 'TDS', type: 'Percentage', rule: '10%', basedOn: 'Gross Salary', category: 'Tax', effectiveFrom: '2024-04-01', status: 'Active', editable: true, description: 'Tax Deducted at Source.' },
  { id: 6, component: 'LOP Deduction', type: 'Fixed Amount', rule: 'Variable', basedOn: 'Custom', category: 'Deduction', effectiveFrom: '2024-04-01', status: 'Active', editable: true, description: 'Leave Without Pay deduction.' },
  { id: 7, component: 'Other Deductions', type: 'Fixed Amount', rule: 'Variable', basedOn: 'Custom', category: 'Deduction', effectiveFrom: '2024-04-01', status: 'Active', editable: true, description: 'Miscellaneous deductions as applicable.' },
];

export default function StatutoryComponentsPage() {
  const [components, setComponents] = useState<StatutoryComponent[]>(initialComponents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComponent, setEditingComponent] = useState<StatutoryComponent | null>(null);

  const handleAddClick = () => {
    setEditingComponent(null);
    setIsModalOpen(true);
  };

  const handleSaveComponent = (formData: StatutoryFormData) => {
    if (editingComponent) {
      setComponents((current) =>
        current.map((item) =>
          item.id === editingComponent.id
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      setComponents((current) => [
        ...current,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
    }

    setIsModalOpen(false);
    setEditingComponent(null);
  };

  const handleView = (component: StatutoryComponent) => {
    setEditingComponent(component);
    setIsModalOpen(true);
  };

  const handleEdit = (component: StatutoryComponent) => {
    setEditingComponent(component);
    setIsModalOpen(true);
  };

  const handleDelete = (component: StatutoryComponent) => {
    if (!window.confirm('Delete this statutory component?')) {
      return;
    }
    setComponents((current) => current.filter((item) => item.id !== component.id));
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">For a Finance Admin</p>
          <h1 className="text-4xl font-bold text-slate-950">Statutory Components</h1>
        </div>
        <Link href="/finance" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
          Back to Finance Overview
        </Link>
      </div>

      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01]">
        <h2 className="text-lg font-semibold text-slate-900">Page directions</h2>
        <p className="mt-3 text-sm text-slate-600">
          Review mandatory payroll contributions and statutory deductions that affect net salary.
          Use Salary Components to compare gross payroll mix and Salary Statements to confirm final payslips.
        </p>
      </div>

      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Statutory component rules</h2>
            <p className="mt-2 text-sm text-slate-600">Manage finance admin statutory deductions and contribution rules.</p>
          </div>
          <Button
            type="button"
            onClick={handleAddClick}
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-red-500 to-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/10 hover:brightness-105"
          >
            <Plus size={18} />
            Add Statutory Component
          </Button>
        </div>
      </div>

      <StatutoryTable
        components={components}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddComponentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingComponent(null);
        }}
        onSave={handleSaveComponent}
        initialData={editingComponent}
      />
    </div>
  );
}
