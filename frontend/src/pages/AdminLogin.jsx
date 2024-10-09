import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Örnek doğrulama
    if (email === 'a@a.com' && password === '123') {
      navigate('/admin-dashboard'); // Başarılı girişte yönlendirme
    } else {
      alert('Geçersiz giriş bilgileri!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-lg font-bold mb-4">Admin Log in Page</h2>
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
        <Button label="Log in" />
      </form>
    </div>
  );
};

export default AdminLogin;
