import { useState } from 'react';
import './Filters.css';

export default function SearchBar({ onSearch, placeholder = "Job title, skills, or company" }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch({ query, location });
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-field">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="search-divider" />
      <div className="search-field">
        <span className="search-icon">📍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary search-btn">
        Search Jobs
      </button>
    </form>
  );
}
