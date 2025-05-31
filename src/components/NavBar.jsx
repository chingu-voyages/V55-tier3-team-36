"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignIn from "./SignIn";

export default function NavBar() {
  const pathname = usePathname();

  const linkClassName = "block text-gray-700 hover:font-semibold"; // <-- make it a block-level element
  const activeLinkClassName = "block font-bold text-blue-700";     // <-- same here

  return (
    <aside className="w-[220px] h-full bg-blue-100 px-6 py-10 rounded-r-3xl shadow-md flex flex-col justify-between">
      <nav className="space-y-4">
        <Link
          href="/routes/dashboard"
          className={pathname === `/routes/dashboard` ? activeLinkClassName : linkClassName}
        >
          Dashboard
        </Link>
        <Link
          href="/routes/dashboard/habits"
          className={pathname === `/routes/dashboard/habits` ? activeLinkClassName : linkClassName}
        >
          Habits
        </Link>
        <Link
          href="/routes/dashboard/community"
          className={pathname === `/routes/dashboard/community` ? activeLinkClassName : linkClassName}
        >
          Community
        </Link>
      </nav>

      <div className="mt-10">
        <SignIn />
      </div>
    </aside>
  );
}
