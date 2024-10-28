import React from "react";

const Modal = ({ isOpen, personalInfo, handleInputChange, handleSubmit }) => {
  if (!isOpen) return null; // Eğer modal kapalıysa hiçbir şey render edilmesin

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
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
