'use client'

import { useState } from "react";

export default function FormOne() {

  const [goalData, setGoalData] = useState("")

  function handleGoalChange(event) {
    setGoalData(event.target.value)
  }

  function handleContinue(event) {
    event.preventDefault()
    console.log(goalData)
    // will use to set session storage for goal
  }

  return (
    <div>
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

        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
          e.g., "Drink more water"
        </p>

        <button
          className=" bg-blue-500 rounded-lg w-full p-2 mt-10 text-white text-sm"
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
