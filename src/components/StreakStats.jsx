"use client";
import { useEffect, useState } from "react";

export default function StreakStats() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setCurrentStreak(data.currentStreak || 0);
        setBestStreak(data.bestStreak || 0);
        setCompletionRate(data.completionRate || 0);
      } catch (error) {
        console.error("Error fetching streak stats:", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="flex space-x-8 text-right text-blue-900 font-medium">
      <div>
        <p className="text-xl">{currentStreak}</p>
        <p className="text-sm text-gray-500">Current Streak</p>
      </div>
      <div>
        <p className="text-xl">{bestStreak}</p>
        <p className="text-sm text-gray-500">Best Streak</p>
      </div>
      <div>
        <p className="text-xl">{completionRate}%</p>
        <p className="text-sm text-gray-500">Completion Rate</p>
      </div>
    </div>
  );
}
