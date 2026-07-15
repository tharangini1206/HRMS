'use client';

import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Download, Plus, Eye, Edit2, Trash2, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react';

import type { ExpenseStatus } from '@/types/finance';
import { EXPENSE_STATUSES } from '@/types/finance';

const [APPROVED_STATUS, PENDING_STATUS, REJECTED_STATUS] = EXPENSE_STATUSES;

type ExpenseFilterStatus = 'All Status' | ExpenseStatus;

interface ExpenseItem {
  id: string;
  employee: string;
  department: string;
  category: string;
  amount: number;
  date: string;
  status: ExpenseStatus;
  receipt: boolean;
  description: string;
}

const initialExpensesData: ExpenseItem[] = [
  {
    id: 'EXP-1001',
    employee: 'Alex Johnson',
    department: 'IT',
    category: 'Travel',
    amount: 2500,
    date: '10 Jul 2026',
    status: APPROVED_STATUS,
    receipt: true,
    description: 'Business trip to Bangalore',
  },
  {
    id: 'EXP-1002',
    employee: 'David Smith',
    department: 'HR',
    category: 'Food',
    amount: 800,
    date: '09 Jul 2026',
    status: PENDING_STATUS,
    receipt: true,
    description: 'Team lunch meeting',
  },
  {
    id: 'EXP-1003',
    employee: 'Sarah Wilson',
    department: 'Finance',
    category: 'Accommodation',
    amount: 5000,
    date: '08 Jul 2026',
    status: APPROVED_STATUS,
    receipt: true,
    description: 'Hotel stay for conference',
  },
  {
    id: 'EXP-1004',
    employee: 'John Davis',
    department: 'Sales',
    category: 'Travel',
    amount: 1200,
    date: '07 Jul 2026',
    status: REJECTED_STATUS,
    receipt: false,
    description: 'Taxi reimbursement',
  },
];

const categoryData = [
  { name: 'Travel', value: 45 },
  { name: 'Food', value: 20 },
  { name: 'Accommodation', value: 18 },
  { name: 'Office Supplies', value: 10 },
  { name: 'Training', value: 5 },
  { name: 'Medical', value: 2 },
];

const monthlyData = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 61500 },
];

const departmentExpenses = [
  { department: 'Sales', amount: 850000 },
  { department: 'IT', amount: 450000 },
  { department: 'HR', amount: 320000 },
  { department: 'Finance', amount: 280000 },
  { department: 'Marketing', amount: 165000 },
];

