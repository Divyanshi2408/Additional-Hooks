import React, { useRef, useImperativeHandle, forwardRef, useEffect, useState } from "react";

// Child component: Drawing Canvas
const DrawingCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useImperativeHandle(ref, () => ({
    clearCanvas: () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    saveCanvas: () => {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "drawing.png";
      link.click();
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";

    const startDrawing = (e) => {
      setDrawing(true);
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    const draw = (e) => {
      if (!drawing) return;
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      setDrawing(false);
      ctx.beginPath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseleave", stopDrawing);
    };
  }, [drawing]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="border bg-white"
    />
  );
});

// Parent component
export default function App() {
  const canvasRef = useRef();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <DrawingCanvas ref={canvasRef} />
      <div className="flex gap-4">
        <button
          onClick={() => canvasRef.current?.clearCanvas()}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Clear Canvas
        </button>
        <button
          onClick={() => canvasRef.current?.saveCanvas()}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Save Canvas
        </button>
      </div>
    </div>
  );
}
