import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../Header.module.css';

import { setPosts } from '../../../redux/PostsSlice'
import { useDispatch } from 'react-redux'

Modal.setAppElement('#root');

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

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
    < >
      <form onSubmit={handleSubmit} className={styles.searchBar}>
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
        className={styles.modal}
      >
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <h2>Your results</h2>
        <ul>
          {searchResults.map((result) => {
            // console.log(result);
            return (
              <li key={result.data.id} onClick={() => { dispatch(setPosts(result.data.url)); setModalIsOpen(false) }} title={result.data.title}>
                {result.data.display_name}
              </li>
            )
          })}
        </ul>
        <button onClick={() => setModalIsOpen(false)} className={styles.closeModalBtn}>Close Modal</button>
      </Modal>
    </>
  );
};

export default SearchBar;
