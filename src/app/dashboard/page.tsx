'use client';

import { CenterTemplate } from '@/components/templates/CenterTemplate';
import { Typography } from '@/components/atoms/Typography';
import { BackButton } from '@/components/atoms/BackButton';
import { ProtectedRoute } from '@/components/providers/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/atoms/Button';
import { motion } from 'framer-motion';

function DashboardContent() {
  const { user, logout } = useAuth(true);

  return (
    <CenterTemplate>
      <BackButton />
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-2">
          <Typography variant="h1">Welcome, {user?.name}! 👋</Typography>
          <Typography variant="body">Your journey begins here.</Typography>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-4 max-w-md mx-auto">
          <Typography variant="h2">Today&apos;s Quests</Typography>
          <Typography variant="body" className="text-gray-500">
            No quests active yet. Start your adventure!
          </Typography>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={logout}
          className="mt-8"
        >
          Logout
        </Button>
      </motion.div>
    </CenterTemplate>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
