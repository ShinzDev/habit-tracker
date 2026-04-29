import LoginForm from '../components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <LoginForm />
      <p className="mt-4">
        Dont have an account? <Link href="/signup" className="text-blue-600 underline">Sign up</Link>
      </p>
    </div>
  );
}