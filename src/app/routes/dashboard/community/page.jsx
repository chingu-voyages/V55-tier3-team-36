"use client";

import NavBar from "@/components/NavBar";
import LeaderboardCard from "@/components/LeaderboardCard";
import { useSession } from "next-auth/react";
import StreakStats from "@/components/StreakStats";

const dummyData = {
  currentStreak: [
    { name: "John D.", score: 28, avatar: "/avatars/john.png" },
    { name: "You", score: 24, isUser: true },
    { name: "Susan W.", score: 14 },
    { name: "Kate H.", score: 14 },
    { name: "Michael P.", score: 14 },
  ],
  bestStreak: [
    { name: "John D.", score: 28, avatar: "/avatars/john.png" },
    { name: "You", score: 24, isUser: true },
    { name: "Kate H.", score: 20 },
    { name: "Susan W.", score: 14 },
    { name: "Michael P.", score: 14 },
  ],
  completion: [
    { name: "John D.", score: "80%" },
    { name: "You", score: "75%", isUser: true },
    { name: "Kate H.", score: "70%" },
    { name: "Susan W.", score: "68%" },
    { name: "Michael P.", score: "67%" },
  ],
};

export default function CommunityPage() {
  const { data: session } = useSession();
  return (
    <div className="flex min-h-screen bg-blue-50">
      <main className="flex-1 p-10 bg-gray-50">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome back, {session?.user?.name || "Jane"}!
          </h1>
          <StreakStats />
        </div> */}

        <div className="grid grid-cols-12 gap-4 items-start">
          {/* Sidebar Nav */}
          {/* <div className="col-span-3">
            <NavBar />
          </div> */}

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            {/* Leaderboard Section */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-semibold text-gray-700 mb-6">
                See how you compare to our community
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <LeaderboardCard
                  title="Current Streak"
                  data={dummyData.currentStreak}
                />
                <LeaderboardCard
                  title="Best Streak"
                  data={dummyData.bestStreak}
                />
                <LeaderboardCard
                  title="Overall Completion"
                  data={dummyData.completion}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
