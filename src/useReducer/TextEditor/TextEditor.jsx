import React, { useReducer } from "react";

// Initial state
const initialState = {
  past: [], // Stores the past states
  present: "", // Current state of the text editor
  future: [], // Stores the future states (for redo functionality)
};

// Reducer function
function editorReducer(state, action) {
  switch (action.type) {
    case "EDIT":
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    case "UNDO":
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
      };
    case "REDO":
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
      };
    default:
      return state;
  }
}

const TextEditor = () => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: "EDIT", payload: e.target.value });
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Text Editor</h2>
      <textarea
        value={state.present}
        onChange={handleChange}
        className="w-full h-40 p-3 border rounded mb-4"
        placeholder="Type something..."
      />
      <div className="flex justify-between">
        <button
          onClick={handleUndo}
          className={`px-4 py-2 bg-gray-300 rounded ${
            state.past.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-400"
          }`}
          disabled={state.past.length === 0}
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            state.future.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={state.future.length === 0}
        >
          Redo
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
