import React, { useRef, useImperativeHandle, forwardRef, useState } from "react";

// Child component: Form with reset and validate methods
const CustomForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  useImperativeHandle(ref, () => ({
    reset: () => setFormData({ name: "", email: "" }),
    validate: () => {
      if (!formData.name || !formData.email.includes("@")) {
        setError("Please enter a valid name and email.");
        return false;
      }
      setError("");
      return true;
    },
  }));

  return (
    <div className="border p-4 w-full max-w-md bg-gray-100 rounded-md">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 rounded-md w-full mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="border p-2 rounded-md w-full mb-2"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
});

// Parent component
export default function App() {
  const formRef = useRef();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <CustomForm ref={formRef} />
      <div className="flex gap-2">
        <button
          onClick={() => formRef.current?.validate()}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Validate
        </button>
        <button
          onClick={() => formRef.current?.reset()}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
