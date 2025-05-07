// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import SideBar from "../components/SideBar.jsx";

const Layout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[250px_1fr] min-h-screen">
      {/* Navbar spans full width of top row */}
      <div className="row-start-1 row-end-2 col-start-1 col-end-3">
        <Navbar />
      </div>

      {/* Sidebar on left */}
      <div className="row-start-1 row-end-3 col-start-1 col-end-2 border-r pt-28 text-white px-4 ">
        <SideBar />
      </div>

      {/* Main content on right */}
      <main className="row-start-2 row-end-3 col-start-2 col-end-3 py-32 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
