import React, { useState } from 'react';
import QuestionManagement from '../components/QuestionManagement';
import { Link } from 'react-router-dom'; // Eğer routing kullanıyorsanız

const ManageQuestions = () => {
  const [activeMenu, setActiveMenu] = useState('questions');

  return (
    <div className="flex">
      <div className="w-64 bg-gray-900 p-4">
        <h2 className="text-2xl text-white">Admin Dashboard</h2>
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
          {/* Diğer menü öğeleri buraya eklenebilir */}
        </ul>
      </div>

      <div className="flex-grow p-4">
        {/* QuestionManagement componentini burada render ediyoruz */}
        <QuestionManagement />
      </div>
    </div>
  );
};

export default ManageQuestions;
