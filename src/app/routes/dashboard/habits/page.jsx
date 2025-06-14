"use client";

import NavBar from "@/components/NavBar";
import HabitCard from "@/components/HabitCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getHabits } from "@/actions/actions";
import HabitForm from "@/components/HabitForm";

export default function HabitsPage() {
  const { data: session } = useSession();
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadHabits = async () => {
    if (!session?.user?.id) return;
    try {
      const data = await getHabits(session.user.id);
      setHabits(data);
    } catch (error) {
      console.error("Failed to load habits:", error);
    }
  };

  useEffect(() => {
    loadHabits();
  }, [session]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-10">
        <div className="grid grid-cols-12 gap-4 items-start">
          {/* Habit cards + Form */}
          <div className="col-span-9 space-y-6 w-full">
            <div className="bg-white p-6 rounded-lg shadow mb-6 max-h-[475px] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Keep track of your routines and habits
                </h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-4 py-2 border rounded-full text-blue-600 border-blue-600 hover:bg-blue-50 transition text-sm"
                >
                  {showForm ? "Close" : "+ Add a Routine"}
                </button>
              </div>

              {showForm && (
                <HabitForm
                  onClose={() => setShowForm(false)}
                  onHabitAdded={loadHabits}
                />
              )}

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
