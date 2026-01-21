'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button } from '../atoms/Button';
import { StepContent } from '../atoms/StepContent';
import { COLORS } from '@/assets/colors';

const STEPS = [
  {
    title: "Start Your Quest",
    description: "Turn your daily tasks into an adventure. Simple, focused, and rewarding.",
    image: <div className="text-6xl">⚔️</div> // Placeholder
  },
  {
    title: "Focus on What Matters",
    description: "A minimalist interface designed to remove distractions and help you achieve flow.",
    image: <div className="text-6xl">🎯</div>
  },
  {
    title: "Track Your Journey",
    description: "Build streaks and review your history. See how far you've come.",
    image: <div className="text-6xl">🗺️</div>
  }
];

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      localStorage.setItem('daily-quest-onboarding-completed', 'true');
      router.push('/login');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  useGSAP(() => {
    // Animate indicators
    indicatorsRef.current.forEach((el, index) => {
      if (!el) return;
      
      const isActive = index === currentStep;
      
      gsap.to(el, {
        width: isActive ? 32 : 8,
        backgroundColor: isActive ? 'var(--foreground)' : COLORS.gray200,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });

    // Subtle attention grabber for the button after delay
    if (buttonRef.current) {
      gsap.killTweensOf(buttonRef.current);
      gsap.to(buttonRef.current, { scale: 1, opacity: 1, duration: 0.3 }); // reset
      
      const pulseAnim = gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        paused: true,
        delay: 3
      });
      
      pulseAnim.restart(true); // restart with delay
    }

  }, { scope: container, dependencies: [currentStep] });

  const step = STEPS[currentStep];

  return (
    <div ref={container} className="glass-card rounded-3xl flex flex-col items-center justify-between min-h-[60vh] w-full p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Progress Indicators */}
      <div className="flex space-x-2 mb-12">
        {STEPS.map((_, index) => (
          <div 
            key={index}
            ref={el => { indicatorsRef.current[index] = el }}
            className="h-1 rounded-full bg-gray-200 dark:bg-gray-800"
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center w-full" key={currentStep}>
        <StepContent 
          title={step.title}
          description={step.description}
          image={step.image}
        />
      </div>

      {/* Navigation */}
      <div className="w-full flex flex-col items-center space-y-4 mt-12">
        <div ref={buttonRef}>
            <Button onClick={handleNext} size="lg" className="w-full sm:w-auto min-w-[200px] shadow-xl shadow-purple-500/20">
                {currentStep === STEPS.length - 1 ? 'Get Started' : 'Continue'}
            </Button>
        </div>
        
        {currentStep > 0 && (
            <Button 
                variant="ghost" 
                onClick={handleBack}
                className="text-sm min-w-[100px]"
            >
                Back
            </Button>
        )}
      </div>
    </div>
  );
};
