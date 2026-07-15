'use client';

import { memo } from 'react';
import { BarChart, Bar, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const payrollTrendData = [
  { month: 'Jan', payroll: 7800000, taxes: 1200000 },
  { month: 'Feb', payroll: 8200000, taxes: 1280000 },
  { month: 'Mar', payroll: 8600000, taxes: 1320000 },
  { month: 'Apr', payroll: 9000000, taxes: 1390000 },
  { month: 'May', payroll: 9400000, taxes: 1450000 },
  { month: 'Jun', payroll: 9800000, taxes: 1520000 },
];

const taxBreakdownData = [
  { month: 'Jan', PF: 320000, ESI: 120000, ProfessionalTax: 90000, IncomeTax: 250000, Bonus: 180000 },
  { month: 'Feb', PF: 340000, ESI: 128000, ProfessionalTax: 98000, IncomeTax: 265000, Bonus: 190000 },
  { month: 'Mar', PF: 360000, ESI: 132000, ProfessionalTax: 104000, IncomeTax: 280000, Bonus: 200000 },
  { month: 'Apr', PF: 380000, ESI: 138000, ProfessionalTax: 108000, IncomeTax: 295000, Bonus: 210000 },
  { month: 'May', PF: 395000, ESI: 142000, ProfessionalTax: 112000, IncomeTax: 300000, Bonus: 220000 },
  { month: 'Jun', PF: 410000, ESI: 148000, ProfessionalTax: 118000, IncomeTax: 315000, Bonus: 232000 },
];

const departmentDistribution = [
  { name: 'Technology', value: 38 },
  { name: 'Finance', value: 18 },
  { name: 'HR', value: 14 },
  { name: 'Operations', value: 12 },
  { name: 'Sales', value: 18 },
];

const pieColors = ['#0F172A', '#FF4D4D', '#64748B', '#E9E9F5', '#38BDF8'];

export const PayrollCharts = memo(function PayrollCharts() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)] xl:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Payroll Trend</h3>
            <p className="text-sm text-slate-500">Compensation movement across the current year.</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={payrollTrendData}>
              <CartesianGrid stroke="#E9E9F5" strokeDasharray="5 5" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="payroll" stroke="#0F172A" strokeWidth={3} />
              <Line type="monotone" dataKey="taxes" stroke="#FF4D4D" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)]">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Payroll Distribution</h3>
          <p className="text-sm text-slate-500">Emphasis by department.</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={departmentDistribution} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
                {departmentDistribution.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.25)] xl:col-span-3">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Monthly Payroll Taxes</h3>
          <p className="text-sm text-slate-500">Tracked tax components for payroll operations.</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taxBreakdownData}>
              <CartesianGrid stroke="#E9E9F5" strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="PF" stackId="taxes" fill="#0F172A" />
              <Bar dataKey="ESI" stackId="taxes" fill="#64748B" />
              <Bar dataKey="ProfessionalTax" stackId="taxes" fill="#FF4D4D" />
              <Bar dataKey="IncomeTax" stackId="taxes" fill="#38BDF8" />
              <Bar dataKey="Bonus" stackId="taxes" fill="#E9E9F5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});
