"use client";

import { useState } from "react";

const progressData = [
  { day: "Sun", percent: 100 },
  { day: "Mon", percent: 50 },
  { day: "Tue", percent: 65 },
  { day: "Wed", percent: 30 },
  { day: "Thu", percent: 25 },
  { day: "Fri", percent: 90 },
  { day: "Sat", percent: 60 },
];

export default function WeeklyProgress() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
                className="w-full bg-blue-500 rounded-md transition-all duration-300"
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
