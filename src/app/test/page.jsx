import Image from "next/image";
import landing from "../../../public/landing.png";

export default function page() {
  return (
    <div className="bg-[url(/landing.png)] h-screen flex bg-bottom bg-no-repeat">
     
      <div className="border border-red-400 flex-col  w-1/2 h-full content-center">
        <div className="mt-10   h-1/2  w-1/2 justify-self-center">
          <div className="mt-6 mb-10 content-end h-1/4 text-6xl text-blue-900">
            Habitude
          </div>

          <div className="mb-10  text-lg">
            This isn't just another checklist - it's a tool for real growth.
          </div>
          <div className=" ">
            <ul className=" text-sm">
              <li>🎯 Set habits tied to meaningful goals</li>
              <li>📊 Track your progress with visual feedback</li>
              <li>🔁 Build routines that support consistency</li>
              <li>🧩 Keep streaks and achieve milestones</li>
              <li>🤝 Join the community and stay motivated</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border border-green-500 w-1/2"> clasdf</div>

    </div>
  );
}
