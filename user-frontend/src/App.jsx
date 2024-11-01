import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoRecorderPage from "./pages/videoRecorderPage"; // VideoRecorderPage bileşenini dahil edin
import InterviewCompleted from "./pages/InterviewCompleted";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<VideoRecorderPage />} />
        <Route path="/interview-completed" element={<InterviewCompleted />} />
      </Routes>
    </Router>
  );
};

export default App;
