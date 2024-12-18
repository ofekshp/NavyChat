import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import './SearchPage.css';
import UserService from "../../services/UserService";

function SearchPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchUseName, setUserName] = useState("");
  const userService: UserService = new UserService();

  const onSearch = async () => {
    // Reset previous state
    setSearchResult(null);
    setError(undefined);

    // Validate input
    if (!searchUseName.trim()) {
      setError("Please enter a username");
      return;
    }

    try {
      setIsLoading(true);
      const response = await userService.searchUser(searchUseName);
      
      // If successful, set the search result
      setSearchResult(response.profileUser);
      setError(undefined);
    } catch (error: any) {
      console.log("User Search failed", error);
      
      // More specific error handling
      if (error.message === 'User not found') {
        setError(`No user found with username "${searchUseName}"`);
      } else {
        setError("An error occurred during search");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Search Page</h1>
      <div className="search-bar">
        <input
          type="text"
          id="username"
          name="username"
          className="search-input"
          placeholder="Search for a user..."
          value={searchUseName}
          maxLength={10}
          onChange={(event) => setUserName(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(); // Trigger search on Enter key press
            }
          }}
        />
        <button type="button" className="search-button" onClick={onSearch}>Search</button>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {/* Search Result */}
      {searchResult && (
        <div className="search-result mt-3">
          <h2>User Found</h2>
          <p>Username: {searchResult.username}</p>
          <p>Email: {searchResult.email}</p>
        </div>
      )}

      <div className="button-container mt-3">
        <button className="homeBTN myButton" onClick={() => navigate('/Home')}>Home</button>
      </div>
    </div>
  );
}

export default SearchPage;