import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../Header.module.css';

Modal.setAppElement('#root');

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://www.reddit.com/subreddits/search.json?q=${searchTerm}`);

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      setSearchResults(data.data.children);
      setError(null);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError(error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }

    // Limpiar el campo de búsqueda después de enviar la búsqueda
    setSearchTerm('');
    // Abrir el modal
    setModalIsOpen(true);
  };

  return (
    <nav className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search" />
        <input
          type="search"
          name="search"
          className={styles.searchInput}
          placeholder="Search subreddits"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Search Results Modal"
      >
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {searchResults.map((result) => (
            <li key={result.data.id}>
              <a href={`https://www.reddit.com${result.data.url}`} target="_blank" rel="noopener noreferrer">
                {result.data.display_name}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
      </Modal>
    </nav>
  );
};

export default SearchBar;
