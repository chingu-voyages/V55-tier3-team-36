"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ErrorMessage from "./ErrorMessage";

export default function FormTwo() {
  const router = useRouter();

  const [sessionGoal, setSessionGoal] = useState("");

  function getSessionGoal() {
    const goal = sessionStorage.getItem("goal");
    setSessionGoal(goal);
  }
  useEffect(() => {
    getSessionGoal();
  }, []);

  const [behaviorData, setBehaviorData] = useState("");
  const [whenData, setWhenData] = useState("");

  function handleBehaviorChange(event) {
    setBehaviorData(event.target.value);
  }

  function handleWhenChange(event) {
    setWhenData(event.target.value);
  }

  function setSessionBehaviorWhen() {
    sessionStorage.setItem("behavior", behaviorData);
    sessionStorage.setItem("when", whenData);
  }

  function handleContinue(event) {
    event.preventDefault();
    setSessionBehaviorWhen();
    router.push("/routes/onboarding/step3");
  }

  return (
    <div>
      <div className="mb-6 text-gray-500">Goal: {sessionGoal}</div>

      <form>
        <label
          htmlFor="behavior"
          className="block mb-4 text-lg font-bold  text-gray-900 "
        >
          How will you achieve this goal?
        </label>

        <input
          type="text"
          name="behavior"
          onChange={handleBehaviorChange}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5  "
          placeholder="Enter a behavior you wish to implement"
          maxLength={200}
        />

        <div className="flex  mt-2 text-sm justify-between">
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500"
          >
            e.g., "I will drink a glass of water"
          </p>
          {/* {isErrorBehavior && <ErrorMessage />} */}
        </div>

        <label
          htmlFor="when"
          className="mt-6 block mb-4 text-lg font-bold  text-gray-900 "
        >
          When will you perform the above action?
        </label>

        <input
          type="text"
          name="when"
          onChange={handleWhenChange}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5  "
          placeholder="Enter a time or scenario"
          maxLength={200}
        />

        <div className="flex  mt-2 text-sm justify-between">
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500"
          >
            e.g., "after I wake up in the morning"
          </p>
          {/* {isErrorWhen && <ErrorMessage />} */}
        </div>

        <button
          className="cursor-pointer bg-blue-500 rounded-lg w-full p-2 mt-10 text-white text-sm"
          onClick={handleContinue}
        >
          CONTINUE
        </button>
      </form>
    </div>
  );
}
