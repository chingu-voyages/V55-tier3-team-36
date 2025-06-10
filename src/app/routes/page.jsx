"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAllTableUser } from "@/actions/actions";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [onboardingStatus, setOnboardingStatus] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.email) {
        const users = await getAllTableUser();
        const currentUser = users.find(user => user.email === session.user.email);
        setOnboardingStatus(currentUser?.onboarded ?? false);
      }
    }
    fetchUserData();
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view this page</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Information</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {session.user.name}</p>
        <p><strong>Email:</strong> {session.user.email}</p>
        <p><strong>Onboarding Status:</strong> {onboardingStatus === null ? 'Loading...' : onboardingStatus ? 'Completed' : 'Not Completed'}</p>
        {session.user.image && (
          <div className="mt-4">
            <img 
              src={session.user.image} 
              alt="Profile" 
              className="w-20 h-20 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
