'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#2563EB', '#14B8A6', '#22C55E', '#FACC15', '#8B5CF6', '#FF3B43'];

export interface PayrollDistributionData {
  name: string;
  value: number;
}

interface PayrollDistributionChartProps {
  data?: PayrollDistributionData[];
  title?: string;
  totalLabel?: string;
}

const defaultData: PayrollDistributionData[] = [
  { name: 'IT', value: 80 },
  { name: 'HR', value: 35 },
  { name: 'Sales', value: 60 },
  { name: 'Finance', value: 20 },
  { name: 'Marketing', value: 25 },
  { name: 'Operations', value: 25 },
];

export const PayrollDistributionChart: React.FC<PayrollDistributionChartProps> = ({
  data = defaultData,
  title = 'Payroll Distribution',
  totalLabel = 'Employees Processed',
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
      <h3 className="text-sm font-semibold text-slate-900 mb-6">{title}</h3>
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} Employees`, 'Count']}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          <div className="text-center lg:text-left mb-4">
            <p className="text-3xl font-bold text-slate-950">{total}</p>
            <p className="text-sm text-slate-600">{totalLabel}</p>
          </div>
          
          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
