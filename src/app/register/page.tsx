'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CenterTemplate } from '@/components/templates/CenterTemplate';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Input } from '@/components/atoms/Input';
import { BackButton } from '@/components/atoms/BackButton';
import { motion } from 'framer-motion';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (authService.isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não correspondem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Primeiro registra o usuário
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Depois faz login automaticamente
      const loginResult = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      console.log('Registration and login successful:', loginResult.user);
      
      // Redireciona para o dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider: 'google' | 'apple') => {
    toast.info(`${provider} sign up`, {
      description: 'OAuth integration coming soon!'
    });
  };

  const handleNextStep = () => {
    setError(null); // Limpa o erro ao avançar
    if (step === 1 && formData.name.trim()) {
      setStep(2);
    } else if (step === 2 && formData.email.trim()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setError(null); // Limpa o erro ao voltar
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <CenterTemplate>
      <BackButton onClick={step > 1 ? handlePrevStep : undefined} />
      
      <div className="glass-card w-full max-w-md mx-auto p-6 sm:p-12 rounded-3xl">
        {/* Header com animação */}
        <motion.div 
          className="text-center mb-6 sm:mb-10 space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2">Create Account</Typography>
          <Typography variant="body">Begin your quest today</Typography>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={step >= 1 ? 'text-purple-500 font-medium' : ''}>Name</span>
            <span className={step >= 2 ? 'text-purple-500 font-medium' : ''}>Email</span>
            <span className={step >= 3 ? 'text-purple-500 font-medium' : ''}>Password</span>
          </div>
        </motion.div>

        {/* Social Login Buttons */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-4 mb-6 sm:mb-8">
              <button 
                onClick={() => handleSocialRegister('google')}
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-white text-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="font-medium text-sm">Google</span>
              </button>
              <button 
                onClick={() => handleSocialRegister('apple')}
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-white text-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
                </svg>
                <span className="font-medium text-sm">Apple</span>
              </button>
            </div>

            <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
              <div className="border-t border-gray-300 dark:border-zinc-700 w-full" />
              <div className="px-3 text-xs uppercase text-gray-500 font-medium whitespace-nowrap">
                Or continue with
              </div>
              <div className="border-t border-gray-300 dark:border-zinc-700 w-full" />
            </div>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4 sm:space-y-6">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            >
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Step 1: Name */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Input 
                name="name"
                label="Full Name" 
                type="text" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required 
                autoFocus
              />
              <Button 
                type="button"
                variant="primary" 
                size="lg" 
                className="w-full shadow-xl shadow-purple-500/20 mt-4"
                onClick={handleNextStep}
                disabled={!formData.name.trim()}
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 2: Email */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Input 
                name="email"
                label="Email" 
                type="email" 
                placeholder="hero@dailyquest.app"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required 
                autoFocus
              />
              <Button 
                type="button"
                variant="primary" 
                size="lg" 
                className="w-full shadow-xl shadow-purple-500/20 mt-4"
                onClick={handleNextStep}
                disabled={!formData.email.trim()}
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <Input 
                name="password"
                label="Password" 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required 
                autoFocus
              />
              
              <Input 
                name="confirmPassword"
                label="Confirm Password" 
                type="password" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required 
              />

              <Button 
                type="submit"
                variant="primary" 
                size="lg" 
                className="w-full shadow-xl shadow-purple-500/20 mt-4" 
                disabled={loading || !formData.password || !formData.confirmPassword}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </motion.div>
          )}
        </form>

        {/* Footer */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Typography variant="caption">
            Already have an account?{' '}
            <button 
              onClick={() => router.push('/login')}
              className="text-foreground font-medium hover:underline"
            >
              Log In
            </button>
          </Typography>
        </motion.div>
      </div>
    </CenterTemplate>
  );
}
