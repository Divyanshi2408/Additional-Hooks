import React, { useRef, useState, useCallback } from "react";

const CanvasDrawingApp = () => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false); // Ref to track if the user is drawing
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);

  // Function to start drawing
  const startDrawing = useCallback((e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    isDrawing.current = true;
  }, []);

  // Function to draw on the canvas
  const draw = useCallback((e) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.stroke();
  }, [color, lineWidth]);

  // Function to stop drawing
  const stopDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (isDrawing.current) {
      context.closePath();
    }
    isDrawing.current = false;
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Canvas Drawing App</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Color:{" "}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Line Width:{" "}
          <input
            type="number"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            min="1"
            max="10"
          />
        </label>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: "1px solid black",
          display: "block",
          margin: "0 auto",
          cursor: "crosshair",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default CanvasDrawingApp;
