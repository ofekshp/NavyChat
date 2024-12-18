import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/Home/HomePage.tsx'
import LoginPage from './components/Login/LoginPage.tsx'
import RegisterPage from './components/Register/RegisterPage.tsx'
import StartPage from './components/Start/StartPage.tsx'
import SearchPage from './components/Search/SearchPage.tsx'

function AppContent() {
  return (
    <div className='app'>
    <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Search" element={<SearchPage />} />
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
