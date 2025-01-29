import React, { useState, useCallback } from "react";
import { throttle } from "lodash";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock API function
  const fetchResults = async (searchQuery) => {
    setLoading(true);
    try {
      // Replace this with your actual API endpoint
      const response = await fetch(`https://api.example.com/search?q=${searchQuery}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Throttled API call
  const throttledFetch = useCallback(
    throttle((searchQuery) => fetchResults(searchQuery), 1000), // 1-second throttle
    []
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    throttledFetch(value);
  };

  
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>Search Box with Throttle</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type to search..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index} style={{ textAlign: "left" }}>
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
