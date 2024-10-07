import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin'; 
import AdminDashboard from './components/AdminDashboard';
import QuestionManagement from './components/QuestionManagement';
import CandidateInterviews from './components/CandidateInterviews';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login sayfası */}
        <Route path="/" element={<AdminLogin />} />
        
        {/* Admin Dashboard sayfası */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="questions" element={<QuestionManagement />} />
          <Route path="interviews" element={<CandidateInterviews />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
