import React, { useState, useCallback } from "react";

const DragAndDropUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag events (memoized)
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files); // Get dropped files
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  }, []);

  // Render file previews
  const renderFilePreviews = () => {
    return uploadedFiles.map((file, index) => (
      <li key={index}>
        <strong>{file.name}</strong> - {Math.round(file.size / 1024)} KB
      </li>
    ));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>Drag-and-Drop File Uploader</h1>
      <div
        style={{
          border: "2px dashed #ccc",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: isDragging ? "#f0f8ff" : "#fff",
          transition: "background-color 0.2s ease",
          cursor: "pointer",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop files here, or click to select files</p>
        )}
      </div>
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Uploaded Files:</h3>
          <ul>{renderFilePreviews()}</ul>
        </div>
      )}
    </div>
  );
};

export default DragAndDropUploader;
