import React, { useEffect, useState } from 'react';
import useQuestionStore from '../store/questionStore'; // Store'u içe aktar

const QuestionManagement = () => {
  const {
    questionPackages,
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
    fetchQuestionPackages(); // Paketleri yükleme
  }, [fetchQuestionPackages]);

  return (
    <div>
      <h2 className="text-2xl text-white mb-4">Manage Question Package</h2>

      <div className="flex items-center mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 mr-2"
          placeholder="Yeni soru paketi adı..."
          value={newPackageTitle}
          onChange={(e) => setNewPackageTitle(e.target.value)}
        />
        <button
          onClick={addQuestionPackage}
          className="bg-blue-500 text-white rounded p-2"
        >
          +
        </button>
      </div>

      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Package Name</th>
            <th className="px-4 py-2">Question Count</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {questionPackages.map((pkg, index) => (
            <tr key={pkg._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{pkg.title}</td>
              <td className="border px-4 py-2">{pkg.questions.length}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteQuestionPackage(pkg._id)}
                  className="bg-red-500 text-white rounded px-2 py-1"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    // Edit butonuna tıklandığında yönlendirme yapılacak
                    window.location.href = `/admin-dashboard/questions/manage/${pkg._id}`;
                  }}
                  className="bg-yellow-500 text-white rounded px-2 py-1 ml-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionManagement;
