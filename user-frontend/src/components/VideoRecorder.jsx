import React, { useState, useRef, useEffect } from "react";

const VideoRecorder = ({ interviewID, userId, uploadVideo, questions }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuestionTime, setCurrentQuestionTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunks = useRef([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Kamera veya mikrofona erişim sağlanamadı:", error);
      }
    };
    initCamera();
  }, []);

  useEffect(() => {
    if (isRecording) {
      startRecording();
      startQuestionTimer();
    } else if (mediaRecorderRef.current) {
      stopRecording();
    }
  }, [isRecording]);

  useEffect(() => {
    if (isRecording) {
      startQuestionTimer();
    }
  }, [currentQuestion]);

  const startRecording = () => {
    const stream = videoRef.current.srcObject;
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      setVideoUrl(URL.createObjectURL(blob));
      uploadVideo(blob, interviewID, userId);
      chunks.current = [];
    };
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const startQuestionTimer = () => {
    clearInterval(intervalRef.current);
    setCurrentQuestionTime(questions[currentQuestion]?.time * 60 || 60);
    setTimerRunning(true);

    intervalRef.current = setInterval(() => {
      setCurrentQuestionTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          handleNextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      alert("Tüm sorular tamamlandı.");
      setIsRecording(false);
      clearInterval(intervalRef.current);
      setTimerRunning(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-row items-start justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 font-sans">
      {/* Video Kayıt Alanı */}
      <div className="w-2/3 bg-white rounded-xl shadow-lg p-6 mr-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
          Video Recorder
        </h2>
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-64 rounded-lg mb-6 border-2 border-gray-200 shadow-sm"
        />
        <div className="flex justify-center gap-4">
          {isRecording ? (
            <button
              onClick={() => setIsRecording(false)}
              className="px-5 py-2.5 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
            >
              Stop Recording
            </button>
          ) : (
            <button
              onClick={() => setIsRecording(true)}
              className="px-5 py-2.5 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
            >
              Start Recording
            </button>
          )}
        </div>
      </div>

      {/* Sorular ve Kontroller Alanı */}
      <div className="w-1/3 bg-white rounded-xl shadow-lg p-6 ">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
          Questions
        </h3>
        {questions.length > 0 && isRecording ? (
          <div className="text-lg font-medium text-gray-700 mb-4">
            <p>
              <span className="text-blue-600 font-bold mr-2">
                Question {currentQuestion + 1}:
              </span>
              {questions[currentQuestion]?.question}
            </p>
            <p className="mt-2 text-gray-500">Remaining Time: {formatTime(currentQuestionTime)}</p>
          </div>
        ) : (
          <p className="text-gray-500">{isRecording ? "No questions available." : "Start recording to begin questions."}</p>
        )}
        <div className="flex flex-col gap-4 mt-auto">
          {isRecording && currentQuestion < questions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              Next Question
            </button>
          )}
          {videoUrl && (
            <a
              href={videoUrl}
              download="recorded-video.webm"
              className="block text-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors mt-4"
            >
              Download Video
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;
