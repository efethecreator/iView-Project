import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import QuestionManagement from './components/QuestionManagement';
import CandidateInterviews from './components/CandidateInterviews';
import VideoCollection from './components/VideoCollection';

const App = () => {
  const [questionPackages, setQuestionPackages] = useState([]); // Tüm soru paketlerini tutuyoruz.

  // packageId'yi kullanarak ilgili soru paketini bul.
  const getSelectedPackage = (packageId) => {
    return questionPackages.find(pkg => pkg.id === parseInt(packageId, 10));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="questions" element={<QuestionManagement setQuestionPackages={setQuestionPackages} />} /> {/* Paketler set ediliyor */}
          <Route path="interviews" element={<CandidateInterviews />} />
        </Route>
        <Route path="/interviews/videos/:position" element={<VideoCollection />} />
        
        {/* VideoInterviewPage için dinamik route kaldırıldı. */}
        {/* <Route
          path="/interview/:packageId"
          element={<VideoInterviewPage getSelectedPackage={getSelectedPackage} />}
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
