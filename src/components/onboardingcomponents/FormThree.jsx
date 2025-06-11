"use client";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import ErrorMessage from "./ErrorMessage";

import { updateUserGoal } from "@/actions/actions";

export default function FormThree({ userId }) {
  const [goalData, setGoalData] = useState("");
  const [behaviorData, setBehaviorData] = useState("");
  const [whenData, setWhenData] = useState("");
  const [isGoalEditing, setIsGoalEditing] = useState(false);
  const [isBehaviorEditing, setIsBehaviorEditing] = useState(false);
  const [isWhenEditing, setIsWhenEditing] = useState(false);
  const [updatedGoal, setUpdatedGoal] = useState("");
  const [updatedBehavior, setUpdatedBehavior] = useState("");
  const [updatedWhen, setUpdatedWhen] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

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
  useEffect(() => {
    setUpdatedGoal(goalData);
  }, [goalData]);
  useEffect(() => {
    setUpdatedBehavior(behaviorData);
  }, [behaviorData]);
  useEffect(() => {
    setUpdatedWhen(whenData);
  }, [whenData]);

  function handleGoalChange(event) {
    setUpdatedGoal(event.target.value);
  }
  function handleBehaviorChange(event) {
    setUpdatedBehavior(event.target.value);
  }
  function handleWhenChange(event) {
    setUpdatedWhen(event.target.value);
  }

  function handleGoalSave(event) {
    event.preventDefault();
    if (updatedGoal === "") {
      setIsError(true);
    } else {
      setIsError(false);
      sessionStorage.setItem("goal", updatedGoal);
      getGoalData();
      setIsGoalEditing(false);
    }
  }
  function handleBehaviorSave(event) {
    event.preventDefault();
    sessionStorage.setItem("behavior", updatedBehavior);
    getBehaviorData();
    setIsBehaviorEditing(false);
  }
  function handleWhenSave(event) {
    event.preventDefault();
    sessionStorage.setItem("when", updatedWhen);
    getWhenData();
    setIsWhenEditing(false);
  }

  function cancelGoalUpdate() {
    setUpdatedGoal(goalData);
    setIsGoalEditing(false);
  }
  function cancelBehaviorUpdate() {
    setUpdatedBehavior(behaviorData);
    setIsBehaviorEditing(false);
  }
  function cancelWhenUpdate() {
    setUpdatedWhen(whenData);
    setIsWhenEditing(false);
  }

  function checkIfEditing() {
    if (isGoalEditing || isBehaviorEditing || isWhenEditing) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }

  useEffect(() => {
    checkIfEditing();
  }, [isGoalEditing, isBehaviorEditing, isWhenEditing]);

  const enabledSaveClassName =
    "cursor-pointer bg-blue-500 rounded-lg w-full p-2 mt-10 text-white text-sm";
  const disabledSaveClassName =
    "bg-gray-500 rounded-lg w-full p-2 mt-10 text-white text-sm";

  function handleSave() {
    console.log(goalData);
    console.log(behaviorData);
    console.log(whenData);
  }

  const [formData, setFormData] = useState({
    goal: "",
    behavior: "",
    when: "",
  });

  function updateFormData() {
    setFormData({
      goal: goalData,
      behavior: behaviorData,
      when: whenData,
    });
  }

  useEffect(() => {
    updateFormData()
  }, [goalData, behaviorData, whenData])

  async function testAction() {
    try {
      if (!userId) {
        console.error('No user ID provided');
        return;
      }

      if (!formData.goal || !formData.behavior || !formData.when) {
        console.error('Missing required fields:', formData);
        return;
      }

      console.log('Sending data to server:', {
        userId,
        formData
      });

      const data = await updateUserGoal(userId, formData);
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error in testAction:', error);
    }
  }

  return (
    <div className=" w-3/4 ">
      

      <button className="border" onClick={() => testAction()}>
        test action
      </button>

      {/* GOAL DATA */}
      <div className="flex  gap-10">
        <div className="w-3/4 block text-lg font-bold  text-gray-900 ">
          Name of implementation intention
        </div>
        <div className="">
          {!isGoalEditing && (
            <button
              className="cursor-pointer"
              onClick={() => setIsGoalEditing(true)}
            >
              <MdOutlineEdit />
            </button>
          )}
          {isGoalEditing && (
            <div className=" flex text-lg gap-1 items-center">
              <button
                className="cursor-pointer"
                onClick={() => cancelGoalUpdate()}
              >
                <MdOutlineCancel />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => handleGoalSave(event)}
              >
                <MdCheckCircleOutline />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        {!isGoalEditing && <p className=" text-gray-500 p-2.5">{goalData}</p>}
        {isGoalEditing && (
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5 w-full "
            value={updatedGoal}
            onChange={handleGoalChange}
          />
        )}
        {isError && <ErrorMessage />}
      </div>

      {/* BEHAVIOR DATA */}
      <div className="flex  gap-10">
        <div className="w-3/4 block text-lg font-bold  text-gray-900 ">
          Behavior
        </div>
        <div className="">
          {!isBehaviorEditing && (
            <button
              className="cursor-pointer"
              onClick={() => setIsBehaviorEditing(true)}
            >
              <MdOutlineEdit />
            </button>
          )}
          {isBehaviorEditing && (
            <div className=" flex text-lg gap-1 items-center">
              <button
                className="cursor-pointer"
                onClick={() => cancelBehaviorUpdate()}
              >
                <MdOutlineCancel />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => handleBehaviorSave(event)}
              >
                <MdCheckCircleOutline />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        {!isBehaviorEditing && (
          <p className=" text-gray-500 p-2.5">{behaviorData}</p>
        )}
        {isBehaviorEditing && (
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5 w-full "
            value={updatedBehavior}
            onChange={handleBehaviorChange}
          />
        )}
      </div>

      {/* WHEN DATA */}
      <div className="flex  gap-10">
        <div className="w-3/4 block text-lg font-bold  text-gray-900 ">
          When
        </div>
        <div className="">
          {!isWhenEditing && (
            <button
              className="cursor-pointer"
              onClick={() => setIsWhenEditing(true)}
            >
              <MdOutlineEdit />
            </button>
          )}
          {isWhenEditing && (
            <div className=" flex text-lg gap-1 items-center">
              <button
                className="cursor-pointer"
                onClick={() => cancelWhenUpdate()}
              >
                <MdOutlineCancel />
              </button>
              <button
                className="cursor-pointer"
                onClick={() => handleWhenSave(event)}
              >
                <MdCheckCircleOutline />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        {!isWhenEditing && <p className=" text-gray-500 p-2.5">{whenData}</p>}
        {isWhenEditing && (
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5 w-full "
            value={updatedWhen}
            onChange={handleWhenChange}
          />
        )}
      </div>

      {/* SAVE BUTTON */}
      <div>
        <button
          onClick={handleSave}
          disabled={isSaveDisabled}
          className={
            isSaveDisabled ? disabledSaveClassName : enabledSaveClassName
          }
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
