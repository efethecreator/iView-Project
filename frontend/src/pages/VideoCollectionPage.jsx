import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useVideoStore from "../store/useVideoCollectionStore";

const VideoCollection = () => {
  const { videos, fetchVideos, deleteVideo } = useVideoStore();
  const { interviewId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // Seçilen video

  useEffect(() => {
    if (interviewId) fetchVideos(interviewId);
  }, [interviewId, fetchVideos]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video); // Seçilen videoyu ayarla
    setIsModalOpen(true); // Modalı aç
  };

  const closeModal = () => {
    setIsModalOpen(false); // Modalı kapat
    setSelectedVideo(null); // Seçimi temizle
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {videos.length === 0 ? (
        <p className="text-center text-gray-500">No videos found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="bg-white shadow-lg rounded-lg p-4">
              <video
                src={video.s3Url}
                controls
                className="w-full h-48 rounded-md mb-4"
              ></video>
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
                  onClick={() => handleVideoClick(video)}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Component */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedVideo.user?.name} {selectedVideo.user?.surname} - Video
            </h2>
            <video
              src={selectedVideo.s3Url}
              controls
              className="w-full h-64 rounded-md mb-4"
            ></video>
            <button
              onClick={closeModal}
              className="text-white bg-red-500 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCollection;