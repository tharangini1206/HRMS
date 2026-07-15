'use client';

import React, { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SidebarContext.Provider value={{ isHovered, setIsHovered }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};
