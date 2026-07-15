'use client';

import { useMemo, useState } from 'react';
import { useTaxConfiguration } from '@/hooks/useTaxConfiguration';
import { TaxConfigurationCard } from '@/components/finance/TaxConfiguration/TaxConfigurationCard';
import { TaxConfigurationModal } from '@/components/finance/TaxConfiguration/TaxConfigurationModal';
import type { TaxConfiguration, TaxConfigurationFormData } from '@/types/tax';

export default function TaxConfigurationPage() {
  const { configurationQuery, updateMutation } = useTaxConfiguration();
  const [editingItem, setEditingItem] = useState<TaxConfiguration | null>(null);

  const data = useMemo(() => configurationQuery.data ?? null, [configurationQuery.data]);

  const handleSave = (payload: TaxConfigurationFormData) => {
    updateMutation.mutate(payload, {
      onSuccess: () => {
        setEditingItem(null);
      },
    });
  };

  if (configurationQuery.isLoading) {
    return <div className="p-6 text-sm text-slate-500">Loading tax configuration...</div>;
  }

  if (configurationQuery.isError) {
    return <div className="p-6 text-sm text-red-600">Unable to load tax configuration right now.</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Tax Configuration</p>
        <h1 className="text-3xl font-semibold text-slate-950">Enterprise tax configuration</h1>
        <p className="text-sm text-slate-500">Oversee annual tax policy values used across payroll and statutory controls.</p>
      </div>
      {data ? <TaxConfigurationCard data={data} onEdit={() => setEditingItem(data)} /> : null}
      <TaxConfigurationModal open={Boolean(editingItem)} data={editingItem} onClose={() => setEditingItem(null)} onSave={handleSave} />
    </div>
  );
}
