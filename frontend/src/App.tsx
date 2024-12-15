import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/Home/HomePage.tsx'

function AppContent() {
  return (
    <div className='app'>
    <Routes>
          <Route path="/" element={<HomePage />} />
    </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
