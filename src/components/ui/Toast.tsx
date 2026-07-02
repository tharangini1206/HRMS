import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info' }) => {
  const types = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white ${types[type]} shadow-lg`}>
      {message}
    </div>
  );
};
