import React, { useState } from "react";
import useUserStore from "../stores/userStore"; // store'u import edin

const UserInformation = ({ isOpen }) => { 
  const [isKvkkAccepted, setIsKvkkAccepted] = useState(false); // KVKK onayı durumu
  const personalInfo = useUserStore((state) => state.personalInfo);
  const setPersonalInfo = useUserStore((state) => state.setPersonalInfo);
  const createUser = useUserStore((state) => state.createUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ [name]: value });
  };

  const handleSubmit = async () => {
    const userId = await createUser();
    if (userId) {
      console.log("User created with ID:", userId);
    }
  };

  if (!isOpen) return null; // Modal kapalıysa render edilmez

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={personalInfo.name}
          onChange={handleInputChange}
          className="block w-full mt-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={personalInfo.surname}
          onChange={handleInputChange}
          className="block w-full mt-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={personalInfo.email}
          onChange={handleInputChange}
          className="block w-full mt-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={personalInfo.phone}
          onChange={handleInputChange}
          className="block w-full mt-2 p-2 border border-gray-300 rounded"
        />

        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="kvkk"
            checked={isKvkkAccepted}
            onChange={(e) => setIsKvkkAccepted(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="kvkk" className="text-gray-700">
            KVKK’yı kabul ediyorum
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isKvkkAccepted} // Onay verilmediyse buton devre dışı
          className={`py-2 px-4 mt-4 rounded ${isKvkkAccepted ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserInformation;
