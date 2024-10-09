import { create } from 'zustand';
import axios from 'axios';

const useQuestionStore = create((set) => ({
  questionPackages: [],
  loading: false,
  error: null,

  // Fetch all question packages
  fetchQuestionPackages: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('http://localhost:8000/api/packages');
      set({ questionPackages: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  // Create a new question package
  createQuestionPackage: async (title) => {
    set({ loading: true });
    try {
      const response = await axios.post('http://localhost:8000/api/packages', { title });
      set((state) => ({
        questionPackages: [...state.questionPackages, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },

  // Add a question to a question package
  addQuestionToPackage: async (packageId, question, time) => {
    set({ loading: true });
    try {
      const response = await axios.post(`http://localhost:8000/api/packages/${packageId}/questions`, {
        question,
        time,
      });
      set((state) => ({
        questionPackages: state.questionPackages.map((pkg) =>
          pkg._id === packageId ? response.data : pkg
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
}));

export default useQuestionStore;
