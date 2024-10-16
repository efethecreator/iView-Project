import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useQuestionStore from "../store/questionStore";

const ManagePackage = () => {
  const { packageId } = useParams(); // Paketin ID'sini almak için
  const navigate = useNavigate();
  const { questionPackages, addQuestionToPackage, updateQuestionPackage, fetchQuestionPackages } = useQuestionStore();
  const [packageData, setPackageData] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newTime, setNewTime] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const selectedPackage = questionPackages.find((pkg) => pkg._id === packageId);
    if (selectedPackage) {
      setPackageData(selectedPackage);
      setNewTitle(selectedPackage.title);
    }
  }, [packageId, questionPackages]);

  const handleSave = async () => {
    await updateQuestionPackage(packageId, newTitle); // Paketi güncelle
    navigate("/"); // Ana sayfaya dön
  };

  const handleAddQuestion = async () => {
    if (newQuestion.trim() && newTime.trim()) {
      await addQuestionToPackage(packageId, newQuestion, newTime);
      setIsPopupOpen(false);
      setNewQuestion("");
      setNewTime("");
    }
  };

  return (
    <div className="p-4">
      {packageData && (
        <>
          <h2 className="text-2xl text-white mb-4">Edit Package: {packageData.title}</h2>

          <div className="flex items-center mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded p-2 mr-2"
              placeholder="Package name..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white rounded p-2"
            >
              Save
            </button>
          </div>

          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Order</th>
                <th className="px-4 py-2">Question</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {packageData.questions.map((question, index) => (
                <tr key={question._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{question.text}</td>
                  <td className="border px-4 py-2">{question.time}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-red-500 text-white rounded px-2 py-1">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-green-500 text-white rounded p-2 mt-4"
          >
            Add Question
          </button>

          {/* Pop-up */}
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
              <div className="bg-white p-4 rounded shadow-lg">
                <h3 className="text-xl mb-4">Add a New Question</h3>
                <input
                  type="text"
                  placeholder="Enter question..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="border border-gray-300 rounded p-2 mb-4 w-full"
                />
                <input
                  type="text"
                  placeholder="Enter time..."
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="border border-gray-300 rounded p-2 mb-4 w-full"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddQuestion}
                    className="bg-blue-500 text-white rounded p-2"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="bg-red-500 text-white rounded p-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManagePackage;
