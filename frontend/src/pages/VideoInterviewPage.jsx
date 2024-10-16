import React, { useRef, useState } from 'react';

const VideoInterviewPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const handleStartRecording = async () => {
    try {
      // Request camera permissions
      const stream = await navigator.mediaDevices.getUserMedia({ video: true }).catch(error => {
        console.error('Camera access error:', error);
        alert('Unable to access camera');
        return null;
      });

      if (stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Reset recorded chunks
        recordedChunksRef.current = [];

        // Create a media recorder to record the stream
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Unable to access camera');
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    setIsRecording(false);
  };

  const handleDownloadVideo = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'recorded_video.webm';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="video-interview-page">
      <h2>Video Interview</h2>

      <div className="video-container">
        <video ref={videoRef} className="video-preview" playsInline autoPlay muted></video>
      </div>

      <div className="controls">
        {!isRecording && (
          <button className="start-btn" onClick={handleStartRecording}>
            Start Recording
          </button>
        )}
        {isRecording && (
          <button className="stop-btn" onClick={handleStopRecording}>
            Stop Recording
          </button>
        )}
      </div>

      {videoUrl && (
        <div className="download-section">
          <video src={videoUrl} controls className="recorded-video"></video>
          <button className="download-btn" onClick={handleDownloadVideo}>
            Download Video
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoInterviewPage;
