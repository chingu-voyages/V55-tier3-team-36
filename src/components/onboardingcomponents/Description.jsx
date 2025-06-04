import React from "react";

export default function Description({ title, description }) {
  return (
    <div className=" w-1/2 flex flex-col bg-white  rounded-xl p-6 items-center">
      <div className="w-1/2 ">
        <h3 className=" text-lg font-bold text-gray-800 ">{title}</h3>
        <p className="mt-4 text-gray-500 text-lg">{description}</p>
      </div>
    </div>
  );
}
