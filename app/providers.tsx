'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';
import ConfettiEffect from '@/components/ConfettiEffect';

function AuthWrapper({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session && !hasShownConfetti) {
      setShowConfetti(true);
      setHasShownConfetti(true);
      
      // Hide confetti after animation
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3500);
      
      return () => clearTimeout(timer);
    }
  }, [status, session, hasShownConfetti]);

  return (
    <>
      {showConfetti && <ConfettiEffect />}
      {children}
    </>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </SessionProvider>
  );
}
