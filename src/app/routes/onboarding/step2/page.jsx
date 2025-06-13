import Description from "@/components/onboardingcomponents/Description";
import FormTwo from "@/components/onboardingcomponents/FormTwo";
import Tagline from "@/components/onboardingcomponents/Tagline";
import React from "react";

export default function StepTwo() {
  const tagline = "Help us help you achieve your goal!";
  const title = "Make a game plan";
  const description =
    "You are 2-3x more likely to maintain a habit if you have a specific plan (a.k.a., an implementation intention).";
  return (
    <div>
      <Tagline tagline={tagline} />
      <div className="flex">
        <Description title={title} description={description} step="two" />
        <div className="w-1/2 flex flex-col bg-white  rounded-xl p-6">
          <FormTwo />
        </div>
      </div>
    </div>
  );
}
