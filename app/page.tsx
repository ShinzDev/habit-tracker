'use client'; // Required because we are using useRouter and localStorage

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from './components/shared/SplashScreen';
import { storage } from '@/lib/storage';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Target duration: between 800ms and 2000ms
    const timer = setTimeout(() => {
      const session = storage.getSession();
      
      if (session) {
       window.location.href = '/dashboard';
      } else {
        window.location.href = '/login';
      }
    }, 1200); // 1.2 seconds is a safe, testable middle ground

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />; //
}