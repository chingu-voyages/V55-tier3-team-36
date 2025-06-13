"use client";

import { useState } from "react";
import { MdOutlineEdit, MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import { updateHabit } from "@/actions/actions";
import { useSession } from "next-auth/react";

export default function HabitCard({ habit }) {
  const { data: session } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [localHabit, setLocalHabit] = useState({
    habitName: habit.habitName || "",
    habitBehavior: habit.habitBehavior || "",
    habitWhen: habit.habitWhen || "",
  });

  const [editedHabit, setEditedHabit] = useState(localHabit);

  const handleChange = (e) => {
    setEditedHabit({ ...editedHabit, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateHabit(habit.habitId, session.user.id, editedHabit);
      setLocalHabit(editedHabit); // 👈 update displayed values
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update habit:", error);
    }
  };

  const handleCancel = () => {
    setEditedHabit(localHabit);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border rounded-lg shadow px-4 py-3 w-64">
      <div className="flex justify-between items-start mb-2">
        {isEditing ? (
          <input
            name="habitName"
            value={editedHabit.habitName}
            onChange={handleChange}
            className="text-sm font-semibold border-b w-full"
          />
        ) : (
          <h3 className="font-semibold text-gray-800">{localHabit.habitName}</h3>
        )}
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button onClick={handleCancel}>
                <MdOutlineCancel className="text-red-500" />
              </button>
              <button onClick={handleSave}>
                <MdCheckCircleOutline className="text-green-600" />
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <MdOutlineEdit className="text-gray-500 hover:text-gray-700" />
            </button>
          )}
        </div>
      </div>

      <ul className="text-sm text-gray-600 space-y-1">
        <li>
          What:{" "}
          {isEditing ? (
            <input
              name="habitBehavior"
              value={editedHabit.habitBehavior}
              onChange={handleChange}
              className="border-b w-full"
            />
          ) : (
            localHabit.habitBehavior
          )}
        </li>
        <li>
          When:{" "}
          {isEditing ? (
            <input
              name="habitWhen"
              value={editedHabit.habitWhen}
              onChange={handleChange}
              className="border-b w-full"
            />
          ) : (
            localHabit.habitWhen
          )}
        </li>
        {habit.startDate && (
          <li>Start: {new Date(habit.startDate).toLocaleDateString()}</li>
        )}
        {habit.lastCompletedDate && (
          <li>Last Done: {new Date(habit.lastCompletedDate).toLocaleDateString()}</li>
        )}
      </ul>
    </div>
  );
}
