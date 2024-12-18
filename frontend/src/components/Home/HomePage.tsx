import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <div className="button-container">
        <button className="profileBTN myButton" onClick={() => navigate('/Profile')}>Profile</button>
      </div>
      <div className="button-container">
        <button className="searchBTN myButton" onClick={() => navigate('/Search')}>Search</button>
      </div>
      <div>
        {isLoading && <div className="spinner-border text-primary" />}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

export default HomePage;
