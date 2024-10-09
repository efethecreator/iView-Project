import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('questions');

  return (
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
  );
};

export default Sidebar;
