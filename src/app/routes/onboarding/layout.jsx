"use client";
import Stepper from "@/components/onboardingcomponents/Stepper";
import { signOut } from "next-auth/react";

export default function OnboardingLayout({ children }) {
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <Stepper />
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
