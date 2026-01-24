'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CenterTemplate } from '@/components/templates/CenterTemplate';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { Input } from '@/components/atoms/Input';
import { BackButton } from '@/components/atoms/BackButton';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <CenterTemplate>
      <BackButton />
      <div className="glass-card w-full max-w-md mx-auto p-6 sm:p-12 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-6 sm:mb-10 space-y-2">
          <Typography variant="h2">Reset Password</Typography>
          <Typography variant="body">
            {submitted 
              ? "Check your inbox for instructions" 
              : "Enter your email to receive a reset link"
            }
          </Typography>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              name="email"
              label="Email" 
              type="email" 
              placeholder="hero@dailyquest.app"
              required 
            />

            <Button variant="primary" size="lg" className="w-full shadow-xl shadow-purple-500/20 mt-4" disabled={loading}>
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
             <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                <Typography variant="body" className="text-green-600 dark:text-green-400">
                  We have sent a password reset link to your email address.
                </Typography>
             </div>
             <Button 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={() => router.push('/login')}
             >
                Back to Login
             </Button>
          </div>
        )}

        {!submitted && (
            <div className="mt-8 text-center">
            <button 
                onClick={() => router.push('/login')}
                className="text-sm text-gray-500 hover:text-foreground transition-colors flex items-center justify-center mx-auto gap-2"
            >
                ← Back to Login
            </button>
            </div>
        )}
      </div>
    </CenterTemplate>
  );
}
