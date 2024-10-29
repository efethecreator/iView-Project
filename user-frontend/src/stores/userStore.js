// src/stores/modalStore.js
import { create } from "zustand";
import axios from "axios";

const useModalStore = create((set) => ({
  isOpen: false,
  personalInfo: {
    name: "",
    surname: "",
    email: "",
    phone: "",
  },

  // Open or close the modal
  setIsOpen: (isOpen) => set({ isOpen }),

  // Update personal information
  handleInputChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      personalInfo: {
        ...state.personalInfo,
        [name]: value,
      },
    }));
  },

  // Submit the personal information
  handleSubmit: async () => {
    const { personalInfo } = useModalStore.getState();

    try {
      const response = await axios.post("http://localhost:8000/api/users/create", personalInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Personal information submitted successfully");
      set({ isOpen: false });
    } catch (error) {
      console.error("Error submitting personal information:", error);
      alert("Error submitting personal information");
    }
  },
}));

export default useModalStore;
