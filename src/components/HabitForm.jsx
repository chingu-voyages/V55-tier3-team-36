'use client';

import { useState } from "react";
import { updateUserGoal } from "@/actions/actions";
import { useSession } from "next-auth/react";

export default function HabitForm({ onClose, onHabitAdded }) {
  const { data: session } = useSession();
  const [goal, setGoal] = useState("");
  const [behavior, setBehavior] = useState("");
  const [when, setWhen] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    setIsSubmitting(true);

    try {
      await updateUserGoal(session.user.id, {
        goal,
        behavior,
        when,
      });

      if (onHabitAdded) onHabitAdded(); // Refresh habit list after adding
      onClose(); // Hide the form
    } catch (err) {
      console.error("Error adding habit:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Goal</label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Behavior</label>
        <input
          type="text"
          value={behavior}
          onChange={(e) => setBehavior(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">When</label>
        <input
          type="text"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
