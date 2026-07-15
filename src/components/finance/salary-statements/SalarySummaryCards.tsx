import React from 'react';
import { FileText, TrendingUp, Clock, AlertCircle } from 'lucide-react';

interface SummaryCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const summaryData: SummaryCard[] = [
  {
    title: 'Total Payslips',
    value: 12,
    icon: <FileText className="h-6 w-6" />,
    color: 'text-blue-600',
    description: 'All salary statements',
  },
  {
    title: 'Available',
    value: 10,
    icon: <TrendingUp className="h-6 w-6" />,
    color: 'text-emerald-600',
    description: 'Ready to download',
  },
  {
    title: 'Processing',
    value: 1,
    icon: <Clock className="h-6 w-6" />,
    color: 'text-amber-600',
    description: 'Being generated',
  },
  {
    title: 'Unavailable',
    value: 1,
    icon: <AlertCircle className="h-6 w-6" />,
    color: 'text-red-600',
    description: 'Not ready yet',
  },
];

export const SalarySummaryCards: React.FC = () => {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((card, index) => (
        <div
          key={index}
          className="group rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:shadow-lg hover:scale-105"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{card.title}</p>
              <p className="mt-4 text-4xl font-bold text-slate-950">{card.value}</p>
              <p className="mt-2 text-xs text-slate-500">{card.description}</p>
            </div>
            <div className={`rounded-xl bg-blue-100/50 p-3 ${card.color} transition-transform duration-300 group-hover:scale-110`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
