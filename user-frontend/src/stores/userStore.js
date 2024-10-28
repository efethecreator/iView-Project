// src/stores/modalStore.js
import { create } from "zustand";

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
      const response = await fetch("http://localhost:8000/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalInfo),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Personal information submitted successfully");
      set({ isOpen: false });
    } catch (error) {
      console.error("Error submitting personal information:", error);
    }
  },
}));

export default useModalStore;
