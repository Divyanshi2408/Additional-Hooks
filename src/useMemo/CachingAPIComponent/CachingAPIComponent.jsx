import React, { useState, useEffect, useMemo } from "react";

const CachingAPIComponent = () => {
  const [query, setQuery] = useState(""); // User input for search
  const [data, setData] = useState([]); // Store fetched data
  const [cache, setCache] = useState({}); // Cache API responses
  const [loading, setLoading] = useState(false);

  // Fetch data function
  const fetchData = async (searchTerm) => {
    if (!searchTerm) return; // Avoid empty requests
    setLoading(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&q=${searchTerm}`
      );
      const result = await response.json();

      setCache((prevCache) => ({ ...prevCache, [searchTerm]: result })); // Store result in cache
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Memoized API response to avoid unnecessary re-fetching
  const cachedData = useMemo(() => {
    if (cache[query]) {
      return cache[query]; // Return cached data if available
    }
    return [];
  }, [query, cache]);

  useEffect(() => {
    if (query && !cache[query]) {
      fetchData(query); // Fetch only if not in cache
    } else {
      setData(cachedData); // Use cached data
    }
  }, [query, cache, cachedData]);

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Caching API Responses with useMemo</h2>

      {/* Search Input */}
      <div>
        <label className="block font-medium">Search:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
          placeholder="Type to search..."
        />
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* Display Data */}
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="p-3 border rounded-lg bg-white">
            <strong>{item.title}</strong>
            <p className="text-gray-600">{item.body}</p>
          </li>
        ))}
      </ul>

      {query && !loading && data.length === 0 && (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default CachingAPIComponent;
