import { Outlet, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

const AdminLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/admin-dashboard';
  const [activeMenu, setActiveMenu] = useState('questions');

  return (
    <div className="flex bg-blue min-h-screen">
      {/* Sol Menü */}
      <div className="w-85 bg-white p-8 shadow-xl flex flex-col items-start">
        <h1 className="text-gray-800 text-3xl font-bold relative mb-6">iView Admin Panel</h1>

        {/* İnce ve animasyonlu çizgi */}
        <div className="w-full h-1 bg-transparent relative mb-8">
          <div className="absolute w-full h-1 bg-gray-300 transition-all duration-500"></div>
          <div className="absolute w-0 h-1 bg-gray-500 hover:w-full transition-all duration-700"></div>
        </div>

        {/* Menü Linkleri */}
        <ul className="space-y-6">
          <li>
            <Link
              to="/admin-dashboard/questions"
              className="block text-lg font-medium text-gray-700 py-2 px-4 rounded-lg hover:bg-blue-100 hover:text-blue-600 hover:underline hover:shadow-lg transition-all duration-300 relative"
            >
              Manage Question Package
              {/* Hover sırasında underline */}
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-500 hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/interviews"
              className="block text-lg font-medium text-gray-700 py-2 px-4 rounded-lg hover:bg-blue-100 hover:text-blue-600 hover:underline hover:shadow-lg transition-all duration-300 relative"
            >
              Interview List
              {/* Hover sırasında underline */}
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-500 transition-all duration-500 hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </div>

      {/* İçerik Alanı */}
      <div className="flex-1 p-10 bg-white shadow-lg">
        {isHomePage && <h1 className="text-4xl text-gray-800 font-semibold">Hoş Geldin!</h1>}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
