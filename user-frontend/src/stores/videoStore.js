import {create} from 'zustand'; // This line is correct
import axios from 'axios';

const useVideoStore = create((set) => ({
  uploadVideo: async (videoBlob) => {
      const formData = new FormData();
      const randomFileName = `${Date.now()}.mp4`;
      formData.append("file", videoBlob, randomFileName);

      // Update to use VITE_ prefixed variables
      formData.append("ProjectName", import.meta.env.VITE_VIDEO_API_PROJECT || "ProjectName");
      formData.append("BucketName", import.meta.env.VITE_VIDEO_API_BUCKET || "BucketName");
      formData.append("AccessKey", import.meta.env.VITE_VIDEO_API_KEY || "AccessKey");

      try {
          const response = await axios.post("http://localhost:8000/api/videos", formData, {
              headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("Video uploaded successfully:", response.data);
      } catch (error) {
          console.error("Error uploading video:", error);
      }
  },
}));


export default useVideoStore; // This line is correct
