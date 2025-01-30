import React, { useState, useCallback } from "react";

// Simulating an expensive computation
const calculateComplexScore = (id) => {
  console.log(`Calculating score for item ${id}...`);
  let score = 0;
  for (let i = 0; i < 1e8; i++) {
    score += id * Math.sin(i) * Math.cos(i); // Dummy calculation
  }
  return Math.round(score);
};

const ExpensiveHandlerExample = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", score: null },
    { id: 2, name: "Item 2", score: null },
    { id: 3, name: "Item 3", score: null },
  ]);

  // Memoized event handler for calculating scores
  const handleCalculateScore = useCallback(
    (id) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, score: calculateComplexScore(item.id) }
            : item
        )
      );
    },
    [] // No dependencies, so it's memoized once
  );

  return (
    <div>
      <h2>Expensive Computation in Handlers</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-4">
            <div className="flex justify-between items-center">
              <span>{item.name}</span>
              {item.score !== null ? (
                <span className="text-green-500 font-semibold">Score: {item.score}</span>
              ) : (
                <button
                  onClick={() => handleCalculateScore(item.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                >
                  Calculate Score
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensiveHandlerExample;
