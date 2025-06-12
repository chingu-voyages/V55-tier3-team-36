import DashboardHeader from "@/components/DashboardHeader";
import NavBar from "@/components/NavBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex-col">
      <div className="">
        <DashboardHeader />
      </div>

      <div className=" flex w-screen h-full fixed">
        <div className="bg-blue-100 w-1/4">
          <NavBar />
        </div>

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
