import React, { useState, useMemo } from "react";

const ExpensiveComputationComponent = () => {
  const [number, setNumber] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [input, setInput] = useState("");

  // Expensive computation: calculates the factorial of a number
  const factorial = useMemo(() => {
    console.log("Calculating factorial...");
    const computeFactorial = (num) => {
      if (num <= 1) return 1;
      return num * computeFactorial(num - 1);
    };
    return computeFactorial(number);
  }, [number]);

  // A secondary value, just to demonstrate dependency control
  const multipliedFactorial = useMemo(() => {
    console.log("Multiplying factorial...");
    return factorial * multiplier;
  }, [factorial, multiplier]);

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Expensive Computation with useMemo</h2>
      
      <div>
        <label className="block font-medium">
          Enter a number for factorial:
        </label>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block font-medium">
          Enter a multiplier:
        </label>
        <input
          type="number"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block font-medium">
          Dummy Input (Does not affect computation):
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="text-lg">
        <strong>Factorial:</strong> {factorial}
      </div>
      <div className="text-lg">
        <strong>Multiplied Factorial:</strong> {multipliedFactorial}
      </div>
    </div>
  );
};

export default ExpensiveComputationComponent;
