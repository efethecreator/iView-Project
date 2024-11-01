import React, { useState } from "react";
import UserInformation from "../components/userInformation";
import VideoRecorder from "../components/VideoRecorder";
import useUserStore from "../stores/userStore"; // userStore'u import edin
import useVideoStore from "../stores/videoStore"; // videoStore'u import edin

const VideoRecorderPage = () => {
  const personalInfo = useUserStore((state) => state.personalInfo);
  const setPersonalInfo = useUserStore((state) => state.setPersonalInfo);
  const createUser = useUserStore((state) => state.createUser);
  const isAuthorized = useUserStore((state) => state.isAuthorized);
  const userId = useUserStore((state) => state.userId);
  const uploadVideo = useVideoStore((state) => state.uploadVideo);

  // Kullanıcı bilgileri değiştiğinde güncelle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ [name]: value });
  };

  // Kullanıcı formu gönderildiğinde kullanıcı oluştur
  const handleSubmit = () => {
    createUser(); // createUser çağrılarak kullanıcı oluşturulur ve yetkilendirme sağlanır
  };

  return (
    <div>
      {/* Kullanıcı bilgileri modal ekranı */}
      <UserInformation
        isOpen={!isAuthorized} // Yetkilendirme yapılana kadar UserInformation görünür
        personalInfo={personalInfo}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      {/* Yetkilendirme sağlandıysa video kaydedici görünür */}
      {isAuthorized && <VideoRecorder userId={userId} uploadVideo={uploadVideo} />}
    </div>
  );
};

export default VideoRecorderPage;
