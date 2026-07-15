'use client';

import {
  Wallet,
  CreditCard,
  Receipt,
  FileText,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock,
  CheckCheck,
  Download,
  BarChart3,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { InvoiceStatus, SalaryProcessingStatus } from '@/types/finance';
import { INVOICE_STATUSES, EXPENSE_STATUSES, FINANCE_SALARY_OVERVIEW_STATUSES, SALARY_PROCESSING_STATUSES } from '@/types/finance';
import { PAYROLL_STATUSES, PAYROLL_PAYMENT_STATUSES } from '@/types/payroll';

const formatTooltipValue = (value: unknown, divisor: number, suffix: string) => {
  const numericValue = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  if (!Number.isFinite(numericValue)) {
    return '';
  }
  return `₹${(numericValue / divisor).toFixed(suffix === 'L' ? 1 : 0)}${suffix}`;
};

// Mock Data
const payrollTrendData = [
  { month: 'Jan', payroll: 1050000, expenses: 320000 },
  { month: 'Feb', payroll: 1180000, expenses: 380000 },
  { month: 'Mar', payroll: 1250000, expenses: 420000 },
  { month: 'Apr', payroll: 1100000, expenses: 350000 },
  { month: 'May', payroll: 1320000, expenses: 480000 },
  { month: 'Jun', payroll: 1250000, expenses: 410000 },
  { month: 'Jul', payroll: 1450000, expenses: 520000 },
];

const expenseBreakdownData = [
  { name: 'Travel', value: 150000, color: '#3b82f6' },
  { name: 'Office', value: 180000, color: '#10b981' },
  { name: 'Medical', value: 85000, color: '#f59e0b' },
  { name: 'Food', value: 45000, color: '#ef4444' },
  { name: 'Training', value: 20000, color: '#8b5cf6' },
];

const [INVOICE_PAID_STATUS, INVOICE_PENDING_STATUS, INVOICE_OVERDUE_STATUS] = INVOICE_STATUSES;
const [, EXPENSE_PENDING_STATUS] = EXPENSE_STATUSES;
const [SALARY_OVERVIEW_PROCESSED_STATUS, SALARY_OVERVIEW_PENDING_STATUS, SALARY_OVERVIEW_FAILED_STATUS] = FINANCE_SALARY_OVERVIEW_STATUSES;
const [SALARY_PROCESSING_READY_STATUS, SALARY_PROCESSING_PENDING_STATUS] = SALARY_PROCESSING_STATUSES;

const invoiceStatusStyleMap: Record<InvoiceStatus, string> = {
  [INVOICE_PAID_STATUS]: 'bg-emerald-100 text-emerald-700',
  [INVOICE_PENDING_STATUS]: 'bg-yellow-100 text-yellow-700',
  [INVOICE_OVERDUE_STATUS]: 'bg-red-100 text-red-700',
};

const salaryProcessingStatusStyleMap: Record<SalaryProcessingStatus, string> = {
  [SALARY_PROCESSING_READY_STATUS]: 'bg-emerald-100 text-emerald-700',
  [SALARY_PROCESSING_PENDING_STATUS]: 'bg-yellow-100 text-yellow-700',
};

const getInvoiceStatusClass = (status: InvoiceStatus) => invoiceStatusStyleMap[status] ?? 'bg-slate-100 text-slate-700';
const getSalaryProcessingStatusClass = (status: SalaryProcessingStatus) => salaryProcessingStatusStyleMap[status] ?? 'bg-slate-100 text-slate-700';

const recentTransactions = [
  { id: 1, employee: 'John Doe', amount: 48000, status: INVOICE_PAID_STATUS, date: 'Yesterday' },
  { id: 2, employee: 'Alex Kumar', amount: 52000, status: INVOICE_PENDING_STATUS, date: 'Today' },
  { id: 3, employee: 'Rahul Singh', amount: 41000, status: INVOICE_PAID_STATUS, date: '2 days ago' },
  { id: 4, employee: 'Priya Sharma', amount: 45000, status: INVOICE_PAID_STATUS, date: '3 days ago' },
];

const pendingClaims = [
  { id: 1, employee: 'John Doe', category: 'Travel', amount: 1200, status: EXPENSE_PENDING_STATUS },
  { id: 2, employee: 'Alex Kumar', category: 'Food', amount: 650, status: EXPENSE_PENDING_STATUS },
  { id: 3, employee: 'Rahul Singh', category: 'Office', amount: 2500, status: EXPENSE_PENDING_STATUS },
];

const upcomingSalaryProcessing = [
  { department: 'IT', employees: 35, date: '25 Jul', status: SALARY_PROCESSING_READY_STATUS },
  { department: 'HR', employees: 18, date: '25 Jul', status: SALARY_PROCESSING_PENDING_STATUS },
  { department: 'Sales', employees: 22, date: '26 Jul', status: SALARY_PROCESSING_READY_STATUS },
  { department: 'Finance', employees: 12, date: '26 Jul', status: SALARY_PROCESSING_PENDING_STATUS },
];

const departmentPayroll = [
  { name: 'IT', amount: 450000, percentage: 95 },
  { name: 'HR', amount: 220000, percentage: 65 },
  { name: 'Finance', amount: 180000, percentage: 50 },
  { name: 'Sales', amount: 310000, percentage: 80 },
];

const recentActivities = [
  { time: '10:30 AM', activity: 'Payroll generated', type: 'success' },
  { time: '11:20 AM', activity: 'Invoice created', type: 'info' },
  { time: '1:15 PM', activity: 'Expense approved', type: 'success' },
  { time: '2:00 PM', activity: 'Salary processed', type: 'success' },
];

const upcomingDeadlines = [
  { task: 'Salary Processing', date: '25 Jul', priority: 'High', color: 'text-red-600' },
  { task: 'GST Filing', date: '28 Jul', priority: 'Medium', color: 'text-yellow-600' },
  { task: 'PF Submission', date: '30 Jul', priority: 'High', color: 'text-red-600' },
  { task: 'Invoice Due', date: '2 Aug', priority: 'Low', color: 'text-green-600' },
];

const invoiceStatusData = [
  { name: INVOICE_PAID_STATUS, value: 95, color: '#10b981' },
  { name: INVOICE_PENDING_STATUS, value: 18, color: '#f59e0b' },
  { name: INVOICE_OVERDUE_STATUS, value: 7, color: '#ef4444' },
];

const salaryStatusData = [
  { name: SALARY_OVERVIEW_PROCESSED_STATUS, value: 85 },
  { name: SALARY_OVERVIEW_PENDING_STATUS, value: 10 },
  { name: SALARY_OVERVIEW_FAILED_STATUS, value: 5 },
];

const employeeSalaryDistribution = [
  { department: 'IT', salary: 1250000 },
  { department: 'HR', salary: 680000 },
  { department: 'Sales', salary: 920000 },
  { department: 'Finance', salary: 520000 },
  { department: 'Support', salary: 420000 },
];

const quickActions = [
  { label: 'Generate Payroll', icon: Wallet, color: 'from-blue-500 to-blue-600' },
  { label: 'Add Expense', icon: CreditCard, color: 'from-green-500 to-green-600' },
  { label: 'Create Invoice', icon: Receipt, color: 'from-purple-500 to-purple-600' },
  { label: 'Create Reimbursement', icon: FileText, color: 'from-orange-500 to-orange-600' },
  { label: 'Generate Report', icon: BarChart3, color: 'from-pink-500 to-pink-600' },
  { label: 'Export Excel', icon: Download, color: 'from-indigo-500 to-indigo-600' },
];

// Stat Card Component
const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendType: 'up' | 'down' | 'neutral';
  color: string;
}) => {
  const colorMap: Record<string, string> = {
    'text-emerald-600': 'from-emerald-600',
    'text-red-600': 'from-red-600',
    'text-orange-600': 'from-orange-600',
    'text-blue-600': 'from-blue-600',
    'text-purple-600': 'from-purple-600',
  };

  const fromClass = colorMap[color] ?? (color.startsWith('text-') ? color.replace('text-', 'from-') : 'from-slate-500');

  return (
    <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-bold text-slate-950">{value}</p>
          <div className="mt-3 flex items-center gap-1">
            {trendType === 'up' && <TrendingUp className={`h-4 w-4 ${color}`} />}
            {trendType === 'down' && <TrendingDown className={`h-4 w-4 ${color}`} />}
            <span className={`text-sm font-medium ${color}`}>{trend}</span>
          </div>
        </div>
        <div className={`rounded-xl bg-linear-to-br ${fromClass}/20 p-3`}>
          {Icon}
        </div>
      </div>
    </div>
  );
};

