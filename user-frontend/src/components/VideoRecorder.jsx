import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useParams } from "react-router-dom"; // packageId parametresini almak için kullanıyoruz

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);
  const { packageId } = useParams(); // packageId URL parametresi

  // Component mount edildiğinde soruları backend'den alıyoruz
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/packages/${packageId}`);
        console.log(response.data);  // API yanıtını kontrol ediyoruz
        if (response.data && response.data.questions) {
          setQuestions(response.data.questions); // Soruları alıyoruz
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
  
    if (packageId) {
      fetchQuestions();
    }
  }, [packageId]);

  // Kişisel bilgileri güncelleme fonksiyonu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Video kaydını başlatma fonksiyonu
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      setIsRecording(true);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "video/mp4" });
        setVideoURL(blob); 
        chunks.current = [];
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  // Bir sonraki soruya geçiş fonksiyonu
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Bir sonraki soruya geç
    } else {
      setIsInterviewComplete(true); // Sorular bittiğinde tamamlandı olarak işaretle
    }
  };

  // Kişisel bilgileri backend'e gönderme fonksiyonu
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", personalInfo.name);
    formData.append("surname", personalInfo.surname);
    formData.append("email", personalInfo.email);
    formData.append("phone", personalInfo.phone);

    try {
      await axios.post("http://localhost:8000/api/users/create", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Kişisel bilgiler başarıyla gönderildi!");
      setIsModalOpen(false); // Modal'ı kapat
    } catch (error) {
      console.error("Error submitting personal information:", error);
    }
  };

  // Video kaydını durdurma fonksiyonu
  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
    handleUploadVideo();
  };

  // Videoyu backend'e yükleme fonksiyonu
  const handleUploadVideo = async () => {
    const formData = new FormData();
    formData.append(
      "video",
      new Blob([videoURL], { type: "video/mp4" }),
      "interview.mp4"
    );

    try {
      await axios.post("http://localhost:5000/api/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Video başarıyla yüklendi!");
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 p-6 font-montserrat">
      {/* Video Recording Section */}
      <div className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">Video Recorder</h1>

        <div className="w-full max-w-4xl">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-80 bg-black mb-4"
          ></video>
        </div>

        <div className="flex space-x-4">
          {!isRecording && (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              onClick={handleStartRecording}
            >
              Mülakata Başla
            </button>
          )}
          {isRecording && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={handleStopRecording}
            >
              Mülakatı Bitir
            </button>
          )}
        </div>
      </div>

      {/* Question Display Section */}
      <div className="w-1/4 bg-white p-4 rounded-md shadow-md ml-6">
        <h2 className="text-lg font-semibold mb-4">Questions</h2>
        {!isInterviewComplete && questions.length > 0 ? (
          <div>
            <p>{questions[currentQuestionIndex].question}</p>
            <p>Zaman: {questions[currentQuestionIndex].time} saniye</p> {/* Zamanı göster */}
            <button
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        ) : (
          <p className="text-red-500 font-bold">
            {isInterviewComplete ? "Interview complete" : "No more questions"}
          </p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        personalInfo={personalInfo}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default VideoRecorder;
