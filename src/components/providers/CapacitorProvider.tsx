'use client';

import { useEffect } from 'react';
import { initializeCapacitor } from '@/lib/capacitor';
import { useTheme } from '@/context/ThemeContext';

export function CapacitorProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    initializeCapacitor();
  }, []);

  useEffect(() => {
    const updateStatusBar = async () => {
      try {
        const { StatusBar, Style } = await import('@capacitor/status-bar');
        
        await StatusBar.setStyle({ style: Style.Default });
        await StatusBar.setBackgroundColor({ color: '#00000000' });
        
      } catch (error) {}
    };

    updateStatusBar();
  }, [theme]);

  return <>{children}</>;
}
