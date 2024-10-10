// candidateInterviews

import React from 'react';

const JobPositionForm = ({ newJobTitle, setNewJobTitle, expireDate, setExpireDate, addJobPosition }) => {
  return (
    <div className="flex mb-4">
      <input
        type="text"
        className="border border-gray-300 rounded p-2 mr-2"
        placeholder="New job position..."
        value={newJobTitle}
        onChange={(e) => setNewJobTitle(e.target.value)}
      />
      <input
        type="date"
        className="border border-gray-300 rounded p-2 mr-2"
        value={expireDate}
        onChange={(e) => setExpireDate(e.target.value)}
      />
      <button
        onClick={addJobPosition}
        className="bg-blue-500 text-white rounded p-2"
      >
        Add
      </button>
    </div>
  );
};

export default JobPositionForm;
