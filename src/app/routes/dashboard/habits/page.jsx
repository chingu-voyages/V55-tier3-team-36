"use client";

import NavBar from "@/components/NavBar";
import HabitCard from "@/components/HabitCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getHabits } from "@/actions/actions";
import StreakStats from "@/components/StreakStats";

export default function HabitsPage() {
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome back, {session?.user?.name || "Jane"}!
          </h1>
          <StreakStats />
        </div>

        <div className="grid grid-cols-12 gap-4 items-start">
          {/* Sidebar */}
          <div className="col-span-3">
            <NavBar />
          </div>
          {/* Habit cards + Add button */}
          <div className="col-span-9 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Keep track of your routines and habits
                </h2>
                <button className="px-4 py-2 border rounded-full text-blue-600 border-blue-600 hover:bg-blue-50 transition text-sm">
                  + Add a Routine
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                {habits.map((habit) => (
                  <HabitCard key={habit.habitId} habit={habit} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
