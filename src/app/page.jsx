"use client";

import NavBar from "@/components/NavBar";
import WeeklyProgress from "@/components/WeeklyProgess";
import Calendar from "@/components/Calendar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome back, {session.user.name}!
        </h1>
        <div className="flex gap-8 text-right text-blue-900 font-medium">
          <div>
            <p className="text-lg">28</p>
            <p className="text-sm text-gray-500">Current Streak</p>
          </div>
          <div>
            <p className="text-lg">28</p>
            <p className="text-sm text-gray-500">Best Streak</p>
          </div>
          <div>
            <p className="text-lg">75%</p>
            <p className="text-sm text-gray-500">Completion Rate</p>
          </div>
        </div>
      </div>

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
