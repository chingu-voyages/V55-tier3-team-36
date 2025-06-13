"use client";

import { useSession } from "next-auth/react";
import NavBar from "@/components/NavBar";
import WeeklyProgress from "@/components/WeeklyProgess";
import Calendar from "@/components/Calendar";
import { getHabits } from "@/actions/actions";
import { useEffect, useState } from "react";
import StreakStats from "@/components/StreakStats";
import HabitCheckbox from "@/components/HabitCheckbox";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    async function loadHabits() {
      if (!session?.user?.id) return;

      try {
        const data = await getHabits(session.user.id);
        setHabits(data);
      } catch (error) {
        console.error("Failed to load habits:", error);
      }
    }

    loadHabits();
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: NavBar (optional) */}
        {/* <div className="col-span-2"><NavBar /></div> */}

        {/* Middle Column: Overview and Weekly Progress */}
        <div className="col-span-6 space-y-6">
          {/* Overview Section */}
          <div className="bg-white p-6 rounded-lg shadow min-h-1/2">
            <h2 className="font-semibold text-gray-700 mb-4">Overview</h2>
            <ul className="space-y-2">
              {habits.map((habit) => (
                <li key={habit.habitId}>
                  <HabitCheckbox habit={habit} />
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly Progress */}
          <WeeklyProgress />
        </div>

        {/* Right Column: Calendar and Leaderboard */}
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
