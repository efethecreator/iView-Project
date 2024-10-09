import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('questions');
  const location = useLocation(); // Mevcut URL'yi almak için useLocation kullanıyoruz

  const isHomePage = location.pathname === '/admin-dashboard'; // Ana sayfa kontrolü

  return (
    <div className="flex bg-gray-800 min-h-screen">
      {/* Sol Menü */}
      <div className="w-64 bg-gray-900 p-4">
        <h1 className="text-white text-2xl mb-4">iView Admin Panel</h1>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin-dashboard/questions"
              className={`block p-2 rounded hover:bg-gray-700 ${activeMenu === 'questions' ? 'bg-gray-700' : 'text-gray-400'}`}
              onClick={() => setActiveMenu('questions')}
            >
              Manage Question Package
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/interviews"
              className={`block p-2 rounded hover:bg-gray-700 ${activeMenu === 'interviews' ? 'bg-gray-700' : 'text-gray-400'}`}
              onClick={() => setActiveMenu('interviews')}
            >
              Interview List
            </Link>
          </li>
        </ul>
      </div>

      {/* Sağ İçerik Alanı */}
      <div className="flex-1 p-8">
        {isHomePage && <h1 className="text-3xl text-white">Hoş Geldin!</h1>} {/* Ana sayfada göster */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
