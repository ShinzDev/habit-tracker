'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // We go back to our single state approach
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Define an async function inside the effect
    const checkAuth = async () => {
      const session = storage.getSession();
      
      if (!session) {
        window.location.href = '/login';
      } else {
        setIsAuthorized(true);
      }
    };

    // 2. Call it
    checkAuth();
  }, [router]);

  // 3. Prevent rendering the dashboard until we verify the session
  if (!isAuthorized) {
    return null; 
  }

  return <>{children}</>;
}