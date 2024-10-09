import { useState } from 'react';
import { Link } from 'react-router-dom';

const InterviewList = () => {
  const [activeMenu, setActiveMenu] = useState('interviews');

  return (
    <div>
      <h2 className="text-2xl text-white">Interview List</h2>
      <ul className="space-y-2">
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

export default InterviewList;
