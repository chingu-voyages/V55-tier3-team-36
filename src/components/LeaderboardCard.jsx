// components/LeaderboardCard.jsx
export default function LeaderboardCard({ title, data }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="font-semibold text-gray-700 text-lg mb-4">{title}</h3>
      <ol className="space-y-3">
        {data.map((user, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 font-medium w-5">{idx + 1}.</span>
              {user.avatar && (
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
              )}
              <span className={`font-semibold ${user.isUser ? 'text-blue-700' : ''}`}>
                {user.name}
              </span>
              {user.isUser && <span className="text-blue-500">💎</span>}
            </div>
            <span className="text-blue-600 font-semibold">{user.score}</span>
          </li>
        ))}
      </ol>
      <div className="text-sm text-blue-600 text-center mt-4 font-medium cursor-pointer hover:underline">
        See All
      </div>
    </div>
  );
}
