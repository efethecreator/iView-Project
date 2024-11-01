import React, { useEffect, useState } from "react";
import UserInformation from "../components/userInformation";
import VideoRecorder from "../components/VideoRecorder";
import useUserStore from "../stores/userStore";
import useVideoStore from "../stores/videoStore";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VideoRecorderPage = () => {
  const { id: interviewId } = useParams();
  const userId = useUserStore((state) => state.userId);
  const uploadVideo = useVideoStore((state) => state.uploadVideo);
  const [questions, setQuestions] = useState([]);
  const [isUploading, setIsUploading] = useState(false); // Yüklenme durumunu izlemek için
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/interview/${id}/questions`
        );
        setQuestions(response.data.questions || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (interviewId) fetchQuestions(interviewId);
  }, [interviewId]);

  // Video yüklendiğinde tetiklenecek olan fonksiyon
  const handleUploadVideo = async (videoBlob) => {
    setIsUploading(true); // Yüklenme başladığında popup açılır

    try {
      const response = await uploadVideo(videoBlob, interviewId, userId);
      console.log("Video uploaded successfully:", response);
      setIsUploading(false); // Yüklenme tamamlandığında popup kapanır
      navigate("/interview-completed"); // Yüklenme tamamlandıktan sonra yönlendirme yapılır
    } catch (error) {
      console.error("Error uploading video:", error);
      setIsUploading(false); // Hata durumunda popup kapanır
    }
  };

  return (
    <div className="relative">
      <UserInformation isOpen={!userId} />
      <div className="absolute inset-0">
        <VideoRecorder
          interviewID={interviewId}
          userId={userId}
          uploadVideo={handleUploadVideo}
          questions={questions}
        />
      </div>

      {/* Yüklenme Popup */}
      {isUploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold text-gray-700">Mülakatınız kaydediliyor...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRecorderPage;
