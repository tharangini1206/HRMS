'use client';

import { useMemo, useState } from 'react';
import { useTaxSlabs } from '@/hooks/useTaxSlabs';
import { TaxSlabTable } from '@/components/finance/TaxSlab/TaxSlabTable';
import { TaxSlabModal } from '@/components/finance/TaxSlab/TaxSlabModal';
import type { TaxSlab, TaxSlabFormData } from '@/types/tax';

export default function TaxSlabsPage() {
  const { taxSlabsQuery, createMutation, updateMutation, deleteMutation } = useTaxSlabs();
  const [editingItem, setEditingItem] = useState<TaxSlab | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const data = useMemo(() => taxSlabsQuery.data ?? [], [taxSlabsQuery.data]);

  const handleSave = (payload: TaxSlabFormData) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, payload });
    } else {
      createMutation.mutate(payload);
    }
    setEditingItem(null);
    setIsCreateOpen(false);
  };

  const handleDelete = (item: TaxSlab) => {
    deleteMutation.mutate(item.id);
  };

  if (taxSlabsQuery.isLoading) {
    return <div className="p-6 text-sm text-slate-500">Loading tax slabs...</div>;
  }

  if (taxSlabsQuery.isError) {
    return <div className="p-6 text-sm text-red-600">Unable to load tax slabs right now.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Tax Slabs</p>
        <h1 className="text-3xl font-semibold text-slate-950">Progressive tax slab management</h1>
        <p className="text-sm text-slate-500">Administer slab thresholds and rates that feed payroll tax calculations.</p>
      </div>
      <TaxSlabTable items={data} onAdd={() => setIsCreateOpen(true)} onEdit={(item) => setEditingItem(item)} onDelete={handleDelete} />
      <TaxSlabModal open={Boolean(editingItem) || isCreateOpen} item={editingItem} onClose={() => { setEditingItem(null); setIsCreateOpen(false); }} onSave={handleSave} />
    </div>
  );
}
