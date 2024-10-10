import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import QuestionPackage from './QuestionPackage';
import useQuestionStore from '../store/questionStore';


const QuestionManagement = () => {
  const { questionPackages, createQuestionPackage, addQuestionToPackage, deleteQuestionPackage, deleteQuestionFromPackage } = useQuestionStore();
  const [newPackageTitle, setNewPackageTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [expandedPackages, setExpandedPackages] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionDuration, setNewQuestionDuration] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const addQuestionPackage = async () => {
    if (newPackageTitle.trim() === '') return;
    await createQuestionPackage(newPackageTitle);
    setNewPackageTitle('');
  };

  const saveQuestion = async () => {
    if (!currentPackage || newQuestionText.trim() === '') return;
    await addQuestionToPackage(currentPackage._id, newQuestionText, newQuestionDuration);
    setNewQuestionText('');
    setNewQuestionDuration(1);
    setShowModal(false);
  };

  const togglePackage = (pkgId) => {
    setExpandedPackages((prev) =>
      prev.includes(pkgId) ? prev.filter((id) => id !== pkgId) : [...prev, pkgId]
    );
  };

  const openEditModal = (pkg, question = null) => {
    setCurrentPackage(pkg);
    setCurrentQuestion(question);
    setNewQuestionText(question ? question.text : '');
    setNewQuestionDuration(question ? question.duration : 1);
    setShowModal(true);
  };

  return (
    <div>
      <h2 className="text-2xl text-white mb-4">Manage Question Package</h2>
      <p className="text-gray-300">Burada mülakatta kullanılacak soru paketlerini düzenleyebilirsin.</p>

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

      <div className="space-y-4">
        {questionPackages.map((pkg) => (
          <QuestionPackage
            key={pkg._id}
            pkg={pkg}
            expandedPackages={expandedPackages}
            togglePackage={togglePackage}
            openEditModal={openEditModal}
            deleteQuestion={deleteQuestionFromPackage}
            deleteQuestionPackage={deleteQuestionPackage}
          />
        ))}
      </div>

      {showModal && (
        <QuestionForm
          newQuestionText={newQuestionText}
          setNewQuestionText={setNewQuestionText}
          newQuestionDuration={newQuestionDuration}
          setNewQuestionDuration={setNewQuestionDuration}
          saveQuestion={saveQuestion}
          setShowModal={setShowModal}
          currentQuestion={currentQuestion}
        />
      )}
    </div>
  );
};

export default QuestionManagement;
