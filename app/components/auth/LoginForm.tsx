'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const users = storage.getUsers();
    
    // Find matching user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      setError('Invalid email or password'); // Exact message required by TRD
      return;
    }

    // Create active session
    storage.saveSession({ userId: user.id, email: user.email }); //

    // Redirect to dashboard
    window.location.href = '/dashboard'; //
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="flex flex-col gap-1">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="auth-login-email" //
          className="border p-2 rounded text-black"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="auth-login-password" //
          className="border p-2 rounded text-black"
        />
      </div>

      <button
        type="submit"
        data-testid="auth-login-submit" //
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
      >
        Sign In
      </button>
    </form>
  );
}