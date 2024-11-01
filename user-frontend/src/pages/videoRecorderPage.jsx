import React from "react";
import UserInformation from "../components/userInformation";
import VideoRecorder from "../components/VideoRecorder";
import useUserStore from "../stores/userStore"; 
import useVideoStore from "../stores/videoStore"; 

const VideoRecorderPage = () => {
  const userId = useUserStore((state) => state.userId);
  const uploadVideo = useVideoStore((state) => state.uploadVideo);

  return (
    <div className="relative">
      {/* Kullanıcı bilgileri modal ekranı */}
      <UserInformation isOpen={!userId} />

      {/* Her zaman arka planda görünen video kaydedici */}
      <div className="absolute inset-0">
        <VideoRecorder userId={userId} uploadVideo={uploadVideo} />
      </div>
    </div>
  );
};

export default VideoRecorderPage;
