import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const VideoCollection = () => {
  const [videos, setVideos] = useState([]);
  const { interviewID } = useParams(); // URL'den interviewID'yi al
  const navigate = useNavigate();

  useEffect(() => {
    if (interviewID) fetchVideos(interviewID);
  }, [interviewID]);

  const fetchVideos = async (interviewID) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/videos?interviewId=${interviewID}`);
      console.log("API response:", response.data); // Yanıtı tekrar kontrol edin
  
      // Artık doğrudan response.data üzerinde işlem yapıyoruz
      const videoData = await Promise.all(
        response.data.map(async (video) => {
          // Her bir video için kullanıcı bilgilerini çek
          const userResponse = await axios.get(`http://localhost:8000/api/users/${video.userId}`);
          return { ...video, user: userResponse.data };
        })
      );
      
      setVideos(videoData);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };
  
  

  const handleVideoClick = (videoId, userInfo) => {
    navigate(`/video/${videoId}`, { state: { userInfo } });
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/videos/${id}`);
      setVideos(videos.filter((video) => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-white shadow-lg rounded-lg p-4">
              <video src={video.s3Url} controls className="w-full h-48 rounded-md mb-4"></video>
              <h3 className="text-lg font-semibold text-gray-800">
                {video.user?.name} {video.user?.surname}
              </h3>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => deleteVideo(video._id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleVideoClick(video._id, video.user)}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCollection;
