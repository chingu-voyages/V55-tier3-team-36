"use client";

import { signIn } from "next-auth/react";

const SignIn = () => {
  return <button onClick={() => signIn("google")}>Sign In With Google</button>;
};

export default SignIn;
