// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import SideBar from "../components/SideBar.jsx";

const Layout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-50">
        <Navbar />
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex pt-16 h-full">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-60 bg-gray-100 border-r z-40 mt-5 py-10 text-white">
          <SideBar />
        </aside>

        {/* Main Scrollable Content */}
        <main className="ml-60 mt-0 w-[calc(100%-15rem)] h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
