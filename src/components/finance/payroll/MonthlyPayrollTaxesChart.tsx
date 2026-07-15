'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface MonthlyTaxData {
  month: string;
  pf: number;
  esi: number;
  pt: number;
  tds: number;
  bonus: number;
}

interface MonthlyPayrollTaxesChartProps {
  data?: MonthlyTaxData[];
  title?: string;
}

const defaultData: MonthlyTaxData[] = [
  { month: 'Jan', pf: 180000, esi: 40000, pt: 25000, tds: 150000, bonus: 50000 },
  { month: 'Feb', pf: 175000, esi: 38000, pt: 24000, tds: 145000, bonus: 55000 },
  { month: 'Mar', pf: 182000, esi: 41000, pt: 26000, tds: 155000, bonus: 50000 },
  { month: 'Apr', pf: 178000, esi: 39000, pt: 25000, tds: 148000, bonus: 60000 },
];

const TAX_COLORS = {
  pf: '#4A6CF7',
  esi: '#58C4B4',
  pt: '#FFD166',
  tds: '#FF7A7A',
  bonus: '#C4B5FD',
};

const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `₹${(value / 1000000).toFixed(1)}L`;
  }
  return `₹${(value / 1000).toFixed(0)}K`;
};

const calculateTotals = (data: MonthlyTaxData[]) => {
  return {
    pf: data.reduce((sum, item) => sum + item.pf, 0),
    esi: data.reduce((sum, item) => sum + item.esi, 0),
    pt: data.reduce((sum, item) => sum + item.pt, 0),
    tds: data.reduce((sum, item) => sum + item.tds, 0),
    bonus: data.reduce((sum, item) => sum + item.bonus, 0),
  };
};

export const MonthlyPayrollTaxesChart: React.FC<MonthlyPayrollTaxesChartProps> = ({
  data = defaultData,
  title = 'Monthly Payroll Taxes',
}) => {
  const totals = calculateTotals(data);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
      <h3 className="text-sm font-semibold text-slate-900 mb-6">{title}</h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
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
            <Legend
              wrapperStyle={{
                paddingTop: '20px',
              }}
              formatter={(value) => {
                const labels: { [key: string]: string } = {
                  pf: 'PF',
                  esi: 'ESI',
                  pt: 'Professional Tax',
                  tds: 'TDS',
                  bonus: 'Bonus',
                };
                return labels[value] || value;
              }}
            />
            <Bar dataKey="pf" stackId="a" fill={TAX_COLORS.pf} radius={[8, 8, 0, 0]} />
            <Bar dataKey="esi" stackId="a" fill={TAX_COLORS.esi} />
            <Bar dataKey="pt" stackId="a" fill={TAX_COLORS.pt} />
            <Bar dataKey="tds" stackId="a" fill={TAX_COLORS.tds} />
            <Bar dataKey="bonus" stackId="a" fill={TAX_COLORS.bonus} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: TAX_COLORS.pf }}></div>
            <p className="text-xs font-semibold text-slate-600">PF</p>
          </div>
          <p className="text-lg font-bold text-slate-950">{formatCurrency(totals.pf)}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: TAX_COLORS.esi }}></div>
            <p className="text-xs font-semibold text-slate-600">ESI</p>
          </div>
          <p className="text-lg font-bold text-slate-950">{formatCurrency(totals.esi)}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: TAX_COLORS.pt }}></div>
            <p className="text-xs font-semibold text-slate-600">Prof. Tax</p>
          </div>
          <p className="text-lg font-bold text-slate-950">{formatCurrency(totals.pt)}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: TAX_COLORS.tds }}></div>
            <p className="text-xs font-semibold text-slate-600">TDS</p>
          </div>
          <p className="text-lg font-bold text-slate-950">{formatCurrency(totals.tds)}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: TAX_COLORS.bonus }}></div>
            <p className="text-xs font-semibold text-slate-600">Bonus</p>
          </div>
          <p className="text-lg font-bold text-slate-950">{formatCurrency(totals.bonus)}</p>
        </div>
      </div>
    </div>
  );
};
