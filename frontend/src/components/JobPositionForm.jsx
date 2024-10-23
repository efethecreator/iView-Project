// Interview frontend component linked with interview store
import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaInfoCircle, FaCopy, FaTrashAlt } from 'react-icons/fa';
import useInterviewStore from '../store/useInterviewStore';

// Interview Information Popup
const InterviewInfoPopup = ({ interview, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="min-h-[200px] min-w-[300px] bg-white p-4 rounded shadow-md">
      <h2 className="text-black font-bold mb-4">Interview Info</h2>
      <p><strong>Title:</strong> {interview.interviewTitle}</p>
      <p><strong>Expire Date:</strong> {interview.expireDate}</p>
      <p><strong>Selected Packages:</strong> {interview.packages?.join(', ') || 'None'}</p>
      <p><strong>Can Skip:</strong> {interview.canSkip ? 'Yes' : 'No'}</p>
      <p><strong>Show At Once:</strong> {interview.showAtOnce ? 'Yes' : 'No'}</p>
      <button onClick={onClose} className="bg-blue-500 text-white rounded p-2 mt-4">Close</button>
    </div>
  </div>
);

// Soru Ekleme Popup'ı
const AddQuestionPopup = ({ onClose, onSubmit }) => {
  const [questionText, setQuestionText] = useState('');
  const [timeLimit, setTimeLimit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ questionText, timeLimit });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="min-h-[200px] min-w-[300px] bg-white p-4 rounded shadow-md">
        <h2 className="text-black font-bold mb-4">Soru Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">Soru:</label>
            <input
              type="text"
              className="border border-gray-200 rounded p-2 w-full"
              placeholder="Soru metni..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">Zaman Limiti (dk):</label>
            <input
              type="number"
              className="border border-gray-200 rounded p-2 w-full"
              placeholder="Dakika"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-red-500 text-white rounded p-2">
              İptal
            </button>
            <button type="submit" className="bg-blue-500 text-white rounded p-2">
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
  const [interviewTitle, setInterviewTitle] = useState('');
  const [expireDate, setExpireDate] = useState('');
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
    onSubmit({
      interviewTitle,
      expireDate,
      packages: selectedPackages,
      extraQuestions,
      canSkip,
      showAtOnce,
      isPublished: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="min-h-[400px] min-w-[500px] bg-white p-4 rounded shadow-md">
        <h2 className="text-black font-bold mb-4">Create Interview</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">Interview Title:</label>
            <input
              type="text"
              className="border border-gray-200 rounded p-2 w-full"
              placeholder="input..."
              value={interviewTitle}
              onChange={(e) => setInterviewTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">Expire Date:</label>
            <input
              type="date"
              className="border border-gray-300 rounded p-2 w-full"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Package</label>
            <select
              className="border p-2 rounded-md w-full block text-black-200 font-semibold mb-1"
              onChange={(e) => {
                const selectedPackage = e.target.value;
                if (selectedPackage && !selectedPackages.includes(selectedPackage)) {
                  setSelectedPackages([...selectedPackages, selectedPackage]);
                }
              }}
              value=""
            >
              <option value="" disabled>Select Package</option>
              {questionPackages.map(pkg => (
                <option key={pkg._id} value={pkg.title}>{pkg.title}</option>
              ))}
            </select>

            {/* Seçilen paketleri gösterme */}
            <div className="flex flex-wrap mt-2">
              {selectedPackages.map((pkg) => (
                <div key={pkg} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center">
                  <span>{pkg}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => setSelectedPackages(selectedPackages.filter(p => p !== pkg))}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Soru Ekleme Butonu */}
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">Extra Questions</label>
            <button
              type="button"
              className="flex items-center text-blue-500 text-sm"
              onClick={() => setIsAddQuestionPopupOpen(true)}
            >
              <FaPlus className="mr-1" />
              Soru Ekle
            </button>

            {/* Eklenen soruları gösterme */}
            <div className="mt-2">
              {extraQuestions.map((question, index) => (
                <div key={index} className="bg-gray-200 p-2 rounded mt-1 flex justify-between">
                  <span>{`${question.questionText} (Zaman Limiti: ${question.timeLimit} dk)`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div>
              <label className="block text-black font-semibold mb-1">Can Skip</label>
              <input
                type="checkbox"
                checked={canSkip}
                onChange={() => setCanSkip(!canSkip)}
                className="border p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-black font-semibold mb-1">Show At Once</label>
              <input
                type="checkbox"
                checked={showAtOnce}
                onChange={() => setShowAtOnce(!showAtOnce)}
                className="border p-2 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-red-500 text-white rounded p-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white rounded p-2">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Soru Ekleme Popup'ı Açık mı? */}
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
  const { interviews, fetchInterviews, createInterview, deleteInterview } = useInterviewStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [questionPackages, setQuestionPackages] = useState([]);
  const [showInfo, setShowInfo] = useState(null);

  useEffect(() => {
    const loadQuestionPackages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/packages');
        const data = await response.json();
        setQuestionPackages(data);
      } catch (error) {
        console.error('Error loading question packages:', error);
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
    const link = `http://yourapp.com/interview/${id}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const handleDelete = async (id) => {
    await deleteInterview(id);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-bold mr-4">Interview List</h2>
        <button onClick={handleAddJobPosition} className="bg-blue-500 text-white rounded p-2">
          + Create Interview
        </button>
      </div>

      {isPopupOpen && (
        <Popup
          onClose={handlePopupClose}
          onSubmit={handleSubmit}
          questionPackages={questionPackages}
        />
      )}

      <div className="grid grid-cols-2 gap-4">
        {interviews && interviews.map((interview) => (
          <div key={interview._id} className="border rounded p-4 shadow-md relative">
            <div className="absolute top-2 left-2 cursor-pointer" onClick={() => setShowInfo(interview)}>
              <FaInfoCircle />
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <FaCopy className="cursor-pointer" onClick={() => handleCopyLink(interview._id)} />
              <FaTrashAlt className="cursor-pointer" onClick={() => handleDelete(interview._id)} />
            </div>
            <h3 className="text-black font-bold mb-2">{interview.interviewTitle}</h3>
            <p>Total: {interview.extraQuestions?.length || 0} videos</p>
            <p>On Hold: {Math.floor(Math.random() * (interview.extraQuestions?.length || 0))}</p>
            <div className="flex justify-between mt-4">
              <span>{interview.isPublished ? 'Published' : 'Unpublished'}</span>
              <button className="bg-blue-500 text-white rounded p-2">See Videos</button>
            </div>
          </div>
        ))}
      </div>

      {showInfo && (
        <InterviewInfoPopup
          interview={showInfo}
          onClose={() => setShowInfo(null)}
        />
      )}
    </div>
  );
};

export default JobPositionForm;
