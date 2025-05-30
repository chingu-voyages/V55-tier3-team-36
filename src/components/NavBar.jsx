"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const linkClassName = "pb-4";
  const activeLinkClassName = "pb-4 border-b font-bold";

  return (
    <div className="bg-blue-100 w-1/4 min-h-screen content-center">
      <div className="flex flex-col gap-10 p-8">
        <Link
          href="/routes/dashboard"
          className={`${
            pathname === `/routes/dashboard`
              ? activeLinkClassName
              : linkClassName
          }`}
        >
          DASHBOARD
        </Link>
        <Link
          href="/routes/dashboard/habits"
          className={`${
            pathname === `/routes/dashboard/habits`
              ? activeLinkClassName
              : linkClassName
          }`}
        >
          HABITS
        </Link>
        <Link
          href="/routes/dashboard/community"
          className={`${
            pathname === `/routes/dashboard/community`
              ? activeLinkClassName
              : linkClassName
          }`}
        >
          COMMUNITY
        </Link>
      </div>
    </div>
  );
}
