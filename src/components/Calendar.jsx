'use client';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [habitData, setHabitData] = useState({});

  useEffect(() => {
    async function fetchHabitData() {
      const year = currentDate.year();
      const month = currentDate.month(); // zero-based

      try {
        const res = await fetch(`/api/calendar?year=${year}&month=${month}`);
        const data = await res.json();
        setHabitData(data);
      } catch (err) {
        console.error("Failed to fetch calendar stats", err);
      }
    }

    fetchHabitData();
  }, [currentDate]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = currentDate.year();
  const month = currentDate.month();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <div key={`blank-${i}`} />
  ));

  const getColor = (rate) => {
    if (rate >= 100) return 'bg-green-600 text-white';
    if (rate >= 75) return 'bg-green-500 text-white';
    if (rate >= 50) return 'bg-green-400 text-white';
    if (rate >= 25) return 'bg-green-300 text-white';
    if (rate > 0) return 'bg-green-100 text-gray-800';
    return 'bg-gray-100 text-gray-800';
  };

  const days = Array.from({ length: currentDate.daysInMonth() }, (_, i) => {
    const day = i + 1;
    const rate = habitData[day] || 0;
    const isToday =
      currentDate.date() === day &&
      currentDate.isSame(dayjs(), 'month') &&
      currentDate.isSame(dayjs(), 'year');

    return (
      <div
        key={day}
        className={`relative group aspect-square flex items-center justify-center rounded shadow-sm text-sm font-medium ${getColor(
          rate
        )} ${isToday ? 'border-2 border-indigo-500' : ''}`}
      >
        {day}
        <div className="absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow z-10">
          Completion Rate: {rate}%
        </div>
      </div>
    );
  });

  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <button onClick={goToPrevMonth} className="text-sm text-gray-500 hover:text-gray-700">&lt;</button>
        <h2 className="text-md font-semibold">{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={goToNextMonth} className="text-sm text-gray-500 hover:text-gray-700">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-medium">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {blanks.concat(days)}
      </div>
    </div>
  );
}
