import React from "react";

export default function Tagline({ tagline }) {
  return (
    <div>
      <p className="text-gray-500 mb-18 text-lg w-3/4 p-4 justify-self-center">
        {tagline}
      </p>
    </div>
  );
}
