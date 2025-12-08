import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from '../component/SearchResults';
import axios from '../api/axios';

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchTerm = new URLSearchParams(location.search).get('query');
    if (searchTerm) {
      axios.get(`/search?q=${searchTerm}`)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  }, [location.search]);

  return (
    <div>
      <h1>Search Results</h1>
      <SearchResults results={results} />
    </div>
  );
};

export default SearchResultsPage;
