import SignupForm from '../components/auth/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <SignupForm />
      <p className="mt-4">
        Already have an account? <Link href="/login" className="text-blue-600 underline">Log in</Link>
      </p>
    </div>
  );
}