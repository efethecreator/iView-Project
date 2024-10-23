// store/interviewStore.js
import { create } from 'zustand';
import axios from 'axios';

const useInterviewStore = create((set) => ({
  interviews: [],
  interview: null,
  loading: false,
  error: null,

  // Fetch all interviews
  fetchInterviews: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('http://localhost:8000/api/interviews');
      set({ interviews: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch single interview by ID
  fetchInterviewById: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`http://localhost:8000/api/interviews/${id}`);
      set({ interview: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create a new interview
createInterview: async (interviewData) => {
  set({ loading: true });
  try {
    const response = await axios.post('http://localhost:8000/api/interviews/create', interviewData);
    set((state) => ({
      interviews: [...state.interviews, response.data.interview],
      loading: false,
    }));
  } catch (error) {
    console.error("Error during interview creation:", error.response?.data || error.message);
    set({ error: error.response?.data?.message || error.message, loading: false });
  }
},


  // Delete interview by ID
  deleteInterview: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`http://localhost:8000/api/interviews/delete/${id}`);
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
