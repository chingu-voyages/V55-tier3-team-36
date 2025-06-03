"use client";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import ErrorMessage from "./ErrorMessage";

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
  // validate on this page only?

  const [isEditing, setIsEditing] = useState(false);

  function handleGoalChange(event) {
    setGoalData(event.target.value);
  }

  const [isError, setIsError] = useState(false);

  function handleRoutineSave(event) {
    event.preventDefault();
    if (goalData === "") {
      setIsError(true);
    } else {
      setIsError(false);
      const goal = sessionStorage.setItem("goal", goalData);
      setIsEditing(false);
    }
  }

  // to do - allow edits for behavior and when

  //  function for save to console log all routine
  function handleSave() {
    console.log(goalData);
    console.log(behaviorData);
    console.log(whenData);
  }

  return (
    <div className=" w-3/4 ">
      <div className="flex  gap-10">
        <div className="w-3/4 block text-lg font-bold  text-gray-900 ">
          Name of implementation intention
        </div>
        <div className="">
          <button className="cursor-pointer" onClick={() => setIsEditing(true)}>
            <MdOutlineEdit />
          </button>
        </div>
      </div>

      <div className="mb-6">
        {!isEditing && <p className=" text-gray-500">{goalData}</p>}
        {isEditing && (
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5  "
            value={goalData}
            onChange={handleGoalChange}
          />
        )}
        {isError && <ErrorMessage />}
      </div>

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

      <div>
        {isEditing && (
          <button
            className="cursor-pointer bg-blue-500 rounded-lg w-full p-2 mt-10 text-white text-sm"
            onClick={handleRoutineSave}
          >
            Save Updated Routine
          </button>
        )}
        {!isEditing && (
          <button
            className="cursor-pointer bg-blue-500 rounded-lg w-full p-2 mt-10 text-white text-sm"
            onClick={handleSave}
          >
            SAVE
          </button>
        )}
      </div>
    </div>
  );
}
