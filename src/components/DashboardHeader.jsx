"use client";
import { useSession, signOut } from "next-auth/react";

import StreakStats from "./StreakStats";

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <div className="bg-blue-100  h-full px-6 pt-6 pb-8">
      <button
        className="mb-4 flex justify-self-end cursor-pointer px-4 py-2 border rounded-full text-blue-800 border-blue-800 hover:bg-blue-50 transition text-xs"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        SIGN OUT
      </button>
      <div className=" flex justify-between items-center p-8">
        <div className="text-blue-900 text-3xl font-bold">
          Welcome back, {session?.user?.name}
        </div>
        <StreakStats />
      </div>
    </div>
  );
}
