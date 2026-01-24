'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import type { User } from '@/types/api';

export function useAuth(requireAuth: boolean = false) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = authService.getToken();
        
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          
          if (requireAuth) {
            router.push('/login');
          }
          return;
        }

        // Busca perfil do usuário usando o token
        const profile = await authService.getProfile();
        setUser(profile);
        setIsAuthenticated(true);
      } catch (error) {
        // Token inválido ou expirado
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        
        if (requireAuth) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, router]);

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return {
    user,
    loading,
    isAuthenticated,
    logout,
  };
}
