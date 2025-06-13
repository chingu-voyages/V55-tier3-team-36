"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  addHabitLog,
  deleteHabitLog,
  checkHabitLogForToday,
} from "@/actions/actions";

export default function HabitCheckbox({ habit }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogStatus() {
      if (!userId || !habit?.habitId) return;

      try {
        const log = await checkHabitLogForToday(userId, habit.habitId);
        setIsChecked(log?.completed ?? false); // ✅ always a boolean
      } catch (err) {
        console.error("Error checking habit log:", err);
        setIsChecked(false); // default fallback
      } finally {
        setLoading(false);
      }
    }

    fetchLogStatus();
  }, [userId, habit?.habitId]);

  const handleToggle = async () => {
    if (!userId) return;

    const newValue = !isChecked;
    setIsChecked(newValue);

    try {
      if (newValue) {
        await addHabitLog(habit.habitId, userId, today);
      } else {
        await deleteHabitLog(habit.habitId, userId, today);
      }
    } catch (error) {
      console.error("Failed to update habit log:", error);
    }
  };

  if (loading) return null;

  return (
    <label className="flex items-center gap-2 text-gray-800">
      <input
        type="checkbox"
        checked={!!isChecked} // ✅ always boolean
        onChange={handleToggle}
        className="w-4 h-4 accent-blue-600"
      />
      {habit?.habitName ?? "Unnamed Habit"}
    </label>
  );
}
