// Interview frontend component linked with interview store
import React, { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaInfoCircle, FaCopy, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useInterviewStore from "../store/useInterviewStore";

const InterviewInfoPopup = ({ interviewId, onClose }) => {
  const { interviewQuestions, fetchInterviewQuestions } = useInterviewStore();

  useEffect(() => {
    if (interviewId) {
      fetchInterviewQuestions(interviewId);
    }
  }, [interviewId, fetchInterviewQuestions]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold text-teal-700 mb-4">
          Package Questions
        </h2>
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <ul className="space-y-4">
          {interviewQuestions.map((q, index) => (
            <li
              key={q._id || index}
              className="bg-gray-100 p-4 rounded-lg shadow"
            >
              <p className="font-semibold">
                {index + 1}: {q.question}
              </p>
              <p className="text-sm text-gray-600">{q.time} min</p>
              <p className="text-xs text-gray-500">
                {q.packageTitle
                  ? `Package: ${q.packageTitle}`
                  : "Extra Question"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Soru Ekleme Popup'ı
const AddQuestionPopup = ({ onClose, onSubmit }) => {
  const [questionText, setQuestionText] = useState("");
  const [timeLimit, setTimeLimit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ questionText, timeLimit });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="min-h-[200px] min-w-[300px] bg-white p-4 rounded shadow-md">
        <h2 className="text-black font-bold mb-4">Soru Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">
              Soru:
            </label>
            <input
              type="text"
              className="border border-gray-200 rounded p-2 w-full"
              placeholder="Soru metni..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">
              Zaman Limiti (dk):
            </label>
            <input
              type="number"
              className="border border-gray-200 rounded p-2 w-full"
              placeholder="Dakika"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white rounded p-2"
            >
              İptal
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2"
            >
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Popup for creating a new interview
const Popup = ({ onClose, onSubmit, questionPackages }) => {
  const [interviewTitle, setInterviewTitle] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [extraQuestions, setExtraQuestions] = useState([]);
  const [canSkip, setCanSkip] = useState(false);
  const [showAtOnce, setShowAtOnce] = useState(false);
  const [isAddQuestionPopupOpen, setIsAddQuestionPopupOpen] = useState(false);

  const handleAddQuestion = (question) => {
    setExtraQuestions([...extraQuestions, question]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const interviewData = {
      title: interviewTitle,
      expireDate: new Date(expireDate).toISOString(),
      packages: selectedPackages.map((pkg) => ({
        packageId: pkg._id, // packagesSchema'nın gerektirdiği packageId alanına uygun
      })),
      questions: extraQuestions.map((q) => ({
        question: q.questionText,
        time: q.timeLimit,
      })),
      canSkip,
      showAtOnce,
    };

    onSubmit(interviewData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="min-h-[400px] min-w-[500px] bg-white p-4 rounded shadow-md">
        <h2 className="text-black font-bold mb-4">Create Interview</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">
              Interview Title:
            </label>
            <input
              type="text"
              className="border border-gray-200 rounded p-2 w-full"
              placeholder="input..."
              value={interviewTitle}
              onChange={(e) => setInterviewTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">
              Expire Date:
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded p-2 w-full"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Package</label>
            <select
              className="border p-2 rounded-md w-full block text-black-200 font-semibold mb-1"
              onChange={(e) => {
                const selectedPackageId = e.target.value;
                const selectedPackage = questionPackages.find(
                  (pkg) => pkg._id === selectedPackageId
                );
                if (
                  selectedPackage &&
                  !selectedPackages.some((pkg) => pkg._id === selectedPackageId)
                ) {
                  setSelectedPackages([...selectedPackages, selectedPackage]);
                }
              }}
              value=""
            >
              <option value="" disabled>
                Select Package
              </option>
              {questionPackages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.title}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap mt-2">
              {selectedPackages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center"
                >
                  <span>{pkg.title}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() =>
                      setSelectedPackages(
                        selectedPackages.filter((p) => p._id !== pkg._id)
                      )
                    }
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Extra Questions */}
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">
              Extra Questions
            </label>
            <button
              type="button"
              className="flex items-center text-blue-500 text-sm"
              onClick={() => setIsAddQuestionPopupOpen(true)}
            >
              <FaPlus className="mr-1" />
              Add Question
            </button>

            <div className="mt-2">
              {extraQuestions.map((question, index) => (
                <div
                  key={index}
                  className="bg-gray-200 p-2 rounded mt-1 flex justify-between"
                >
                  <span>{`${question.questionText} (Time Limit: ${question.timeLimit} mins)`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Options: Can Skip and Show At Once */}
          <div className="flex justify-between mb-4">
            <div>
              <label className="block text-black font-semibold mb-1">
                Can Skip
              </label>
              <input
                type="checkbox"
                checked={canSkip}
                onChange={() => setCanSkip(!canSkip)}
                className="border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-black font-semibold mb-1">
                Show At Once
              </label>
              <input
                type="checkbox"
                checked={showAtOnce}
                onChange={() => setShowAtOnce(!showAtOnce)}
                className="border p-2 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white rounded p-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {isAddQuestionPopupOpen && (
        <AddQuestionPopup
          onClose={() => setIsAddQuestionPopupOpen(false)}
          onSubmit={handleAddQuestion}
        />
      )}
    </div>
  );
};

// Main component to manage interviews and render the list
const JobPositionForm = () => {
  const { interviews, fetchInterviews, createInterview, deleteInterview } =
    useInterviewStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [questionPackages, setQuestionPackages] = useState([]);
  const [showInfo, setShowInfo] = useState(null);

  useEffect(() => {
    const loadQuestionPackages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/packages");
        const data = await response.json();
        setQuestionPackages(data);
      } catch (error) {
        console.error("Error loading question packages:", error);
      }
    };
    loadQuestionPackages();
    fetchInterviews();
  }, [fetchInterviews]);

  const handleAddJobPosition = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = async (data) => {
    await createInterview(data);
    setIsPopupOpen(false);
  };

  const handleCopyLink = (id) => {
    const link = `http://localhost:8000/interview/${id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const handleDelete = async (id) => {
    await deleteInterview(id);
  };

  const getTotalQuestionsCount = (interview) => {
    const extraQuestionsCount = interview.questions?.length || 0;
    const selectedPackage = questionPackages.find(
      (pkg) => pkg.id === interview.selectedPackage
    );
    const packageQuestionsCount = selectedPackage?.questions.length || 0;
    return extraQuestionsCount + packageQuestionsCount;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-3xl text-gray-800 font-semibold">Interview List</h2>
        <motion.button
          onClick={handleAddJobPosition}
          className="text-blue-500 hover:text-blue-700 transition-colors p-3 "
          whileHover={{ rotate: 15, scale: 1.2 }}
          whileTap={{ rotate: -15, scale: 0.9 }}
        >
          <FaPlus className="text-3xl" />
        </motion.button>
      </div>

      {isPopupOpen && (
        <Popup
          onClose={handlePopupClose}
          onSubmit={handleSubmit}
          questionPackages={questionPackages}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {interviews &&
          interviews.map((interview) => (
            <div
              key={interview._id}
              className="bg-white border rounded-lg p-4 shadow-lg relative"
            >
              <div className="absolute top-2 left-2">
                <motion.button
                  onClick={() => setShowInfo(interview._id)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <FaInfoCircle className="text-xl" />
                </motion.button>
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <motion.button
                  onClick={() => handleCopyLink(interview._id)}
                  className="text-green-500 hover:text-green-700 transition-colors"
                  whileHover={{ scale: 1.2, rotate: -15 }}
                >
                  <FaCopy className="text-xl" />
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(interview._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  whileTap={{ rotate: -15, scale: 0.9 }}
                >
                  <FaTrash className="text-xl" />
                </motion.button>
              </div>
              <h3 className="text-black font-semibold mb-2 mt-5 text-2xl">
                {interview.title}
              </h3>
              <p className="text-sm mb-2">Candidates:</p>
              <div className="bg-gray-300 rounded-lg p-2 flex justify-around mb-4">
                <div className="text-center border-l border-gray-400">
                  <p className="text-xs text-gray-600 ml-2">TOTAL</p>
                  <p className="text-xl font-semibold">
                    {getTotalQuestionsCount(interview)}
                  </p>
                </div>
                <div className="text-center border-l border-gray-400">
                  <p className="text-xs text-gray-600 ml-2">ON HOLD</p>
                  <p className="text-xl font-semibold">
                    {Math.floor(
                      Math.random() * getTotalQuestionsCount(interview)
                    )}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-4 items-center text-sm text-gray-500">
                <span>
                  {interview.isPublished ? "Published" : "Unpublished"}
                </span>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() =>
                    (window.location.href = `/admin-dashboard/video-collection/${interview._id}`)
                  }
                >
                  See Videos &gt;
                </button>
              </div>
            </div>
          ))}
      </div>

      {showInfo && (
        <InterviewInfoPopup
          interviewId={showInfo}
          onClose={() => setShowInfo(null)}
        />
      )}
    </div>
  );
};

export default JobPositionForm;