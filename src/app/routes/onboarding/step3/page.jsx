"use client";

import Description from "@/components/onboardingcomponents/Description";
import FormThree from "@/components/onboardingcomponents/FormThree";
import Tagline from "@/components/onboardingcomponents/Tagline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function StepThree() {
  const tagline = "Nice, you've just build a routine!";
  const title = "Review your routine";
  const description = "You can make changes to your routine at any time.";

  const { data: session } = useSession();

  const userId = session?.user.id;

  return (
    <div>
      <Tagline tagline={tagline} />

      <div className="flex ">
        <Description title={title} description={description} step="three" />
        <div className="w-1/2  flex flex-col bg-white  rounded-xl p-6">
          <FormThree userId={userId} />
        </div>
      </div>
    </div>
  );
}
