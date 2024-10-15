import React, { useEffect } from 'react';
import QuestionManagement from '../components/QuestionManagement';
import useQuestionStore from '../stores/useQuestionStore';
import { Link } from 'react-router-dom';

const ManageQuestions = () => {
  const [fetchQuestionPackages, questionPackages] = useQuestionStore();
  

  useEffect(() => {
    fetchQuestionPackages();
  }, [fetchQuestionPackages]);

  return (
    <div className="flex">
      <div className="w-64 bg-gray-900 p-4">
        <h2 className="text-2xl text-white">Admin Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin-dashboard/questions"
              className="block p-2 rounded hover:bg-gray-700 text-gray-400"
            >
              Manage Question Package
            </Link>
          </li>
        </ul>

        <h2 className="text-2xl text-white">Question Packages</h2>
        <ul className="space-y-2">
          {questionPackages.map((pkg) => (
            <li key={pkg.id}>
              <Link
                to={`/admin-dashboard/questions/${pkg.id}`}
                className="block p-2 rounded hover:bg-gray-700 text-gray-400"
              >
                {pkg.question}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow p-4">
        <QuestionManagement />
      </div>
    </div>
  );
};

export default ManageQuestions;
