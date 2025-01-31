import React, { useState, useMemo } from "react";

const FilteredDataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Sample data
  const data = [
    { id: 1, name: "Apple", category: "Fruit" },
    { id: 2, name: "Banana", category: "Fruit" },
    { id: 3, name: "Carrot", category: "Vegetable" },
    { id: 4, name: "Broccoli", category: "Vegetable" },
    { id: 5, name: "Chicken", category: "Meat" },
    { id: 6, name: "Beef", category: "Meat" },
  ];

  // Extract unique categories for the filter dropdown
  const categories = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.category)));
  }, [data]);

  // Filtered data computation using useMemo
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, data]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Filtered Data Table</h2>

      {/* Search Input */}
      <div>
        <label className="block font-medium">Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
          placeholder="Search by name..."
        />
      </div>

      {/* Category Filter Dropdown */}
      <div>
        <label className="block font-medium">Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <table className="w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td
                colSpan="3"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No matching data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilteredDataTable;
