import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueryChange = event => {
    setSearchQuery(event.currentTarget.value);
  };

  const searchQuerySubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Wow so easy!');
      return;
    }
    onSubmit(searchQuery);
  };

  return (
    <header className="Searchbar">
      <form onSubmit={searchQuerySubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={searchQueryChange}
        />
      </form>
    </header>
  );
}
