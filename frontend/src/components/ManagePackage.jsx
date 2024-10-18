import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useQuestionStore from "../store/questionStore";

const ManagePackage = () => {
  const { packageId } = useParams(); // Paketin ID'sini almak için
  const navigate = useNavigate();
  const { questionPackages, updateQuestionPackage, fetchQuestionPackages } = useQuestionStore();
  const [packageData, setPackageData] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newTime, setNewTime] = useState("");
  const [tempQuestions, setTempQuestions] = useState([]); // Yeni soruları geçici olarak tutacağımız liste
  const [deletedQuestions, setDeletedQuestions] = useState([]); // Silinen soruların ID'lerini tutacak liste
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const selectedPackage = questionPackages.find((pkg) => pkg._id === packageId);
    if (selectedPackage) {
      setPackageData(selectedPackage);
      setNewTitle(selectedPackage.title);
    }
  }, [packageId, questionPackages]);

  const handleSave = async () => {
    if (packageData) {
      const updatedData = {
        questions: [
          ...packageData.questions.filter(question => !deletedQuestions.includes(question._id)), // Silinenleri filtrele
          ...tempQuestions, // Yeni eklenen soruları ekle
        ],
        title: newTitle,
      };

      console.log("Updated data", updatedData);
      await updateQuestionPackage(packageId, updatedData);
      setTempQuestions([]); // Kaydettikten sonra geçici listeyi temizleyelim
      setDeletedQuestions([]); // Silinen soruları temizle
      navigate("/admin-dashboard/questions");
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() && newTime.trim()) {
      const newQ = { question: newQuestion, time: newTime }; // Yeni soru
      setTempQuestions((prevQuestions) => [...prevQuestions, newQ]);
      setIsPopupOpen(false);
      setNewQuestion("");
      setNewTime("");
    }
  };

  // Soru silme işlemi
  const handleDeleteQuestion = (questionId) => {
    // Geçici listeden sil
    setTempQuestions((prevQuestions) => prevQuestions.filter(q => q.question !== questionId));
    
    // Silinen sorunun ID'sini tut
    setDeletedQuestions((prevDeleted) => [...prevDeleted, questionId]);
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
                <th className="px-4 py-2">Questions</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {packageData.questions.filter(question => !deletedQuestions.includes(question._id)).map((question, index) => (
                <tr key={question._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{question.question}</td>
                  <td className="border px-4 py-2">{question.time}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white rounded px-2 py-1"
                      onClick={() => handleDeleteQuestion(question._id)} // Soruyu silme işlemi burada yapılıyor
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {/* Geçici olarak eklenen sorular */}
              {tempQuestions.map((question, index) => (
                <tr key={`temp-${index}`}>
                  <td className="border px-4 py-2">{packageData.questions.length + index + 1}</td>
                  <td className="border px-4 py-2">{question.question}</td>
                  <td className="border px-4 py-2">{question.time}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-red-500 text-white rounded px-2 py-1"
                      onClick={() => handleDeleteQuestion(question.question)} // Geçici soruyu silme işlemi
                    >
                      Delete
                    </button>
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
