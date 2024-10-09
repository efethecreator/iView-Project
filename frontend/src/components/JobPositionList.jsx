import React from 'react';

const JobPositionList = ({ jobPositions, viewVideos, deleteJobPosition }) => {
  return (
    <ul className="space-y-2">
      {jobPositions.map((position, index) => (
        <li key={index} className="bg-gray-800 p-4 rounded-md flex justify-between">
          <span className="text-gray-300">{position.title}</span>
          <div>
            <button
              onClick={() => viewVideos(position.title)}
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
  );
};

export default JobPositionList;
