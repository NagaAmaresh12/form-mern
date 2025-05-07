// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import SideBar from "../components/SideBar.jsx";

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      {/* Navbar spans full width of top row */}
      <div className="w-full h-24 ">
        <Navbar />
      </div>

      <div className="relative flex items-start h-[84vh] w-full">
        {/* Sidebar on left */}
        <div className=" border-r pt-8 h-full w-64 text-white px-4 ">
          <SideBar />
        </div>

        {/* Main content on right */}
        <main className="relative h-full w-full bg-[#EFEFEF] relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