export default function FinanceDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Finance Dashboard
        </p>
        <h1 className="text-4xl font-bold text-slate-950">Finance Overview</h1>
      </header>

      {/* Stat Cards */}
      <section className="grid gap-6 xl:grid-cols-4">
        <div className="transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <StatCard
            title="Total Payroll"
            value="₹12,50,000"
            icon={<Wallet className="h-6 w-6 text-blue-600" />}
            trend="+15%"
            trendType="up"
            color="text-emerald-600"
          />
        </div>
        <div className="transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <StatCard
            title="Expenses"
            value="₹4,80,000"
            icon={<CreditCard className="h-6 w-6 text-green-600" />}
            trend="+8%"
            trendType="up"
            color="text-red-600"
          />
        </div>
        <div className="transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <StatCard
            title="Invoices"
            value="120"
            icon={<Receipt className="h-6 w-6 text-purple-600" />}
            trend="+12%"
            trendType="up"
            color="text-emerald-600"
          />
        </div>
        <div className="transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <StatCard
            title="Pending Claims"
            value="15"
            icon={<FileText className="h-6 w-6 text-orange-600" />}
            trend="3 New"
            trendType="neutral"
            color="text-orange-600"
          />
        </div>
      </section>

      {/* Charts Row 1 */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* Payroll Trend */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Payroll Trend</h2>
            <span className="text-xs font-medium text-slate-500">Monthly</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={payrollTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="payroll" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Expense Breakdown</h2>
            <span className="text-xs font-medium text-slate-500">This Quarter</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdownData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatTooltipValue(value, 1000, 'k')} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Charts Row 2 */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* Recent Transactions */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Recent Transactions</h2>
          <div className="mt-4 space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{tx.employee}</p>
                  <p className="text-xs text-slate-500">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">₹{tx.amount.toLocaleString()}</p>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getInvoiceStatusClass(tx.status)}`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Claims */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Pending Expense Claims</h2>
          <div className="mt-4 space-y-3">
            {pendingClaims.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{claim.employee}</p>
                  <p className="text-xs text-slate-500">{claim.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">₹{claim.amount}</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="rounded-lg bg-emerald-100 p-2 text-emerald-600 hover:bg-emerald-200">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200">
                      <AlertCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Row 3 */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* Upcoming Salary Processing */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming Salary Processing</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-left font-semibold text-slate-700">Department</th>
                  <th className="pb-3 text-left font-semibold text-slate-700">Employees</th>
                  <th className="pb-3 text-left font-semibold text-slate-700">Date</th>
                  <th className="pb-3 text-left font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingSalaryProcessing.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-200">
                    <td className="py-3 font-medium text-slate-900">{item.department}</td>
                    <td className="py-3 text-slate-700">{item.employees}</td>
                    <td className="py-3 text-slate-700">{item.date}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getSalaryProcessingStatusClass(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Status */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Invoice Status</h2>
          <div className="mt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={invoiceStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {invoiceStatusData.map((item) => (
              <div key={item.name} className="text-center">
                <p className="text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="text-xs text-slate-500">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Row 4 */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* Department-wise Payroll */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Department-wise Payroll</h2>
          <div className="mt-6 space-y-5">
            {departmentPayroll.map((dept, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900">{dept.name}</p>
                  <p className="text-sm font-semibold text-slate-700">₹{(dept.amount / 100000).toFixed(1)}L</p>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                      className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Recent Activities</h2>
          <div className="mt-6 space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`rounded-full p-2 ${
                      activity.type === 'success'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {activity.type === 'success' ? (
                      <CheckCheck className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  {idx < recentActivities.length - 1 && <div className="h-8 w-0.5 bg-slate-200 my-1" />}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-semibold text-slate-900">{activity.activity}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Row 5 */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* Quick Actions */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {quickActions.map((action, idx) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={idx}
                  className={`rounded-xl bg-linear-to-br ${action.color} p-4 text-white transition hover:shadow-lg hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 text-center`}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-xs font-semibold">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Upcoming Deadlines</h2>
          <div className="mt-6 space-y-3">
            {upcomingDeadlines.map((deadline, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div className="flex items-center gap-3">
                  <Calendar className={`h-5 w-5 ${deadline.color}`} />
                  <div>
                    <p className="font-medium text-slate-900">{deadline.task}</p>
                    <p className="text-xs text-slate-500">{deadline.date}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    deadline.priority === 'High'
                      ? 'bg-red-100 text-red-700'
                      : deadline.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}
                >
                  {deadline.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Summary & Charts Row 6 */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* Finance Summary */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Finance Summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <p className="text-slate-600">Revenue</p>
              <p className="text-2xl font-bold text-slate-950">₹15,40,000</p>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <p className="text-slate-600">Expenses</p>
              <p className="text-2xl font-bold text-slate-950">₹4,80,000</p>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <p className="text-slate-600">Profit</p>
              <p className="text-2xl font-bold text-emerald-600">₹10,60,000</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-600">Net Margin</p>
              <p className="text-2xl font-bold text-blue-600">68%</p>
            </div>
          </div>
        </div>

        {/* Salary Status */}
        <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
          <h2 className="text-lg font-semibold text-slate-900">Salary Status</h2>
          <div className="mt-6 space-y-6">
            {salaryStatusData.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm font-semibold text-slate-700">{item.value}%</p>
                </div>
                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 bg-linear-to-r ${
                      item.name === SALARY_OVERVIEW_PROCESSED_STATUS
                        ? 'from-emerald-500 to-emerald-600'
                        : item.name === SALARY_OVERVIEW_PENDING_STATUS
                          ? 'from-yellow-500 to-yellow-600'
                          : 'from-red-500 to-red-600'
                    }`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Salary Distribution */}
      <section className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.02]">
        <h2 className="text-lg font-semibold text-slate-900">Employee Salary Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={employeeSalaryDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="department" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip formatter={(value) => formatTooltipValue(value, 100000, 'L')} />
            <Bar dataKey="salary" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}