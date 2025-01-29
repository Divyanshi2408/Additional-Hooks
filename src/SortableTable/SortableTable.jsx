import React, { useState, useCallback, useEffect } from "react";

// Table component
const SortableTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [sortedData, setSortedData] = useState(data); // State to hold the sorted data

  // Custom sorting function
  const sortData = useCallback(
    (key) => {
      let direction = "asc";
      // Toggle direction if sorting by the same key
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }

      const sorted = [...data].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });

      setSortConfig({ key, direction });
      setSortedData(sorted); // Update sortedData state
    },
    [data, sortConfig] // Memoize sorting logic based on data and sortConfig
  );

  // Handle sort click
  const handleSort = (key) => {
    sortData(key);
  };

  // Create table headers dynamically
  const renderTableHeader = () => (
    <thead>
      <tr>
        {Object.keys(data[0] || {}).map((key) => (
          <th key={key} onClick={() => handleSort(key)}>
            {key}
            {sortConfig.key === key ? (sortConfig.direction === "asc" ? " 🔼" : " 🔽") : ""}
          </th>
        ))}
      </tr>
    </thead>
  );

  // Create table rows dynamically
  const renderTableRows = () => (
    <tbody>
      {sortedData.map((row, index) => (
        <tr key={index}>
          {Object.keys(row).map((key) => (
            <td key={key}>{row[key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <table>
      {renderTableHeader()}
      {renderTableRows()}
    </table>
  );
};

export default SortableTable;
