import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import QuestionPackage from './QuestionPackage';

const QuestionManagement = () => {
  const [questionPackages, setQuestionPackages] = useState([]);
  const [newPackageTitle, setNewPackageTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [expandedPackages, setExpandedPackages] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionDuration, setNewQuestionDuration] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);

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

  const saveQuestion = () => {
    if (!currentPackage || newQuestionText.trim() === '') return;

    let updatedPackage = { ...currentPackage };

    if (currentQuestion) {
      updatedPackage.questions = updatedPackage.questions.map((q) =>
        q.id === currentQuestion.id
          ? { ...q, text: newQuestionText, duration: newQuestionDuration }
          : q
      );
    } else {
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

  const togglePackage = (pkgId) => {
    if (expandedPackages.includes(pkgId)) {
      setExpandedPackages(expandedPackages.filter((id) => id !== pkgId));
    } else {
      setExpandedPackages([...expandedPackages, pkgId]);
    }
  };

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

  const deleteQuestionPackage = (pkgId) => {
    setQuestionPackages(questionPackages.filter((pkg) => pkg.id !== pkgId));
  };

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
            key={pkg.id} 
            pkg={pkg} 
            expandedPackages={expandedPackages} 
            togglePackage={togglePackage} 
            openEditModal={openEditModal} 
            deleteQuestion={deleteQuestion} 
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
