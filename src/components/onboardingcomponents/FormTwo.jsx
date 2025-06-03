import React from "react";

export default function FormTwo() {
  return (
    <div>
      Goal: insert from last step here
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
          //   onChange={}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5  "
          placeholder="Enter a behavior you wish to implement"
        />

        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
          e.g., "I will drink a glass of water"
        </p>

        <label
          htmlFor="when"
          className="block mb-4 text-lg font-bold  text-gray-900 "
        >
          When will you perform the above action?
        </label>

        <input
          type="text"
          name="when"
          //   onChange={}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5  "
          placeholder="Enter a time or scenario"
        />

        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
          e.g., "after I wake up in the morning"
        </p>

        <button
          className=" bg-blue-500 rounded-lg w-full p-2 mt-10 text-white text-sm"
          //    onClick={}
        >
          CONTINUE
        </button>
      </form>
    </div>
  );
}
