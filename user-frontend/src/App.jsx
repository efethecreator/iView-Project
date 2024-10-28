import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoRecorder from './components/VideoRecorder';
import InterviewEnd from './pages/InterviewEnd';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoRecorder />} />
        <Route path="/interview-end" element={<InterviewEnd />} />
      </Routes>
    </Router>
  );
}

export default App;
