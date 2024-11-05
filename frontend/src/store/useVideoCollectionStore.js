// useVideoCollectionStore.js
import { create } from "zustand";
import axios from "axios";

const useVideoCollectionStore = create((set) => ({
  videos: [],
  videoUrl: null, // Tek bir video URL'sini saklamak için

  // Tüm videoları bir interviewID ile çekme
  fetchVideos: async (interviewID) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/videos/${interviewID}`
      );
      set({ videos: response.data.videos });
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  },

  // Belirli bir video ID ile tek bir video çekme
  fetchVideoById: async (videoId, interviewID) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/videos/${videoId}`, {
        data: { interviewID }, // interviewId'yi body ile gönder
      });
      set({ videoUrl: response.data.signedUrl });
    } catch (error) {
      console.error("Failed to fetch video by ID:", error.message);
    }
  },
}));

export default useVideoCollectionStore;
