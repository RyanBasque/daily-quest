'use client';

import { useEffect } from 'react';
import { initializeCapacitor } from '@/lib/capacitor';

/**
 * Provider para inicializar Capacitor e configurações nativas
 * Coloque no layout root
 */
export function CapacitorProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializar Capacitor quando o app carrega
    initializeCapacitor();
  }, []);

  return <>{children}</>;
}
