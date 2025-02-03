import React, { useState, useMemo } from "react";

const Dashboard = () => {
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter
  const [minValue, setMinValue] = useState(0); // Min value filter
  const [maxValue, setMaxValue] = useState(100); // Max value filter

  // Sample large dataset
  const data = [
    { id: 1, category: "Fruit", name: "Apple", value: 10 },
    { id: 2, category: "Fruit", name: "Banana", value: 15 },
    { id: 3, category: "Vegetable", name: "Carrot", value: 20 },
    { id: 4, category: "Vegetable", name: "Broccoli", value: 25 },
    { id: 5, category: "Fruit", name: "Orange", value: 30 },
    { id: 6, category: "Vegetable", name: "Spinach", value: 35 },
    { id: 7, category: "Beverage", name: "Tea", value: 5 },
    { id: 8, category: "Beverage", name: "Coffee", value: 10 },
    { id: 9, category: "Beverage", name: "Juice", value: 25 },
  ];

  // Memoized filtered data based on user filters
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        (categoryFilter ? item.category === categoryFilter : true) &&
        item.value >= minValue &&
        item.value <= maxValue
    );
  }, [categoryFilter, minValue, maxValue, data]);

  // Aggregated values like total, average
  const aggregatedData = useMemo(() => {
    const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);
    const averageValue = totalValue / filteredData.length || 0;
    return {
      total: totalValue,
      average: averageValue,
      count: filteredData.length,
    };
  }, [filteredData]);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* Filters */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Category Filter:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Min Value:</label>
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block font-medium">Max Value:</label>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Aggregated Data */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Aggregated Data:</h3>
        <p>Total Value: {aggregatedData.total}</p>
        <p>Average Value: {aggregatedData.average}</p>
        <p>Count of Items: {aggregatedData.count}</p>
      </div>

      {/* Filtered Data Table */}
      <table className="w-full text-left border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.value}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
