import React, { useState, useRef } from 'react';

const VideoRecorder = ({ userId, uploadVideo }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    videoRef.current.srcObject = stream;

    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
    mediaRecorderRef.current.ondataavailable = (e) => chunks.current.push(e.data);
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'video/webm' });
      setVideoUrl(URL.createObjectURL(blob));
      chunks.current = [];
      uploadVideo(blob, "interviewId-placeholder", userId); // Video yükle işlevine userId ile gönder
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Video Recorder</h2>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-4">
        <video ref={videoRef} autoPlay muted className="w-full h-48 rounded-lg mb-4 border-2 border-gray-300" />
        
        <div className="flex justify-center gap-4">
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
            >
              Stop Recording
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            >
              Start Recording
            </button>
          )}
        </div>
      </div>
      
      {videoUrl && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Recorded Video</h3>
          <video src={videoUrl} controls className="w-full rounded-lg border-2 border-gray-300 mb-4" />
          <a
            href={videoUrl}
            download="recorded-video.webm"
            className="block text-center px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Download Video
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
