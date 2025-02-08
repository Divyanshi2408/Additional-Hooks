import React, { useRef, useImperativeHandle, forwardRef } from "react";

// Child component with an input field
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return <input ref={inputRef} type="text" placeholder="Enter text..." className="border p-2 rounded-md w-full" />;
});

// Parent component
export default function App() {
  const inputRef = useRef();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <CustomInput ref={inputRef} />
      <button
        onClick={() => inputRef.current?.focusInput()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Focus Input
      </button>
    </div>
  );
}
