'use client';

import React, { useEffect } from 'react';

interface MSWProviderProps {
  children: React.ReactNode;
}

export const MSWProvider: React.FC<MSWProviderProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // MSW initialization will go here
    }
  }, []);

  return <>{children}</>;
};
