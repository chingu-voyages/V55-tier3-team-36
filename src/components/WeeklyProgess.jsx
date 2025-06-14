"use client";

import { useState, useEffect } from "react";

export default function WeeklyProgress() {
  const [progressData, setProgressData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    async function fetchWeekStats() {
      try {
        const res = await fetch("/api/stats/week");
        const json = await res.json();

        const rawData = json.data || {};

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const formatted = days.map((day, idx) => ({
          day,
          percent: rawData[idx] ?? 0,
        }));

        setProgressData(formatted);
      } catch (err) {
        console.error("Error fetching weekly progress stats:", err);
      }
    }

    fetchWeekStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-lg font-semibold mb-4">This Week At a Glance</h2>

      <div className="flex justify-between items-end h-40 relative z-10">
        {progressData.map(({ day, percent }, index) => (
          <div
            key={day}
            className="flex flex-col items-center relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            {hoveredIndex === index && (
              <div className="absolute -top-8 mb-2 text-sm bg-gray-800 text-white px-2 py-1 rounded shadow-lg z-50">
                {percent}%
              </div>
            )}

            {/* Bar container */}
            <div className="relative flex items-end justify-center h-32 w-6 bg-gray-200 rounded-md">
              <div
                className="w-full bg-[#a5ddd7] rounded-md transition-all duration-300"
                style={{ height: `${percent}%` }}
              />
            </div>

            {/* Day label */}
            <div className="bg-gray-100 text-gray-800 text-sm font-medium rounded px-2 py-1 shadow-sm mt-2">
              {day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
