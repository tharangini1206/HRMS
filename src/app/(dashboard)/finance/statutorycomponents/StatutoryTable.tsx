import { Edit2, Eye, Trash2 } from 'lucide-react';
import { StatutoryComponent } from './types';

interface StatutoryTableProps {
  components: StatutoryComponent[];
  onView: (component: StatutoryComponent) => void;
  onEdit: (component: StatutoryComponent) => void;
  onDelete: (component: StatutoryComponent) => void;
}

export const StatutoryTable: React.FC<StatutoryTableProps> = ({
  components,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Component</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Rule</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Based On</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {components.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-900">{item.component}</td>
                <td className="px-6 py-4 text-slate-600">{item.type}</td>
                <td className="px-6 py-4 text-slate-900">{item.rule}</td>
                <td className="px-6 py-4 text-slate-900">{item.basedOn}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onView(item)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                      title="View component"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                      title="Edit component"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-100 bg-white text-red-600 transition hover:bg-red-50 hover:text-red-700"
                      title="Delete component"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
