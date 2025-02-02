import React, { useState, useMemo } from "react";

const DependentDropdowns = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  // Data structure with categories and corresponding items
  const options = {
    Fruits: ["Apple", "Banana", "Mango", "Orange"],
    Vegetables: ["Carrot", "Broccoli", "Spinach", "Potato"],
    Beverages: ["Tea", "Coffee", "Juice", "Soda"],
  };

  // Memoized list of items based on the selected category
  const filteredItems = useMemo(() => {
    return selectedCategory ? options[selectedCategory] || [] : [];
  }, [selectedCategory]);

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Dependent Dropdowns with useMemo</h2>

      {/* Category Dropdown */}
      <div>
        <label className="block font-medium">Select a Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedItem(""); // Reset the second dropdown when category changes
          }}
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
        >
          <option value="">-- Select Category --</option>
          {Object.keys(options).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Dependent Item Dropdown */}
      <div>
        <label className="block font-medium">Select an Item:</label>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
          disabled={!selectedCategory}
        >
          <option value="">-- Select Item --</option>
          {filteredItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Display Selected Values */}
      {selectedItem && (
        <p className="text-lg font-semibold">
          You selected: {selectedCategory} - {selectedItem}
        </p>
      )}
    </div>
  );
};

export default DependentDropdowns;
