import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set, get) => ({
  userId: null,
  personalInfo: {
    name: "",
    surname: "",
    email: "",
    phone: "",
  },

  // Kullanıcı bilgilerini güncelle
  setPersonalInfo: (info) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...info },
    })),

  // Yeni bir kullanıcı oluştur ve userId al
  createUser: async () => {
    try {
      const { personalInfo } = get(); // useUserStore.getState yerine get kullanıldı
      const response = await axios.post('http://localhost:8000/api/users/create', personalInfo);
      set({
        userId: response.data.user._id, // Backend’den dönen userId'yi kaydedin
      });
      return response.data.user._id;
    } catch (error) {
      console.error("User creation failed:", error.message);
      return null;
    }
  },
}));

export default useUserStore;
