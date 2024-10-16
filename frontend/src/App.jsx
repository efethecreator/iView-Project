import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import QuestionManagement from './components/QuestionManagement';
import ManagePackage from './components/ManagePackage'; // Yeni düzenleme sayfası
import CandidateInterviews from './pages/CandidateInterviews';
import VideoCollection from './components/VideoCollection';
import useQuestionStore from './store/questionStore'; // Zustand store'u içe aktar

const App = () => {
  const { fetchQuestionPackages } = useQuestionStore(); // Store'dan fonksiyonu al
  const [questionPackages, setQuestionPackages] = useState([]);

  useEffect(() => {
    const loadPackages = async () => {
      const packages = await fetchQuestionPackages(); // Paketleri yükle
      setQuestionPackages(packages);
    };
    loadPackages();
  }, [fetchQuestionPackages]);

  const getSelectedPackage = (packageId) => {
    return questionPackages.find(pkg => pkg._id === packageId); // ID'ye göre paketi bul
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route 
            path="questions" 
            element={<QuestionManagement setQuestionPackages={setQuestionPackages} />} 
          />
          <Route 
            path="questions/manage/:packageId" 
            element={<ManagePackage questionPackages={questionPackages} />} 
          /> {/* Düzenleme sayfası */}
          <Route path="interviews" element={<CandidateInterviews />} />
        </Route>
        <Route path="/interviews/videos/:position" element={<VideoCollection />} />
      </Routes>
    </Router>
  );
};

export default App;
