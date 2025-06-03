"use client";

import { usePathname } from "next/navigation";

export default function Stepper() {
  const pathname = usePathname();

  const upcomingSteps =
    "flex items-center justify-center w-8 h-8 bg-gray-200 font-bold rounded-full";
  const currentStep =
    "flex items-center justify-center w-8 h-8 bg-blue-200 text-blue-800 font-bold rounded-full";
  const pastSteps =
    "flex items-center justify-center w-8 h-8 bg-green-200 text-green-700 font-bold rounded-full";

  // now conditional render classnames based on path
  // className={pathname === `/routes/dashboard` ? activeLinkClassName : linkClassName}

  //  step one - one blue, others black
  // step two - one green, two blue, 3 black
  // step three one and two green, 3 bule

  return (
    <div>
      {pathname === `/routes/onboarding/step1` && (
        <ol className="flex w-3/4 justify-self-center justify-between  p-12">
          <li className="flex items-center gap-4">
            <span className={currentStep}>1</span>
            <span>
              <h3 className="font-medium ">Set a goal</h3>
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className={upcomingSteps}>2</span>
            <span>
              <h3 className="font-medium ">Make a game plan</h3>
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className={upcomingSteps}>3</span>
            <span>
              <h3 className="font-medium ">Review your routine</h3>
            </span>
          </li>
        </ol>
      )}

      {pathname === `/routes/onboarding/step2` && (
        <ol className="flex w-3/4 justify-self-center justify-between  p-12">
          <li className="flex items-center gap-4">
            <span className={pastSteps}>1</span>
            <span>
              <h3 className="font-medium ">Set a goal</h3>
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className={currentStep}>2</span>
            <span>
              <h3 className="font-medium ">Make a game plan</h3>
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className={upcomingSteps}>3</span>
            <span>
              <h3 className="font-medium ">Review your routine</h3>
            </span>
          </li>
        </ol>
      )}

      {pathname === `/routes/onboarding/step3` && (
        <ol className="flex w-3/4 justify-self-center justify-between  p-12">
          <li className="flex items-center gap-4">
            <span className={pastSteps}>1</span>
            <span>
              <h3 className="font-medium ">Set a goal</h3>
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className={pastSteps}>2</span>
            <span>
              <h3 className="font-medium ">Make a game plan</h3>
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className={currentStep}>3</span>
            <span>
              <h3 className="font-medium ">Review your routine</h3>
            </span>
          </li>
        </ol>
      )}
    </div>
  );
}
