import React from 'react';

const QuestionForm = ({ newQuestionText, setNewQuestionText, newQuestionDuration, setNewQuestionDuration, saveQuestion, setShowModal, currentQuestion }) => {
  return (
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
  );
};

export default QuestionForm;
