"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllTableUser } from "@/actions/actions";

export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const errorParam = searchParams.get("error");
//   const { data: session, status } = useSession();
//   useEffect(() => {
//     const handleRedirect = async () => {
//       if (status === "authenticated" && session?.user?.email) {
//         setIsLoading(true);
//         try {
//           const users = await getAllTableUser();
//           const currentUser = users.find(
//             (user) => user.email === session.user.email
//           );
//           if (!currentUser?.onboarded) {
//             window.location.href = "/routes/onboarding/step1";
//           } else {
//             window.location.href = "/routes/dashboard";
//           }
//         } catch (error) {
//           console.error("Error during redirect:", error);
//           setIsLoading(false);
//         }
//       }
//     };
//     handleRedirect();
//   }, [status, session]);
//   const handleGoogleSignIn = async () => {
//     try {
//       setError(null);
//       console.log("Starting Google sign in...");
//       const result = await signIn("google", {
//         redirect: false,
//       });
//       console.log("Sign in result:", result);
//       if (result?.error) {
//         console.error("Sign in error:", result.error);
//         setError(result.error);
//       }
//     } catch (error) {
//       console.error("Error during sign in:", error);
//       setError(error.message || "An unexpected error occurred");
//     }
//   };
//   return (
//     <div className="flex">
//       <div className="bg-blue-100 w-3/5 content-center">
//         <div className="text-blue-900 font-bold text-4xl justify-self-center">
//           Habit Tracker
//         </div>

//         {/* <div>
//   Welcome to the world of dummy text. This is a placeholder paragraph used to fill space in the absence of real content. It has no particular meaning or significance, but it helps to demonstrate the visual aspects of a design or layout.
// </div> */}
//       </div>

//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         {isLoading ? (
//           <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Preparing your experience...
//             </h2>
//             <p className="text-gray-600">
//               We're getting everything ready for you
//             </p>
//           </div>
//         ) : (
//           <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//             <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
//               Sign In
//             </h1>
//             {(error || errorParam) && (
//               <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//                 {error || errorParam === "AccessDenied"
//                   ? "Access denied. Please try signing in again."
//                   : `Error: ${error || errorParam}`}
//               </div>
//             )}
//             <div className="space-y-4">
//               <button
//                 onClick={handleGoogleSignIn}
//                 disabled={isLoading}
//                 className="w-full flex items-center justify-center gap-3 py-2 px-4 border-2 border-blue-800 text-blue-800 rounded-3xl hover:bg-gray-50 cursor-pointer"
//               >
//                 <svg className="w-5 h-5" viewBox="0 0 24 24">
//                   <path
//                     fill="currentColor"
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   />
//                   <path
//                     fill="currentColor"
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   />
//                 </svg>
//                 CONTINUE WITH GOOGLE
//               </button>
//             </div>
//             {/* <p className="mt-6 text-center text-sm text-gray-600">
//               By signing in, you agree to our{" "}
//               <a href="#" className="text-blue-600 hover:text-blue-500">
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="#" className="text-blue-600 hover:text-blue-500">
//                 Privacy Policy
//               </a>
//             </p> */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
}
