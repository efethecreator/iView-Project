import React, { useState } from 'react';

const QuestionManagement = () => {
  const [questionPackages, setQuestionPackages] = useState([]);
  const [newPackageTitle, setNewPackageTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [expandedPackages, setExpandedPackages] = useState([]); // Açık/kapalı paketleri tutar
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionDuration, setNewQuestionDuration] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Soru Paketi Ekleme
  const addQuestionPackage = () => {
    if (newPackageTitle.trim() === '') return;

    const newPackage = {
      id: questionPackages.length + 1,
      title: newPackageTitle,
      questions: [],
    };

    setQuestionPackages([...questionPackages, newPackage]);
    setNewPackageTitle('');
  };

  // Soru Ekleme/Düzenleme
  const saveQuestion = () => {
    if (!currentPackage || newQuestionText.trim() === '') return;

    let updatedPackage = { ...currentPackage };

    if (currentQuestion) {
      // Mevcut soruyu güncelleme
      updatedPackage.questions = updatedPackage.questions.map((q) =>
        q.id === currentQuestion.id
          ? { ...q, text: newQuestionText, duration: newQuestionDuration }
          : q
      );
    } else {
      // Yeni soru ekleme
      const newQuestion = {
        id: updatedPackage.questions.length + 1,
        text: newQuestionText,
        duration: newQuestionDuration,
      };
      updatedPackage.questions = [...updatedPackage.questions, newQuestion];
    }

    setQuestionPackages(
      questionPackages.map((pkg) =>
        pkg.id === updatedPackage.id ? updatedPackage : pkg
      )
    );
    setNewQuestionText('');
    setNewQuestionDuration(1);
    setShowModal(false);
  };

  // Paket Aç/Kapat
  const togglePackage = (pkgId) => {
    if (expandedPackages.includes(pkgId)) {
      setExpandedPackages(expandedPackages.filter((id) => id !== pkgId));
    } else {
      setExpandedPackages([...expandedPackages, pkgId]);
    }
  };

  // Soru Paketini Seç ve Düzenleme Modülünü Göster
  const openEditModal = (pkg, question) => {
    setCurrentPackage(pkg);
    if (question) {
      setCurrentQuestion(question);
      setNewQuestionText(question.text);
      setNewQuestionDuration(question.duration);
    } else {
      setCurrentQuestion(null);
      setNewQuestionText('');
      setNewQuestionDuration(1);
    }
    setShowModal(true);
  };

  // Soru Paketini Silme
  const deleteQuestionPackage = (pkgId) => {
    setQuestionPackages(questionPackages.filter((pkg) => pkg.id !== pkgId));
  };

  // Soruyu Silme
  const deleteQuestion = (pkgId, questionId) => {
    const updatedPackages = questionPackages.map((pkg) => {
      if (pkg.id === pkgId) {
        return {
          ...pkg,
          questions: pkg.questions.filter((question) => question.id !== questionId),
        };
      }
      return pkg;
    });
    setQuestionPackages(updatedPackages);
  };

  return (
    <div>
      <h2 className="text-2xl text-white mb-4">Manage Question Package</h2>
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
        <button onClick={addQuestionPackage} className="bg-blue-500 text-white rounded p-2">
          +
        </button>
      </div>

      {/* Soru Paketleri Listesi */}
      <div className="space-y-4">
        {questionPackages.map((pkg) => (
          <div key={pkg.id} className="bg-gray-800 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="text-xl text-white cursor-pointer" onClick={() => togglePackage(pkg.id)}>
                {pkg.title}
              </h3>
              {/* Eğer paket açılmamışsa "Delete" butonunu göster */}
              {!expandedPackages.includes(pkg.id) && (
                <button
                  onClick={() => deleteQuestionPackage(pkg.id)}
                  className="bg-red-500 text-white rounded p-1 ml-2"
                >
                  Delete
                </button>
              )}
            </div>

            {/* Soru Paketi İçeriği (Açık olan paketlerde gösterilecek) */}
            {expandedPackages.includes(pkg.id) && (
              <div className="mt-4 space-y-2">
                <h4 className="text-lg text-white">Sorular</h4>
                <ul className="list-disc list-inside mb-2">
                  {pkg.questions.map((question) => (
                    <li key={question.id} className="text-gray-300 flex justify-between">
                      <span>{question.text} (Süre: {question.duration} dakika)</span>
                      <div>
                        <button
                          onClick={() => openEditModal(pkg, question)}
                          className="bg-yellow-500 text-white rounded p-1 ml-2"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => deleteQuestion(pkg.id, question.id)}
                          className="bg-red-500 text-white rounded p-1 ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button onClick={() => openEditModal(pkg)} className="bg-green-500 text-white rounded p-2">
                  Soru Ekle
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl text-white mb-4">
              {currentQuestion ? 'Soruyu Düzenle' : 'Yeni Soru Ekle'}
            </h2>
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
              <button onClick={saveQuestion} className="bg-blue-500 text-white rounded p-2">
                {currentQuestion ? 'Kaydet' : 'Ekle'}
              </button>
              <button onClick={() => setShowModal(false)} className="bg-red-500 text-white rounded p-2">
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
