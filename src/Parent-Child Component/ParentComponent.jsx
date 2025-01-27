import React, { useState, useCallback, memo } from "react";

// Memoized Child Component
const ChildComponent = memo(({ item, onEdit, onDelete }) => {
  console.log(`Rendering ChildComponent for item ${item.id}`);

  return (
    <div className="flex justify-between items-center mb-4 p-4 border rounded-lg shadow">
      <span>{item.text}</span>
      <div>
        <button
          onClick={() => onEdit(item.id)}
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
});

const ParentComponent = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
    { id: 3, text: "Task 3" },
  ]);

  // Memoized callback for editing an item
  const handleEdit = useCallback((id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, text: prompt("Edit item:", item.text) || item.text }
          : item
      )
    );
  }, []);

  // Memoized callback for deleting an item
  const handleDelete = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Parent-Child Component Example</h2>
      {items.map((item) => (
        <ChildComponent
          key={item.id}
          item={item}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ParentComponent;
