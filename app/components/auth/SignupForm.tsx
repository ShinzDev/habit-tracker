'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const users = storage.getUsers();
    
    // Check for duplicate email
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      setError('User already exists'); // Exact message required by TRD
      return;
    }

    // Create new user
    const newUser = {
      id: crypto.randomUUID(), // Generates a unique string ID
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    // Save user to our "database"
    storage.saveUsers([...users, newUser]);

    // Create active session
    storage.saveSession({ userId: newUser.id, email: newUser.email }); //

    // Redirect to dashboard
   window.location.href = '/dashboard'; //
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="flex flex-col gap-1">
        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid="auth-signup-email" //
          className="border p-2 rounded text-black"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="auth-signup-password" //
          className="border p-2 rounded text-black"
        />
      </div>

      <button
        type="submit"
        data-testid="auth-signup-submit" //
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Create Account
      </button>
    </form>
  );
}