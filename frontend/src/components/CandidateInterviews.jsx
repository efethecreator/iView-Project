import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateInterviews = () => {
  const [jobPositions, setJobPositions] = useState([]);
  const [newJobTitle, setNewJobTitle] = useState('');
  const navigate = useNavigate();

  const addJobPosition = () => {
    if (newJobTitle.trim() !== '') {
      setJobPositions([...jobPositions, newJobTitle]);
      setNewJobTitle('');
    }
  };

  const viewVideos = (position) => {
    // Navigate to the video page (you'll need to create this route)
    navigate(`/interviews/videos/${position}`);
  };

  const deleteJobPosition = (index) => {
    const updatedPositions = jobPositions.filter((_, i) => i !== index);
    setJobPositions(updatedPositions);
  };

  return (
    <div>
      <h2 className="text-2xl text-white mb-4">Interview List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded p-2 mr-2"
          placeholder="New job position..."
          value={newJobTitle}
          onChange={(e) => setNewJobTitle(e.target.value)}
        />
        <button
          onClick={addJobPosition}
          className="bg-blue-500 text-white rounded p-2"
        >
          Add
        </button>
      </div>
      
      <ul className="space-y-2">
        {jobPositions.map((position, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded-md flex justify-between">
            <span className="text-gray-300">{position}</span>
            <div>
              <button
                onClick={() => viewVideos(position)}
                className="bg-green-500 text-white rounded p-1 mr-2"
              >
                See Videos
              </button>
              <button
                onClick={() => deleteJobPosition(index)}
                className="bg-red-500 text-white rounded p-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateInterviews;
