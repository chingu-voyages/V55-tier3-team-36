"use client";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

export default function FormThree() {
  const [goalData, setGoalData] = useState("");
  const [behaviorData, setBehaviorData] = useState("");
  const [whenData, setWhenData] = useState("");

  function getGoalData() {
    const goal = sessionStorage.getItem("goal");
    setGoalData(goal);
  }

  function getBehaviorData() {
    const behavior = sessionStorage.getItem("behavior");
    setBehaviorData(behavior);
  }

  function getWhenData() {
    const when = sessionStorage.getItem("when");
    setWhenData(when);
  }

  useEffect(() => {
    getGoalData();
    getBehaviorData();
    getWhenData();
  }, []);

  // add save function - SAVE FUNCTION SHOULD: update database, clear session storage
  // need to add functionality to edit icons

  return (
    <div className=" w-3/4 ">
      <div className="flex  gap-10">
        <div className="w-3/4 block text-lg font-bold  text-gray-900 ">
          Name of implementation intention
        </div>
        <div className="">
          <MdOutlineEdit />
        </div>
      </div>
      <p className="mb-6 text-gray-500">{goalData}</p>

      <div className="flex gap-10">
        <div className="w-3/4  block text-lg font-bold  text-gray-900 ">
          Behavior
        </div>
        <div className="">
          <MdOutlineEdit />
        </div>
      </div>
      <p className="mb-6 text-gray-500">{behaviorData}</p>

      <div className="flex  gap-10">
        <div className="w-3/4  block text-lg font-bold  text-gray-900 ">
          When
        </div>

        <div className="">
          <MdOutlineEdit />
        </div>
      </div>

      <p className="mb-6 text-gray-500">{whenData}</p>

      <button
        className="cursor-pointer bg-blue-500 rounded-lg w-full p-2 mt-10 text-white text-sm"
        // onClick={}
      >
        SAVE
      </button>
    </div>
  );
}
