import { create } from "zustand";
import axios from "axios";

const useVideoStore = create((set) => ({
  videos: [],
  fetchVideos: async (interviewId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/videos/${interviewId}`
      );
  
      const videoData = await Promise.all(
        response.data.map(async (video) => {
          // `s3Url` artık backend'den döndüğü için tekrar oluşturmanıza gerek yok.
          const userResponse = await axios.get(
            `http://localhost:8000/api/users/${video.userId}`
          );
          return { ...video, user: userResponse.data }; // sadece user bilgisi ekleniyor
        })
      );

      set({ videos: videoData });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  },
  uploadVideo: async (file, userId, interviewId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("interviewId", interviewId);

    try {
      const response = await axios.post("http://localhost:8000/api/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        videos: [...state.videos, response.data],
      }));
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  },
  deleteVideo: async (videoId) => {
    try {
      await axios.delete(`http://localhost:8000/api/videos/${videoId}`);
      set((state) => ({
        videos: state.videos.filter((video) => video._id !== videoId),
      }));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  },
}));

export default useVideoStore;