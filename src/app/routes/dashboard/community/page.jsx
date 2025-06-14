"use client";

import NavBar from "@/components/NavBar";
import LeaderboardCard from "@/components/LeaderboardCard";
import { useSession } from "next-auth/react";
import StreakStats from "@/components/StreakStats";
import blurred from "../../../../../public/blurred.png";

const dummyData = {
  currentStreak: [
    { name: "John D.", score: 28, avatar: "/avatars/john.png" },
    { name: "You", score: 24, isUser: true },
    { name: "Susan W.", score: 14 },
    { name: "Kate H.", score: 14 },
    { name: "Michael P.", score: 14 },
  ],
  bestStreak: [
    { name: "John D.", score: 28, avatar: "/avatars/john.png" },
    { name: "You", score: 24, isUser: true },
    { name: "Kate H.", score: 20 },
    { name: "Susan W.", score: 14 },
    { name: "Michael P.", score: 14 },
  ],
  completion: [
    { name: "John D.", score: "80%" },
    { name: "You", score: "75%", isUser: true },
    { name: "Kate H.", score: "70%" },
    { name: "Susan W.", score: "68%" },
    { name: "Michael P.", score: "67%" },
  ],
};

export default function CommunityPage() {
  const { data: session } = useSession();
  return (
    <div className=" h-3/4">
      <div>
        <h2 className="text-lg p-8 ">See how you compare to our community</h2>
      </div>
      <div className="bg-[url(/blurred.png)] bg-no-repeat  h-2/3 m-6">
        <div className="flex w-1/2 h-full justify-self-center">
          <div className="text-6xl text-blue-900 content-center">
            Coming Soon
          </div>
        </div>
      </div>
    </div>

    // <div className="flex min-h-screen bg-blue-50">
    //   <main className="flex-1 p-10 bg-gray-50">

    //     <div className="grid grid-cols-12 gap-4 items-start">

    //       {/* Main Content */}
    //       <div className="col-span-9 space-y-6">
    //         {/* Leaderboard Section */}
    //         <div className="bg-white p-6 rounded-2xl shadow">
    //           <h2 className="text-lg font-semibold text-gray-700 mb-6">
    //             See how you compare to our community
    //           </h2>
    //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //             <LeaderboardCard
    //               title="Current Streak"
    //               data={dummyData.currentStreak}
    //             />
    //             <LeaderboardCard
    //               title="Best Streak"
    //               data={dummyData.bestStreak}
    //             />
    //             <LeaderboardCard
    //               title="Overall Completion"
    //               data={dummyData.completion}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </div>
  );
}
