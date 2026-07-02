import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-6">HRMS</h2>
      <nav className="space-y-4">
        <a href="/employee" className="block hover:text-blue-400">Employee</a>
        <a href="/hr" className="block hover:text-blue-400">HR</a>
        <a href="/manager" className="block hover:text-blue-400">Manager</a>
        <a href="/finance" className="block hover:text-blue-400">Finance</a>
        <a href="/super-admin" className="block hover:text-blue-400">Super Admin</a>
      </nav>
    </aside>
  );
};
