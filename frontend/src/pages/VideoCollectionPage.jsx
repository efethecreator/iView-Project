import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useVideoStore from "../store/useVideoCollectionStore";
import axios from "axios";

const VideoCollection = () => {
  const { videos, fetchVideos} = useVideoStore();
  const { interviewId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [statusData, setStatusData] = useState({});

  const [pass, setPass] = useState(false);
  const [fail, setFail] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (interviewId) fetchVideos(interviewId);
  }, [interviewId, fetchVideos]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    setPass(video.pass); // Pass durumunu her modal açıldığında güncelle
    setFail(video.fail); // Fail durumunu her modal açıldığında güncelle
    setNote(video.note); // Notu her modal açıldığında güncelle
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    setNote("");
  };



  // Güncel durum ve notu backend'e gönder ve frontend'de güncelle
  const updateStatusInBackend = async (videoId, userId, pass, fail, note) => {
    console.log({ videoId, userId, pass, fail, note });
    console.log(videos);
    try {
      const response = await axios.put(`http://localhost:8000/api/videos`, {
        interviewId,
        videoId,
        userId,
        pass,
        fail,
        note,
      });

      // Backend güncellenirken state'i de güncelle
      setStatusData((state) => ({
        ...state,
        [videoId]: response.data,
      }));

      // Anında değişikliği görmek için videos listesini güncelle
      const updatedVideos = videos.map((video) =>
        video._id === videoId ? { ...video, pass, fail, note } : video
      );
      useVideoStore.setState({ videos: updatedVideos });
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleStatusChange = (videoId, pass, fail) => {
    console.log({ videoId, pass, fail });
    updateStatusInBackend(videoId, selectedVideo.user?._id, pass, fail, note);
  };

  const handleSaveAndClose = () => {
    if (selectedVideo) {
      handleStatusChange(selectedVideo._id, pass, fail);
      closeModal();
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
              <video
                src={video.s3Url}
                className="w-full h-48 rounded-md mb-4"
              ></video>
              <h3 className="text-lg font-semibold text-gray-800">
                {video.user?.name} {video.user?.surname}
              </h3>
              <p className={`mt-2 text-green-500 font-semibold ${video.pass ? 'text-green-500' : video.fail ? 'text-red-500' : 'text-orange-500'}`}>
                {video.pass ? "Pass" : video.fail ? "Fail" : "Pending"}
              </p>
            
              <div className="flex justify-between mt-4">
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
              {selectedVideo.user?.name} {selectedVideo.user?.surname} -
              Interview
            </h2>
            <video
              src={selectedVideo.s3Url}
              controls
              className="w-full h-64 rounded-md mb-4"
            ></video>

            <div className="mb-4">
              <p className="underline text-lg font-bold">
                <strong>Personal Information</strong>
              </p>
              <p>
                <strong>Name:</strong> {selectedVideo.user?.name}
              </p>
              <p>
                <strong>Surname:</strong> {selectedVideo.user?.surname}
              </p>
              <p>
                <strong>Email:</strong> {selectedVideo.user?.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedVideo.user?.phone}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold">Status</label>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setFail(false);
                    setPass(true);
                  }}
                  className="text-white bg-green-500 px-4 py-2 rounded"
                >
                  Pass
                </button>
                <button
                  onClick={() => {  
                    setFail(true);
                    setPass(false);
                  }}
                  className="text-white bg-red-500 px-4 py-2 rounded"
                >
                  Fail
                </button>
                <button
                  onClick={() => {
                    setFail(false);
                    setPass(false);
                  }}
                  className="text-white bg-orange-500 px-4 py-2 rounded"
                >
                  Pending
                </button>
              </div>
            </div>

            {/* Note Section */}
            <div className="mb-4">
              <label className="block text-lg font-semibold">Note</label>
              <textarea
                value={note}
                val={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSaveAndClose}
                className="text-white bg-green-700 px-4 py-2 rounded mt-4"
              >
                Save and Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCollection;