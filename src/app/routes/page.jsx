"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { data: session } = useSession();

  const router = useRouter();

  function checkIfOnboarded() {
    if (session?.user.onboarded) {
      router.push("/routes/dashboard");
    } else {
      router.push("/routes/onboarding/step1");
    }
  }

  useEffect(() => {
    checkIfOnboarded();
  }, []);

  return (
    <>
      <p>redirect</p>
      <p>user: {session?.user.name}</p>
    </>
  );
}
