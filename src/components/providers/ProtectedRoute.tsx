'use client';

import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading } = useAuth(true); // requireAuth = true

  if (loading) {
    return (
      <div className="min-h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Checking authentication...</p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
