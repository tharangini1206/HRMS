import type { InvoiceStatus } from '@/types/finance';
import { INVOICE_STATUSES } from '@/types/finance';

const [PAID_STATUS, PENDING_STATUS, OVERDUE_STATUS] = INVOICE_STATUSES;

const invoices: { id: string; client: string; amount: string; status: InvoiceStatus }[] = [
  {
    id: "INV-101",
    client: "ABC Pvt Ltd",
    amount: "₹75,000",
    status: INVOICE_STATUSES[0],
  },
  {
    id: "INV-102",
    client: "XYZ Solutions",
    amount: "₹52,000",
    status: INVOICE_STATUSES[1],
  },
];

const invoiceStatusStyleMap: Record<InvoiceStatus, string> = {
  [PAID_STATUS]: "bg-emerald-100 text-emerald-700",
  [PENDING_STATUS]: "bg-amber-100 text-amber-700",
  [OVERDUE_STATUS]: "bg-red-100 text-red-700",
};

const statusClass = (status: InvoiceStatus) => invoiceStatusStyleMap[status] ?? "bg-slate-100 text-slate-700";

export default function Invoices() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Finance</p>
        <h1 className="text-3xl font-bold text-slate-950">Invoices</h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Track issued invoices, outstanding balances, and payment completion for your finance team.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Invoice ledger</h2>
            <p className="mt-1 text-sm text-slate-600">Review the latest invoices and status updates across all customers.</p>
          </div>
          <div className="inline-flex items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-700">{PAID_STATUS}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">{PENDING_STATUS}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Invoice ID</th>
                <th className="px-6 py-4 text-left font-semibold">Client</th>
                <th className="px-6 py-4 text-left font-semibold">Amount</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {invoices.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.id}</td>
                  <td className="px-6 py-4 text-slate-600">{item.client}</td>
                  <td className="px-6 py-4 text-slate-900">{item.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
