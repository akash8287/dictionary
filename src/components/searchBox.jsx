import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './searchbox.css';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      setOutput(response.data.list);
      setError(null);
    } catch (error) {
      setError('An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    // Remove the fetchData call from here
  }, [query]);

  const options = {
    method: 'GET',
    url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
    params: { term: query },
    headers: {
      'X-RapidAPI-Key': '26ce35ec0emsh3bcf5a81ef9bcf6p17431cjsn048a9d5d7ff4',
      'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com',
    },
  };

  const handleSearch = () => {
    fetchData(); // Call fetchData when the button is pressed
  };

  return (
    <div>
      <label htmlFor="searchInput">Search Input:</label>
      <input
        type="text"
        id="searchInput"
        name="searchInput"
        placeholder="Search"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="output">
        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {output.map((item, index) => (
              <li key={index}>
                <h3>Definition:</h3>
                <p>{item.definition}</p>
                <h3>Example:</h3>
                <p>{item.example}</p>
                <h3>Author:</h3>
                <p>{item.author}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBox;