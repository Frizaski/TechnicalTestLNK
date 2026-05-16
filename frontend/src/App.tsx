import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CalendarPage from './pages/CalendarPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Arahkan root URL ke halaman login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
};

export default App;