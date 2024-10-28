import React from 'react';
import axios from 'axios';

const JobPositionList = ({ jobPositions, viewVideos, deleteJobPosition }) => {
  const copyLink = async (title) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/interview/${title}`);
      const interviewLink = response.data.interviewLink;
      const fullLink = `http://localhost:5000/${interviewLink}`; // Pointing to the user frontend

      navigator.clipboard.writeText(fullLink);
      alert('Interview link copied to clipboard!');
    } catch (error) {
      console.error('Error fetching interview link:', error);
    }
  };

  return (
    <div className="job-position-list">
      {jobPositions.map((job, index) => (
        <div key={index} className="job-position-item">
          <h3>{job.title}</h3>
          <button onClick={() => copyLink(job.title)}>Copy Link</button>
          <button onClick={() => viewVideos(job.title)}>See Videos</button>
          <button onClick={() => deleteJobPosition(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default JobPositionList;
