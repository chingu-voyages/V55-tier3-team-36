'use client';

import NavBar from '@/components/NavBar';
import HabitCard from '@/components/HabitCard';
import { useState } from 'react';
import { useSession } from "next-auth/react";

export default function HabitsPage() {
  const { data: session } = useSession();

  const [habits, setHabits] = useState([
    {
      id: 1,
      title: 'Drink more water',
      steps: ['I will drink a glass of water', 'after I wake up in the morning'],
    },
    {
      id: 2,
      title: 'Be more active',
      steps: ['I will go on a walk', 'after I eat dinner'],
    },
    {
      id: 3,
      title: 'Be more consistent with meds',
      steps: [],
    },
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
  
      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome back, {session?.user?.name || "Jane"}!
          </h1>
          <div className="flex space-x-8 text-right text-blue-900 font-medium">
            <div>
              <p className="text-xl">24</p>
              <p className="text-sm text-gray-500">Current Streak</p>
            </div>
            <div>
              <p className="text-xl">24</p>
              <p className="text-sm text-gray-500">Best Streak</p>
            </div>
            <div>
              <p className="text-xl">75%</p>
              <p className="text-sm text-gray-500">Completion Rate</p>
            </div>
          </div>
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
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        </div>
        </div>
        </div>
        
      </main>
    </div>
  );
}
