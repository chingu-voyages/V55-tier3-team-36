"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const linkClassName =
    "block text-gray-700 hover:font-semibold pl-4 pr-16 pb-2"; // <-- make it a block-level element
  const activeLinkClassName =
    "block font-bold text-blue-600 pb-2 pl-4 pr-16 border-b-3  border-blue-600"; // <-- same here

  return (
    <div className="">
      <nav className="pl-8 pr-4">
        <div className="py-2 pl-4 mb-6">
          <Link
            href="/routes/dashboard"
            className={
              pathname === `/routes/dashboard`
                ? activeLinkClassName
                : linkClassName
            }
          >
            DASHBOARD
          </Link>
        </div>

        <div className="py-2 pl-4 mb-6 ">
          <Link
            href="/routes/dashboard/habits"
            className={
              pathname === `/routes/dashboard/habits`
                ? activeLinkClassName
                : linkClassName
            }
          >
            HABITS
          </Link>
        </div>

        <div className="py-2 pl-4">
          <Link
            href="/routes/dashboard/community"
            className={
              pathname === `/routes/dashboard/community`
                ? activeLinkClassName
                : linkClassName
            }
          >
            COMMUNITY
          </Link>
        </div>
      </nav>
    </div>

    // </nav>

    //   <div className="mt-10">
    //     {session ? (
    //       <button
    //         onClick={() => signOut({ callbackUrl: '/' })}
    //         className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    //       >
    //         <svg
    //           className="w-5 h-5"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    //           />
    //         </svg>
    //         Sign Out
    //       </button>
    //     ) : (
    //       <button
    //         onClick={() => signIn("google")}
    //         className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    //       >
    //         <svg className="w-5 h-5" viewBox="0 0 24 24">
    //           <path
    //             fill="currentColor"
    //             d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    //           />
    //           <path
    //             fill="currentColor"
    //             d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    //           />
    //           <path
    //             fill="currentColor"
    //             d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    //           />
    //           <path
    //             fill="currentColor"
    //             d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    //           />
    //         </svg>
    //         Sign in with Google
    //       </button>
    //     )}
    //   </div>
    // </aside>
  );
}
