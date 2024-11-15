// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-8">Üzgünüz, aradığınız sayfa bulunamadı.</p>
      <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded-full">
        Anasayfaya Dön
      </a>
    </div>
  );
};

export default NotFound;
