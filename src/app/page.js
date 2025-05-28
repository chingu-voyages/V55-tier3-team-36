'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          {session
            ? `🌟 Welcome, ${session.user.name}`
            : '🌟 Welcome to your Tailwind App'}
        </h1>
        <p className="text-lg">
          {session
            ? 'You are logged in!'
            : 'Tailwind is working, and your fonts are styled with Geist!'}
        </p>
        <button
          onClick={() => (session ? signOut() : signIn())}
          className="px-4 py-2 mt-4 bg-white text-indigo-600 font-semibold rounded shadow"
        >
          {session ? 'Sign out' : 'Sign in with Google'}
        </button>
      </div>
    </main>
  );
}


