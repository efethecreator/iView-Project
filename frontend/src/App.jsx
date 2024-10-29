import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import QuestionManagement from './components/QuestionManagement';
import ManagePackage from './components/ManagePackage';
import CandidateInterviews from './pages/CandidateInterviews';
import VideoCollectionPage from './pages/VideoCollectionPage';
import useQuestionStore from './store/questionStore';

const App = () => {
  const { fetchQuestionPackages } = useQuestionStore();
  const [questionPackages, setQuestionPackages] = useState([]);

  useEffect(() => {
    const loadPackages = async () => {
      const packages = await fetchQuestionPackages();
      setQuestionPackages(packages);
    };
    loadPackages();
  }, [fetchQuestionPackages]);

  const getSelectedPackage = (packageId) => {
    return questionPackages.find(pkg => pkg._id === packageId);
  };

  return (
    <Router>
      <Routes>
        {/* Ana giriş sayfası */}
        <Route path="/" element={<AdminLogin />} />

        {/* Admin paneli */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          {/* Soru yönetimi */}
          <Route 
            path="questions" 
            element={<QuestionManagement setQuestionPackages={setQuestionPackages} />} 
          />

          {/* Paket düzenleme sayfası */}
          <Route 
            path="questions/manage/:packageId" 
            element={<ManagePackage questionPackages={questionPackages} />} 
          />

          {/* Aday mülakat listesi */}
          <Route path="interviews" element={<CandidateInterviews />} />

          {/* Video koleksiyon sayfası */}
          <Route path="video-collection/:interviewID" element={<VideoCollectionPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
