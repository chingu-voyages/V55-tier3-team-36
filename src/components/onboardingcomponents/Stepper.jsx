import React from "react";

export default function Stepper() {
  return (
    <div>
      <ol className="flex w-3/4 justify-self-center justify-between  p-12">
        <li className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 border rounded-full">
            1
          </span>
          <span>
            <h3 className="font-medium ">Set a goal</h3>
          </span>
        </li>

        <li className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 border rounded-full">
            2
          </span>
          <span>
            <h3 className="font-medium ">Make a game plan</h3>
          </span>
        </li>

        <li className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 border rounded-full">
            3
          </span>
          <span>
            <h3 className="font-medium ">Review your routine</h3>
          </span>
        </li>
      </ol>
    </div>
  );
}
