import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminLoginStore from '../store/adminLoginStore';  // Yeni oluşturduğumuz store
import InputField from '../components/InputField';
import Button from '../components/Button';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginAdmin, loading, error } = useAdminLoginStore();  // Store'dan login fonksiyonunu alıyoruz

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // loginAdmin fonksiyonu çağırarak giriş işlemini başlat
    await loginAdmin(email, password, navigate);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-lg font-bold mb-4">Admin Log in Page</h2>
        {error && <p className="text-red-500">{error}</p>}  {/* Eğer hata varsa ekrana yaz */}
        <InputField 
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField 
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label={loading ? "Loading..." : "Log in"} /> {/* Yüklenme durumunu göster */}
      </form>
    </div>
  );
};

export default AdminLogin;