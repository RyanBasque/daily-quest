'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CenterTemplate } from '@/components/templates/CenterTemplate';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Input } from '@/components/atoms/Input';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Using credentials provider (wired but might not work fully without registered user)
    const result = await signIn('credentials', {
      redirect: false,
      email: (e.target as any).email.value,
      password: (e.target as any).password.value,
    });

    if (result?.ok) {
      router.push('/dashboard');
    } else {
      setLoading(false);
      // Handle error (show toast/alert)
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <CenterTemplate>
      <div className="glass-card w-full max-w-md mx-auto p-6 sm:p-12 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-6 sm:mb-10 space-y-2">
          <Typography variant="h2">Welcome Back</Typography>
          <Typography variant="body">Continue your quest</Typography>
        </div>

        <div className="flex gap-4 mb-6 sm:mb-8">
           <button 
             onClick={() => handleSocialLogin('google')}
             className="flex-1 flex items-center justify-center gap-2 h-12 bg-white text-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm"
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
             onClick={() => handleSocialLogin('apple')}
             className="flex-1 flex items-center justify-center gap-2 h-12 bg-white text-gray-700 dark:bg-zinc-800 dark:text-white rounded-xl border border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm"
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

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <Input 
            name="email"
            label="Email" 
            type="email" 
            placeholder="hero@dailyquest.app"
            required 
          />
          
          <div className="space-y-2">
            <Input 
              name="password"
              label="Password" 
              type="password" 
              placeholder="••••••••"
              required 
            />
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => router.push('/forgot-password')}
                className="text-xs text-gray-500 hover:text-foreground transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <Button variant="primary" size="lg" className="w-full shadow-xl shadow-purple-500/20 mt-4" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Typography variant="caption">
            Don't have an account?{' '}
            <button className="text-foreground font-medium hover:underline">
              Sign Up
            </button>
          </Typography>
        </div>
      </div>
    </CenterTemplate>
  );
}
