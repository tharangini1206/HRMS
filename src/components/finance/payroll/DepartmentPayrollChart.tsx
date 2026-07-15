'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface DepartmentPayrollData {
  department: string;
  payroll: number;
}

interface DepartmentPayrollChartProps {
  data?: DepartmentPayrollData[];
  title?: string;
  barColor?: string;
}

const defaultData: DepartmentPayrollData[] = [
  { department: 'IT', payroll: 4500000 },
  { department: 'HR', payroll: 1800000 },
  { department: 'Sales', payroll: 3000000 },
  { department: 'Finance', payroll: 1200000 },
];

const formatCurrency = (value: number): string => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`;
  }
  return `₹${(value / 1000000).toFixed(1)}L`;
};

export const DepartmentPayrollChart: React.FC<DepartmentPayrollChartProps> = ({
  data = defaultData,
  title = 'Department Payroll Cost',
  barColor = '#FF3B43',
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
      <h3 className="text-sm font-semibold text-slate-900 mb-6">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="department"
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip
              formatter={(value) => {
                if (typeof value === 'number') {
                  return formatCurrency(value);
                }
                return value;
              }}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
              }}
              cursor={{ fill: 'rgba(15, 23, 42, 0.05)' }}
            />
            <Bar
              dataKey="payroll"
              fill={barColor}
              radius={[8, 8, 0, 0]}
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => (
          <div key={item.department} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {item.department}
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">
              {formatCurrency(item.payroll)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
