"use client";

import { useState } from "react";

export default function FormTwo() {
  const [behaviorData, setBehaviorData] = useState("");
  const [whenData, setWhenData] = useState("");

  function handleBehaviorChange(event) {
    setBehaviorData(event.target.value);
  }

  function handleWhenChange(event) {
    setWhenData(event.target.value);
  }

  function handleContinue(event) {
    event.preventDefault();
    console.log(behaviorData);
    console.log(whenData);
    // update session storage
  }

  return (
    <div>
      <p className="mb-6 text-gray-500"> Goal: insert from last step here</p>
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
        />

        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
          e.g., "I will drink a glass of water"
        </p>

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
        />

        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
          e.g., "after I wake up in the morning"
        </p>

        <button
          className=" bg-blue-500 rounded-lg w-full p-2 mt-10 text-white text-sm"
          onClick={handleContinue}
        >
          CONTINUE
        </button>
      </form>
    </div>
  );
}
