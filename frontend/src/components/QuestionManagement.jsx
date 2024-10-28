import React, { useEffect, useState } from 'react';
import useQuestionStore from '../store/questionStore';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa'; // React icons
import { motion } from 'framer-motion'; // For advanced animations

const QuestionManagement = () => {
  const {
    questionPackages = [], // Varsayılan olarak boş bir dizi atıyoruz
    createQuestionPackage,
    deleteQuestionPackage,
    fetchQuestionPackages,
  } = useQuestionStore();


  const [newPackageTitle, setNewPackageTitle] = useState("");

  const addQuestionPackage = async () => {
    if (newPackageTitle.trim() === "") return;
    await createQuestionPackage(newPackageTitle);
    setNewPackageTitle("");
  };

  useEffect(() => {
    fetchQuestionPackages();
  }, [fetchQuestionPackages]);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <h2 className="text-3xl text-gray-800 mb-6 font-semibold text-center">
        Manage Question Packages
      </h2>

      {/* New Package Input Area */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg mb-8">
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-3 w-full mr-4 focus:outline-none focus:ring focus:ring-blue-200 transition-all"
          placeholder="Enter new package name..."
          value={newPackageTitle}
          onChange={(e) => setNewPackageTitle(e.target.value)}
        />
        <motion.button
          onClick={addQuestionPackage}
          className="text-blue-500 hover:text-blue-700 transition-colors p-3"
          whileHover={{ rotate: 15, scale: 1.2 }}
          whileTap={{ rotate: -15, scale: 0.9 }}
        >
          <FaPlus className="text-3xl" />
        </motion.button>
      </div>

      {/* Question Packages Table */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-gray-600 font-medium">#</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Package Name</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Question Count</th>
              <th className="px-6 py-3 text-gray-600 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {questionPackages.map((pkg, index) => (
              <tr
                key={pkg._id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-gray-700">{pkg.title}</td>
                <td className="px-6 py-4 text-gray-700">{pkg.questions.length}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <motion.button
                    onClick={() => deleteQuestionPackage(pkg._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    whileTap={{ rotate: -15, scale: 0.9 }}
                  >
                    <FaTrash className="text-xl" />
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      window.location.href = `/admin-dashboard/questions/manage/${pkg._id}`;
                    }}
                    className="text-yellow-500 hover:text-yellow-700 transition-colors"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    whileTap={{ rotate: -15, scale: 0.9 }}
                  >
                    <FaEdit className="text-xl" />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionManagement;
