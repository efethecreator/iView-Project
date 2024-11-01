import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoRecorderPage from "./pages/videoRecorderPage"; // VideoRecorderPage bileşenini dahil edin

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoRecorderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
