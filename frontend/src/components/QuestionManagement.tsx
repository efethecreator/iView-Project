import React, { useState } from 'react';

// Soru Arayüzü
interface Question {
  id: number;
  text: string;
  duration: number; // Soru süresi
}

// Soru Paketi Arayüzü
interface QuestionPackage {
  id: number;
  title: string;
  questions: Question[];
}

// Soru Yönetimi Bileşeni
const QuestionManagement: React.FC = () => {
  const [questionPackages, setQuestionPackages] = useState<QuestionPackage[]>([]);
  const [newPackageTitle, setNewPackageTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<QuestionPackage | null>(null);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionDuration, setNewQuestionDuration] = useState<number>(1);

  // Soru Paketi Ekleme
  const addQuestionPackage = () => {
    if (newPackageTitle.trim() === '') return;

    const newPackage: QuestionPackage = {
      id: questionPackages.length + 1,
      title: newPackageTitle,
      questions: [],
    };

    setQuestionPackages([...questionPackages, newPackage]);
    setNewPackageTitle('');
  };

  // Soru Ekleme
  const addQuestion = () => {
    if (!currentPackage || newQuestionText.trim() === '') return;

    const newQuestion: Question = {
      id: currentPackage.questions.length + 1,
      text: newQuestionText,
      duration: newQuestionDuration,
    };

    const updatedPackage = {
      ...currentPackage,
      questions: [...currentPackage.questions, newQuestion],
    };

    setQuestionPackages(
      questionPackages.map((pkg) => (pkg.id === updatedPackage.id ? updatedPackage : pkg))
    );
    setNewQuestionText('');
    setNewQuestionDuration(1);
    setShowModal(false);
  };

  // Düzenleme Modülünü Göster
  const openEditModal = (pkg: QuestionPackage) => {
    setCurrentPackage(pkg);
    setShowModal(true);
  };

  return (
    <div>
      <h2 className="text-2xl text-white mb-4">Soru Yönetimi</h2>
      <p className="text-gray-300">Burada mülakatta kullanılacak soru paketlerini düzenleyebilirsin.</p>
      
      {/* Yeni Soru Paketi Ekleme Alanı */}
      <div className="flex mb-4">
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

      {/* Soru Paketleri Listesi */}
      <div className="space-y-4">
        {questionPackages.map((pkg) => (
          <div key={pkg.id} className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-xl text-white">{pkg.title}</h3>
            <ul className="list-disc list-inside mb-2">
              {pkg.questions.map((question) => (
                <li key={question.id} className="text-gray-300">
                  {question.text} (Süre: {question.duration} dakika)
                </li>
              ))}
            </ul>
            <button
              onClick={() => openEditModal(pkg)}
              className="bg-green-500 text-white rounded p-2"
            >
              Düzenle
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl text-white mb-4">Soru Ekle</h2>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              placeholder="Soru yazın..."
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
            />
            <input
              type="number"
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              placeholder="Süre (dakika)"
              value={newQuestionDuration}
              onChange={(e) => setNewQuestionDuration(Number(e.target.value))}
            />
            <div className="flex justify-between">
              <button
                onClick={addQuestion}
                className="bg-blue-500 text-white rounded p-2"
              >
                Ekle
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white rounded p-2"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionManagement;
