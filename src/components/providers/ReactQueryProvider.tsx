'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
