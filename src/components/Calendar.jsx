"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [habitData, setHabitData] = useState({});

  useEffect(() => {
    async function fetchCalendarData() {
      const monthParam = currentDate.format("YYYY-MM");

      try {
        const response = await fetch(`/api/calendar?month=${monthParam}`);
        if (!response.ok) throw new Error("Failed to fetch calendar data");

        const { data } = await response.json();
        setHabitData(data);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    }
    fetchCalendarData();
  }, [currentDate]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const year = currentDate.year();
  const month = currentDate.month();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <div key={`blank-${i}`} />
  ));

  const getColor = (count) => {
    if (count >= 4) return "bg-[#56a2c6 text-white";
    if (count === 3) return "bg-[#56a2c6] text-white";
    if (count === 2) return "bg-[#a9d2e4] text-gray-800";
    if (count === 1) return "bg-[#d3e8f1] text-gray-800";
    return "bg-gray-100 text-gray-800";
  };

  const days = Array.from({ length: currentDate.daysInMonth() }, (_, i) => {
    const day = i + 1;
    const count = habitData[day] || 0;
    const isToday =
      currentDate.date() === day &&
      currentDate.isSame(dayjs(), "month") &&
      currentDate.isSame(dayjs(), "year");

    return (
      <div
        key={day}
        className={`relative group aspect-square flex items-center justify-center rounded shadow-sm text-sm font-medium ${getColor(
          count
        )} ${isToday ? "border-2 border-indigo-500" : ""}`}
      >
        {day}
        <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow z-10">
          Habits completed: {count}
        </div>
      </div>
    );
  });

  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={goToPrevMonth}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &lt;
        </button>
        <h2 className="text-md font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {blanks.concat(days)}
      </div>
    </div>
  );
}
