import React from 'react';
import type { SalaryStatementStatus } from '@/types/finance';

interface StatusBadgeProps {
  status: SalaryStatementStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    Available: 'bg-emerald-100 text-emerald-700',
    Processing: 'bg-amber-100 text-amber-700',
    Unavailable: 'bg-red-100 text-red-700',
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};
