'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SessionDetails() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome, {session?.user?.name || 'User'}!
      </h1>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{session?.user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-gray-900">{session?.user?.name}</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Session Details</h2>
          <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 