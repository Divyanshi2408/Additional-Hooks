import React, { useState, useCallback } from "react";

const MemoizedList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Practice JavaScript" },
    { id: 3, text: "Build Projects" },
  ]);

  // Memoized handler for editing a list item
  const handleEdit = useCallback((id, newText) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  }, []);

  // Memoized handler for deleting a list item
  const handleDelete = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  return (
    <div>
      <h2>Memoized List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <span>{item.text}</span>
            <div>
              <button
                onClick={() => handleEdit(item.id, prompt("Edit item:", item.text) || item.text)}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoizedList;
