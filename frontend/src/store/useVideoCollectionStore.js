// useVideoCollectionStore.js
import { create } from 'zustand';
import axios from 'axios';

const useVideoCollectionStore = create((set) => ({
  videos: [],
  fetchVideos: async (interviewID) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/video-collection/${interviewID}`);
      set({ videos: response.data.videos });
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  },
}));

export default useVideoCollectionStore;
