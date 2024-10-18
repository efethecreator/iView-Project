import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa'; // FaTimes ve FaPlus ikonlarını kullanabilmek için react-icons kütüphanesini ekleyin

// Popup bileşeni
const Popup = ({ onClose, onSubmit, questionPackages }) => {
  const [interviewTitle, setInterviewTitle] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [selectedPackages, setSelectedPackages] = useState([]); // Seçilen paketleri tutan state
  const [extraQuestion, setExtraQuestion] = useState('');
  const [canSkip, setCanSkip] = useState(false);
  const [showAtOnce, setShowAtOnce] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      interviewTitle,
      expireDate,
      packages: selectedPackages,
      extraQuestion,
      canSkip,
      showAtOnce,
    });
    onClose(); // Popup'ı kapat
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="min-h-[350px] min-w-[400px] bg-white p-4 rounded shadow-md">
        <h2 className="text-black font-bold mb-4">Create Interview</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-black block text-sm font-semibold mb-1">Interview Title:</label>
            <input
              type="text"
              className="border border-gray-200 rounded p-2 w-full"
              placeholder='input...'
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
          <div className="mb-4 text-black block text-sm font-semibold mb-1">
            <label className="block text-sm font-semibold mb-1">Package</label>
            <select
              className="border p-2 rounded-md w-full block text-gray-200 font-semibold mb-1"
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
            <div className="flex flex-wrap mt-2 ">
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

          <div className="flex justify-end mb-4">
            <button
              className="flex items-center text-blue-500 text-sm"
              onClick={() => {/* Buraya soru ekleme popup açma işlevini ekleyin */}} 
            >
              <FaPlus className="mr-1" />
              Soru Ekle
            </button>
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
    </div>
  );
};

// Ana bileşen
const JobPositionForm = ({ addJobPosition }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [questionPackages, setQuestionPackages] = useState([]);

  useEffect(() => {
    // Soru paketlerini yüklemek için bir API çağrısı yapabilirsiniz.
    const loadQuestionPackages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/packages');
        const data = await response.json();
        setQuestionPackages(data); // API'den gelen soru paketlerini state'e kaydedin
      } catch (error) {
        console.error('Error loading question packages:', error);
      }
    };

    loadQuestionPackages();
  }, []);

  const handleAddJobPosition = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (data) => {
    console.log('Interview Data:', data); // Form verilerini işleyin
    addJobPosition(); // İşe alma pozisyonunu ekle
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-bold mr-4">Interview List</h2>
        <button
          onClick={handleAddJobPosition}
          className="bg-blue-500 text-white rounded p-2"
        >
          Add
        </button>
      </div>

      {isPopupOpen && (
        <Popup 
          onClose={handlePopupClose} 
          onSubmit={handleSubmit} 
          questionPackages={questionPackages} // Soru paketlerini Popup'a geçir
        />
      )}
    </div>
  );
};

export default JobPositionForm;
