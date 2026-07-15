import React from 'react';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  onResetFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onResetFilters }) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/80 p-12 text-center shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl">
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-slate-100 p-4">
          <FileX className="h-8 w-8 text-slate-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">No salary statements found</h3>
      <p className="mt-2 text-sm text-slate-600">
        Try adjusting your filters or search criteria to find what you're looking for.
      </p>
      <button
        onClick={onResetFilters}
        className="mt-6 rounded-lg border border-blue-200 bg-blue-50 px-6 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100 hover:border-blue-300"
      >
        Reset Filters
      </button>
    </div>
  );
};
