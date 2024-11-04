import { Outlet, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/iviewlogo.png";

const AdminLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/admin-dashboard";
  const [activeMenu, setActiveMenu] = useState("questions");

  return (
    <div className="flex bg-blue min-h-screen">
      {/* Sol Menü */}
      <div className="w-65 p-8 shadow-xl flex flex-col items-start bg-gradient-to-t from-[#207c6c] to-white">
        <img src={logo} alt="iView Logo" className="w-40 h-auto mb-6 ml-16 mt-55" />

        {/* İnce ve animasyonlu çizgi */}
        <div className="w-full h-1 bg-transparent relative mb-8">
          <div className="absolute w-full h-1 items-start bg-gradient-to-t from-[#207c6c] to-white ml-1 "></div>
          <div className="absolute w-0 h-1 bg-gray-500 hover:w-full transition-all duration-700"></div>
        </div>

        {/* Menü Linkleri */}
        <ul className="space-y-6">
          <li>
            <Link
              to="/admin-dashboard/questions"
              className="ml-2 block text-lg font-medium text-black py-2 px-4 rounded-lg hover:bg-[#88d3cf] hover:text-gray-700 hover:underline hover:shadow-lg transition-all duration-300 relative"
            >
              Manage Question Package
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-[#88d3cf] transition-all duration-500 hover:w-full "></span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/interviews"
              className="ml-2 block text-lg font-medium text-black py-2 px-4 rounded-lg hover:bg-[#88d3cf] hover:text-gray-700 hover:underline hover:shadow-lg transition-all duration-300 relative"
            >
              Interview List
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-500 hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </div>

      {/* İçerik Alanı */}
      <div className="flex-1 px-3 py-6 bg-white items-start bg-gradient-to-t from-[#207c6c] to-white ">
        {isHomePage && (
          <h1 className="text-4xl text-gray-800 font-semibold">Hoş Geldin!</h1>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
