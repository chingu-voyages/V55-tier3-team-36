'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import SessionDetails from '@/components/SessionDetails';
import NavBar from '@/components/NavBar';
import WeeklyProgress from '@/components/WeeklyProgess';
import Calendar from '@/components/Calendar';

export default function DashboardPage() {
  const [showSessionDetails, setShowSessionDetails] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome back, {session?.user?.name || 'User'}!
        </h1>
        <button
          onClick={() => setShowSessionDetails(!showSessionDetails)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {showSessionDetails ? 'Hide Session Details' : 'Show Session Details'}
        </button>
      </div>

      {showSessionDetails && (
        <div className="mb-8">
          <SessionDetails />
        </div>
      )}

      {/* Three Column Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Column 1: NavBar */}
        <div className="col-span-2 rounded-lg p-4 max-w-xs min-w-[180px]">
          <NavBar />
        </div>

        {/* Column 2: Overview and Weekly Progress */}
        <div className="col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-gray-700 mb-2">Overview</h2>
            <p className="mb-2">Exercise</p>
            <p className="mb-2">Take medicine</p>
            <p>Read more</p>
          </div>
          <WeeklyProgress />
        </div>

        {/* Column 3: Calendar and Leaderboard */}
        <div className="col-span-4 space-y-6">
          <Calendar />
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-md font-semibold mb-2">Overall Ranking</h2>
            <ol className="text-sm space-y-1">
              <li>🥇 Me — 28</li>
              <li>🥈 John Smith — 24</li>
              <li>🥉 Jane Doe — 20</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