export default function Expenses() {
  const [expensesData, setExpensesData] = useState<ExpenseItem[]>(initialExpensesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState<ExpenseFilterStatus>('All Status');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return expensesData.filter((item) => {
      if (searchTerm && !item.employee.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'All Status' && item.status !== selectedStatus) {
        return false;
      }
      if (selectedDept !== 'All Departments' && item.department !== selectedDept) {
        return false;
      }
      return true;
    });
  }, [expensesData, searchTerm, selectedCategory, selectedStatus, selectedDept]);

  // Memoized KPI calculations
  const kpiMetrics = useMemo(() => {
    const totalExpenses = expensesData.reduce((sum, item) => sum + item.amount, 0);
    const approved = expensesData.filter((item) => item.status === APPROVED_STATUS).length;
    const pending = expensesData.filter((item) => item.status === PENDING_STATUS).length;
    const rejected = expensesData.filter((item) => item.status === REJECTED_STATUS).length;

    return { totalExpenses, approved, pending, rejected };
  }, [expensesData]);

  // Memoized category expenses calculation
  const categoryExpensesCalculated = useMemo(() => {
    const categoryMap = new Map<string, number>();
    expensesData.forEach((item) => {
      categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + item.amount);
    });

    const total = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);
    return Array.from(categoryMap.entries())
      .map(([name, amount]) => ({
        name,
        value: total > 0 ? Math.round((amount / total) * 100) : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [expensesData]);

  // Memoized recent activity
  const recentActivity = useMemo(() => {
    return expensesData
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4)
      .map((item, index) => ({
        id: index,
        action: `Status: ${item.status}`,
        employee: item.employee,
        detail: `${item.category} claim ₹${item.amount.toLocaleString()}`,
        time: item.date,
      }));
  }, [expensesData]);

  // Memoized department expenses calculation
  const departmentExpensesCalculated = useMemo(() => {
    const deptMap = new Map<string, number>();
    expensesData.forEach((item) => {
      deptMap.set(item.department, (deptMap.get(item.department) || 0) + item.amount);
    });
    return Array.from(deptMap.entries())
      .map(([department, amount]) => ({ department, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [expensesData]);

  // Update single expense status
  const updateExpenseStatus = (expenseId: string, newStatus: ExpenseStatus) => {
    setExpensesData((prevData) =>
      prevData.map((item) => (item.id === expenseId ? { ...item, status: newStatus } : item))
    );
  };

  const statusStyleMap: Record<ExpenseStatus, string> = {
    [APPROVED_STATUS]: 'bg-emerald-100 text-emerald-700',
    [PENDING_STATUS]: 'bg-amber-100 text-amber-700',
    [REJECTED_STATUS]: 'bg-red-100 text-red-700',
  };

  const statusIconMap: Record<ExpenseStatus, ReactNode> = {
    [APPROVED_STATUS]: <CheckCircle2 className="h-4 w-4" />,
    [PENDING_STATUS]: <Clock className="h-4 w-4" />,
    [REJECTED_STATUS]: <XCircle className="h-4 w-4" />,
  };

  const getStatusColor = (status: ExpenseStatus) => statusStyleMap[status] ?? 'bg-slate-100 text-slate-700';

  const getStatusIcon = (status: ExpenseStatus) => statusIconMap[status] ?? null;

  // Approve selected expenses
  const handleApproveSelected = () => {
    if (selectedRows.size === 0) {
      alert('Please select expenses to approve');
      return;
    }

    setExpensesData((prevData) =>
      prevData.map((item) => (selectedRows.has(item.id) ? { ...item, status: APPROVED_STATUS } : item))
    );

    setSelectedRows(new Set());
    alert(`${selectedRows.size} expense(s) approved successfully!`);
  };

  // Reject selected expenses
  const handleRejectSelected = () => {
    if (selectedRows.size === 0) {
      alert('Please select expenses to reject');
      return;
    }

    setExpensesData((prevData) =>
      prevData.map((item) => (selectedRows.has(item.id) ? { ...item, status: REJECTED_STATUS } : item))
    );

    setSelectedRows(new Set());
    alert(`${selectedRows.size} expense(s) rejected successfully!`);
  };

  // Delete expense
  const handleDelete = (expenseId: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpensesData((prevData) => prevData.filter((item) => item.id !== expenseId));
      setSelectedRows((prev) => {
        const updated = new Set(prev);
        updated.delete(expenseId);
        return updated;
      });
      alert('Expense deleted successfully!');
    }
  };

  // Toggle row selection
  const toggleRowSelection = (expenseId: string) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(expenseId)) {
        updated.delete(expenseId);
      } else {
        updated.add(expenseId);
      }
      return updated;
    });
  };

  // Select all visible rows
  const toggleSelectAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map((item) => item.id)));
    }
  };

  const handleAddExpense = () => {
    alert('Open Add Expense Modal');
  };

  const handleViewDetails = (expenseId: string) => {
    alert(`View details for ${expenseId}`);
  };

  const handleEdit = (expenseId: string) => {
    alert(`Edit expense ${expenseId}`);
  };

  const handleExport = () => {
    alert('Export to Excel/PDF');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Expenses</p>
        <h1 className="text-4xl font-bold text-slate-950">Expense Claims</h1>
        <p className="text-sm text-slate-600">Manage and monitor employee expense claims and reimbursements.</p>
      </div>

      {/* KPI Cards - Dynamic */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Total Expenses</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">₹{(kpiMetrics.totalExpenses / 100000).toFixed(2)}L</p>
              <p className="mt-2 text-xs text-emerald-600">+8% from last month</p>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Approved</p>
              <p className="mt-2 text-3xl font-bold text-emerald-600">{kpiMetrics.approved}</p>
              <p className="mt-2 text-xs text-slate-500">Reimbursement ready</p>
            </div>
            <div className="rounded-2xl bg-emerald-100 p-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Pending</p>
              <p className="mt-2 text-3xl font-bold text-amber-600">{kpiMetrics.pending}</p>
              <p className="mt-2 text-xs text-slate-500">Awaiting approval</p>
            </div>
            <div className="rounded-2xl bg-amber-100 p-3">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Rejected</p>
              <p className="mt-2 text-3xl font-bold text-red-600">{kpiMetrics.rejected}</p>
              <p className="mt-2 text-xs text-slate-500">Need revision</p>
            </div>
            <div className="rounded-2xl bg-red-100 p-3">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">Filters & Search</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <input
              type="text"
              placeholder="Search expense..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
              <option>All Categories</option>
              <option>Travel</option>
              <option>Food</option>
              <option>Accommodation</option>
              <option>Office Supplies</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ExpenseFilterStatus)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
              <option>All Status</option>
              {EXPENSE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition hover:border-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            >
              <option>All Departments</option>
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Sales</option>
            </select>

            <button
              onClick={handleExport}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          onClick={handleAddExpense}
          className="rounded-2xl bg-linear-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/10 hover:brightness-110 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Expense
        </button>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <button
            onClick={handleApproveSelected}
            className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
          >
            Approve Selected
          </button>
          <button
            onClick={handleRejectSelected}
            className="rounded-2xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-100"
          >
            Reject Selected
          </button>
        </div>
      </div>

      {/* Expense Table - Dynamic with Selection */}
      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 font-semibold text-slate-900">Expense ID</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Employee</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Department</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Category</th>
                <th className="px-6 py-4 font-semibold text-right text-slate-900">Amount</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 font-semibold text-center text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((item) => (
                <tr key={item.id} className={`transition-colors ${selectedRows.has(item.id) ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => toggleRowSelection(item.id)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 font-mono text-sm font-semibold text-slate-950">{item.id}</td>
                  <td className="px-6 py-4 text-slate-900">{item.employee}</td>
                  <td className="px-6 py-4 text-slate-600">{item.department}</td>
                  <td className="px-6 py-4 text-slate-600">{item.category}</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-900">₹{item.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {item.status === PENDING_STATUS && (
                        <>
                          <button
                            onClick={() => {
                              updateExpenseStatus(item.id, APPROVED_STATUS);
                              alert(`${item.id} approved!`);
                            }}
                            className="inline-flex h-9 px-2 items-center justify-center rounded-lg border border-emerald-200 text-emerald-600 text-xs font-medium transition hover:bg-emerald-50"
                            title="Approve"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              updateExpenseStatus(item.id, REJECTED_STATUS);
                              alert(`${item.id} rejected!`);
                            }}
                            className="inline-flex h-9 px-2 items-center justify-center rounded-lg border border-red-200 text-red-600 text-xs font-medium transition hover:bg-red-50"
                            title="Reject"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleViewDetails(item.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            <p>No expenses found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Analytics & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Expenses by Category - Dynamic */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Expenses by Category</h3>
          <div className="space-y-4">
            {categoryExpensesCalculated.length > 0 ? (
              categoryExpensesCalculated.map((category, index) => (
                <div key={category.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">{category.name}</span>
                    <span className="text-sm font-semibold text-slate-900">{category.value}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-300"
                      style={{ width: `${category.value}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No category data available</p>
            )}
          </div>
        </div>

        {/* Recent Activity - Dynamic */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
          <h3 className="text-sm font-semibold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="border-l-2 border-slate-200 pl-4 py-2">
                  <p className="text-sm font-semibold text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-600 mt-1">{activity.employee}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.detail} • {activity.time}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No activity yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Department Expenses - Dynamic */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.06)]">
        <h3 className="text-sm font-semibold text-slate-900 mb-6">Top Departments by Expenses</h3>
        <div className="space-y-4">
          {departmentExpensesCalculated.length > 0 ? (
            departmentExpensesCalculated.map((dept) => {
              const maxAmount = Math.max(...departmentExpensesCalculated.map((d) => d.amount));
              return (
                <div key={dept.department} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">{dept.department}</span>
                      <span className="text-sm font-semibold text-slate-950">₹{(dept.amount / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-amber-500 to-amber-600 transition-all duration-300"
                        style={{ width: `${(dept.amount / maxAmount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-500">No department data available</p>
          )}
        </div>
      </div>
    </div>
  );
}