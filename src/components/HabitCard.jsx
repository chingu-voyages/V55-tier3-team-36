"use client";

import { useState } from "react";
import {
  MdOutlineEdit,
  MdCheckCircleOutline,
  MdOutlineCancel,
  MdDeleteOutline,
} from "react-icons/md";
import { updateHabit, deleteHabit } from "@/actions/actions";
import { useSession } from "next-auth/react";

export default function HabitCard({ habit, onDelete }) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

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
    if (!editedHabit.habitName.trim()) {
      alert("Habit name is required.");
      return;
    }

    try {
      await updateHabit(habit.habitId, session.user.id, editedHabit);
      setLocalHabit(editedHabit);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update habit:", error);
    }
  };

  const handleCancel = () => {
    setEditedHabit(localHabit);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteHabit(habit.habitId);
      if (onDelete) onDelete(habit.habitId);
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow px-4 py-3 w-64 break-words">
      <div className="flex justify-between items-start mb-2">
        {isEditing ? (
          <>
            <input
              name="habitName"
              value={editedHabit.habitName}
              onChange={handleChange}
              required
              maxLength={100}
              className={`text-sm font-semibold border-b w-full ${
                !editedHabit.habitName.trim() ? "border-red-500" : ""
              }`}
            />
            <p className="text-xs text-gray-500 text-right">
              {editedHabit.habitName.length}/100
            </p>
          </>
        ) : (
          <h3 className="font-semibold text-gray-800 break-all whitespace-normal">
            {localHabit.habitName}
          </h3>
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
            <>
              <button onClick={() => setIsEditing(true)}>
                <MdOutlineEdit className="text-gray-500 hover:text-gray-700" />
              </button>
              <button onClick={() => setShowConfirmDelete(true)}>
                <MdDeleteOutline className="text-red-500 hover:text-red-700" />
              </button>
            </>
          )}
        </div>
      </div>

      <ul className="text-sm text-gray-600 space-y-1">
        <li>
          {/* What:{" "} */}
          {isEditing ? (
            <>
              <input
                name="habitBehavior"
                value={editedHabit.habitBehavior}
                onChange={handleChange}
                maxLength={200}
                className="border-b w-full"
              />
              <p className="text-xs text-gray-500 text-right">
                {editedHabit.habitBehavior.length}/200
              </p>
            </>
          ) : (
            localHabit.habitBehavior
          )}
        </li>
        <li>
          {/* When:{" "} */}
          {isEditing ? (
            <>
              <input
                name="habitWhen"
                value={editedHabit.habitWhen}
                onChange={handleChange}
                className="border-b w-full"
                maxLength={200}
              />
              <p className="text-xs text-gray-500 text-right">
                {editedHabit.habitWhen.length}/200
              </p>
            </>
          ) : (
            localHabit.habitWhen
          )}
        </li>
        {habit.startDate && (
          <li>Start: {new Date(habit.startDate).toLocaleDateString()}</li>
        )}
        {habit.lastCompletedDate && (
          <li>
            Last Done: {new Date(habit.lastCompletedDate).toLocaleDateString()}
          </li>
        )}
      </ul>

      {showConfirmDelete && (
        <div className="mt-4 text-sm text-gray-700">
          <p>Are you sure you want to delete this habit?</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleDelete}
              className="text-white bg-red-500 px-3 py-1 rounded-md text-sm"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
