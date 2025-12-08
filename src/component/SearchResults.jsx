import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.length > 0 ? (
        results.map((result) => (
          <div key={result.id} className="search-result-item">
            <h3>{result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
