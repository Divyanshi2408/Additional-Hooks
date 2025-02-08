import React, { useRef, useImperativeHandle, forwardRef } from "react";

// Child component: Scrollable sections
const ScrollableContainer = forwardRef((props, ref) => {
  const sectionRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    scrollToSection: (index) => {
      if (sectionRefs.current[index]) {
        sectionRefs.current[index].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  }));

  return (
    <div className="border p-4 h-96 overflow-y-auto w-full max-w-md bg-gray-100 rounded-md">
      {["Section 1", "Section 2", "Section 3", "Section 4"].map((section, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className="p-4 my-2 bg-white shadow-md rounded-md"
        >
          <h2 className="text-lg font-bold">{section}</h2>
          <p>Content for {section} goes here...</p>
        </div>
      ))}
    </div>
  );
});

// Parent component
export default function App() {
  const scrollRef = useRef();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <ScrollableContainer ref={scrollRef} />
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => scrollRef.current?.scrollToSection(index)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Go to Section {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
