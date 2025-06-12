export default function HabitCard({ habit }) {
  return (
    <div className="bg-white border rounded-lg shadow px-4 py-3 w-64">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{habit.habitName}</h3>
        <button className="text-gray-400 hover:text-gray-600 text-sm">
          ✏️
        </button>
      </div>
      <ul className="text-sm text-gray-600 space-y-1">
        {habit.habitBehavior && <li>What: {habit.habitBehavior}</li>}
        {habit.habitWhen && <li>When: {habit.habitWhen}</li>}
        {habit.StartDate && (
          <li>Start: {new Date(habit.lastCompletedDate).toLocaleString()}</li>
        )}
        {habit.lastCompletedDate && (
          <li>
            Last Done: {new Date(habit.lastCompletedDate).toLocaleString()}
          </li>
        )}
      </ul>
    </div>
  );
}
