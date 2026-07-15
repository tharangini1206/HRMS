'use client';

import React, { useEffect } from 'react';

interface MSWProviderProps {
  children: React.ReactNode;
}

export const MSWProvider: React.FC<MSWProviderProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@/mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest(request) {
            const pathname = new URL(request.url).pathname;

            // Ignore Next.js pages and assets
            if (
              pathname.startsWith('/finance') ||
              pathname.startsWith('/dashboard') ||
              pathname.startsWith('/_next') ||
              pathname.startsWith('/favicon.ico') ||
              pathname.includes('.woff2') ||
              pathname.includes('.woff') ||
              pathname.includes('.ttf')
            ) {
              return;
            }

            // Log only unhandled API requests
            if (pathname.startsWith('/api')) {
              console.warn(`[MSW] Unhandled API request: ${pathname}`);
            }
          },
        });
      });
    }
  }, []);

  return <>{children}</>;
};
