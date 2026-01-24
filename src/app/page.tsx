'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CenterTemplate } from '@/components/templates/CenterTemplate';
import { OnboardingFlow } from '@/components/organisms/OnboardingFlow';
import { BackButton } from '@/components/atoms/BackButton';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('daily-quest-onboarding-completed');
    
    // if (hasCompletedOnboarding === 'true') {
    //   router.replace('/dashboard');
    // } else {
      setIsChecking(false);
    // }
  }, [router]);

  if (isChecking) {
    return null;
  }

  return (
    <CenterTemplate>
      <OnboardingFlow />
    </CenterTemplate>
  );
}
