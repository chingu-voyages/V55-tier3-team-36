'use client';

import { useState } from 'react';
import dayjs from 'dayjs';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = currentDate.year();
  const month = currentDate.month();
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  // Simulate habit completion counts
  const getHabitCountForDay = (day) => {
    // Replace this with real logic eventually
    return Math.floor(Math.random() * 5); // 0 to 4
  };

  const getColorClass = (count, isToday) => {
    if (isToday) return 'bg-indigo-500 text-white font-bold';
    if (count === 0) return 'bg-gray-100 text-gray-800';
    if (count === 1) return 'bg-green-100';
    if (count === 2) return 'bg-green-300';
    if (count === 3) return 'bg-green-500 text-white';
    return 'bg-green-700 text-white';
  };

  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <div key={`blank-${i}`} />
  ));

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const isToday =
      currentDate.date() === day &&
      currentDate.isSame(dayjs(), 'month') &&
      currentDate.isSame(dayjs(), 'year');

    const habitCount = getHabitCountForDay(day);
    const colorClass = getColorClass(habitCount, isToday);

    return (
      <div
        key={day}
        className={`aspect-square flex items-center justify-center rounded shadow-sm text-sm ${colorClass}`}
        title={`Habits completed: ${habitCount}`}
      >
        {day}
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

