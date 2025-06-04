"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorMessage from "./ErrorMessage";

export default function FormOne() {
  const router = useRouter();

  const [goalData, setGoalData] = useState("");

  function handleGoalChange(event) {
    setGoalData(event.target.value);
  }

  function setSessionGoal() {
    sessionStorage.setItem("goal", goalData);
  }

  const [isError, setIsError] = useState(false);

  function handleContinue(event) {
    event.preventDefault();
    if (goalData === "") {
      setIsError(true);
    } else {
      setIsError(false);
      setSessionGoal();
      router.push("/routes/onboarding/step2");
    }
  }

  return (
    <div className="w-3/4 ">
      <form>
        <label
          htmlFor="goal"
          className="block mb-4 text-lg font-bold  text-gray-900 "
        >
          What do you want to do?
        </label>

        <input
          type="text"
          name="goal"
          onChange={handleGoalChange}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5  "
          placeholder="Enter a goal you want to achieve"
        />

        <div className="flex  mt-2 text-sm justify-between">
          <p id="helper-text-explanation" className=" text-gray-500">
            e.g., "Drink more water"
          </p>
          {isError && <ErrorMessage />}
        </div>

        <button
          className="cursor-pointer bg-blue-500 rounded-lg w-full p-2 mt-10 text-white text-sm"
          onClick={handleContinue}
        >
          CONTINUE
        </button>
      </form>

      <div className="mt-16">
        <div className="text-lg text-gray-500">Did you know?</div>

        <div className="mt-4 text-gray-500">
          The likelihood of you maintaining a habit increases significantly if
          you have a clear goal in mind.
        </div>
      </div>
    </div>
  );
}
