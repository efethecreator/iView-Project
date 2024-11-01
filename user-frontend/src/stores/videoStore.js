import { create } from 'zustand';
import axios from 'axios';

const useVideoStore = create((set) => ({
  videos: [],
  videoUrl: null,

  // Tüm videoları getirme
  fetchVideos: async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/videos');
      set({ videos: response.data });
    } catch (error) {
      console.error("Failed to fetch videos:", error.message);
    }
  },



  createUser: async (personalInfo) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users', personalInfo);
      set({ userId: response.data.id }); // Dönen userId'yi kaydedin
      return response.data.id;
    } catch (error) {
      console.error("User creation failed:", error.message);
      return null;
    }
  },


  // Video yükleme
  uploadVideo: async (file, interviewId, userId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('interviewId', interviewId);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:8000/api/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set((state) => ({ videos: [...state.videos, response.data] }));
      console.log("Video uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error during video upload:", error.message);
    }
  },

  // Video silme
  deleteVideo: async (id) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      set((state) => ({
        videos: state.videos.filter((video) => video.id !== id),
      }));
      console.log("Video deleted successfully");
    } catch (error) {
      console.error("Failed to delete video:", error.message);
    }
  },
}));

export default useVideoStore;
