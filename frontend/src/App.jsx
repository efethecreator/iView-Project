import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import QuestionManagement from './pages/QuestionManagement';
import CandidateInterviews from './pages/CandidateInterviews';
import VideoCollection from './components/VideoCollection';

const App = () => {
  const [questionPackages, setQuestionPackages] = useState([]);

  const getSelectedPackage = (packageId) => {
    return questionPackages.find(pkg => pkg.id === parseInt(packageId, 10));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route path="questions" element={<QuestionManagement setQuestionPackages={setQuestionPackages} />} />
          <Route path="interviews" element={<CandidateInterviews />} />
        </Route>
        <Route path="/interviews/videos/:position" element={<VideoCollection />} />
      </Routes>
    </Router>
  );
};

export default App;
