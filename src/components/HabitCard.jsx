export default function HabitCard({ habit }) {
  return (
    <div className="bg-white border rounded-lg shadow px-4 py-3 w-64">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{habit.title}</h3>
        <button className="text-gray-400 hover:text-gray-600 text-sm">
          ✏️
        </button>
      </div>
      <ul className="text-sm text-gray-600 space-y-1">
        {Array.isArray(habit.steps) &&
          habit.steps.map((step, index) => <li key={index}>{step}</li>)}
      </ul>
    </div>
  );
}
