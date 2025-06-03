import React from "react";

export default function Description({ title, description }) {
  return (
    <div className="w-1/2 flex flex-col bg-white  shadow-2xl rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-800 ">{title}</h3>

      <p className="mt-2 text-gray-500 ">{description}</p>
    </div>
  );
}
