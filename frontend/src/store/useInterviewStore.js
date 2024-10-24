// src/store/interviewStore.js
import { create } from 'zustand';
import axios from 'axios';


// API URL
const API_URL = import.meta.env.BASE_URL;

// Zustand store
const useInterviewStore = create((set) => ({
  interviews: [],
  interview: null,
  loading: false,
  error: null,

  // Fetch all interviews
  fetchInterviews: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('http://localhost:8000/api/interview/');
      set({ interviews: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch interviews', loading: false });
    }
  },

  // Create a new interview
// Create a new interview
createInterview: async (interviewData) => {
  set({ loading: true, error: null });
  try {
    const response = await axios.post('http://localhost:8000/api/interview/create', interviewData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    set((state) => ({
      interviews: [...state.interviews, response.data.interview],
      loading: false
    }));
  } catch (error) {
    console.error(error);  // Hata loglarını kontrol edelim
    set({ error: 'Failed to create interview', loading: false });
  }
},


  // Get interview by ID
  fetchInterviewById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:8000/api/interview/${id}`);
      set({ interview: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch interview', loading: false });
    }
  },

  // Delete interview by ID
  deleteInterview: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`http://localhost:8000/api/interview/delete/${id}`);
      set((state) => ({
        interviews: state.interviews.filter((interview) => interview._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useInterviewStore;
