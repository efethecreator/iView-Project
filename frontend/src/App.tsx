import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin'; // './pages' yerine './components' kullanıldı
import AdminDashboard from './components/AdminDashboard'; // './pages' yerine './components' kullanıldı
import QuestionManagement from './components/QuestionManagement'; // './pages' yerine './components' kullanıldı
import CandidateInterviews from './components/CandidateInterviews'; // './pages' yerine './components' kullanıldı

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="questions" element={<QuestionManagement />} />
          <Route path="interviews" element={<CandidateInterviews />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
