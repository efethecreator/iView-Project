// src/pages/VideoCollectionPage.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useVideoCollectionStore from '../store/useVideoCollectionStore';
import { motion } from "framer-motion";

const VideoCollectionPage = () => {
  const { interviewID } = useParams();
  const navigate = useNavigate();
  const { videos, fetchVideos } = useVideoCollectionStore();

  useEffect(() => {
    fetchVideos(interviewID);
  }, [fetchVideos, interviewID]);

  const handleVideoClick = (videoID) => {
    navigate(`/video-player/${videoID}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center relative">
      <h2 className="text-3xl text-gray-800 font-semibold mb-6">Backend Interview Video Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleVideoClick(video.id)}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-2">
              <button className="text-gray-500 text-5xl">▶</button>
            </div>
            <p className="text-lg font-semibold">{video.title || 'Video Title'}</p>
          </div>
        ))}
      </div>
      <motion.button
        className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md absolute bottom-20 right-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Save
      </motion.button>
    </div>
  );
};

export default VideoCollectionPage;
