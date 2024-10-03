import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('questions');

  return (
    <div className="flex bg-gray-800 min-h-screen">
      {/* Sol Menü */}
      <div className="w-64 bg-gray-900 p-4">
        <h1 className="text-white text-2xl mb-4">Admin Paneli</h1>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin-dashboard/questions"
              className={`block p-2 rounded hover:bg-gray-700 ${activeMenu === 'questions' ? 'bg-gray-700' : 'text-gray-400'}`}
              onClick={() => setActiveMenu('questions')}
            >
              Soru Yönetimi
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard/interviews"
              className={`block p-2 rounded hover:bg-gray-700 ${activeMenu === 'interviews' ? 'bg-gray-700' : 'text-gray-400'}`}
              onClick={() => setActiveMenu('interviews')}
            >
              Aday Mülakatları
            </Link>
          </li>
        </ul>
      </div>

      {/* Sağ İçerik Alanı */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl text-white">Hoş Geldin!</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
