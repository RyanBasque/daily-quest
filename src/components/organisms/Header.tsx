'use client';

import React, { useEffect, useState } from 'react';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { useRouter, usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const hiddenRoutes = ['/login', '/forgot-password'];
  const shouldHideHeader = hiddenRoutes.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (shouldHideHeader) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 ease-in-out safe-top safe-x ${
        scrolled 
          ? 'py-3 bg-white/60 dark:bg-black/80 backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo Area */}
        <div 
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-foreground text-background flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
            Q
          </div>
          <span className="font-semibold text-lg tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
            DailyQuest
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
