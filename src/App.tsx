import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LanguageEntryPage from './pages/LanguageEntryPage';
import LearnPage from './pages/LearnPage';
import ProgressPage from './pages/ProgressPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/language/:langPair" element={<LanguageEntryPage />} />
          <Route path="/learn/:fileId/stage/:stage" element={<LearnPage />} />
          <Route path="/progress/:fileId" element={<ProgressPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;