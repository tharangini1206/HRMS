import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">HRMS Portal</div>
        <div className="flex gap-4">
          <a href="#profile" className="text-gray-600 hover:text-gray-900">Profile</a>
          <a href="#settings" className="text-gray-600 hover:text-gray-900">Settings</a>
          <a href="#logout" className="text-gray-600 hover:text-gray-900">Logout</a>
        </div>
      </div>
    </nav>
  );
};
