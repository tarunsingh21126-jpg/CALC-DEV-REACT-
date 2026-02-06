import React, { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [expression, setExpression] = useState(''); 

  const inputNumber = (num) => {
    const newExpression = expression + num.toString();
    setExpression(newExpression);
    setDisplay(newExpression);  // Update display to show full expression
  };

 const inputOperation = (nextOperation) => {
    if (expression === '') return;  // Prevent starting with operator
    const newExpression = expression + ' ' + nextOperation + ' ';
    setExpression(newExpression);
    setDisplay(newExpression);  // Update display
    // Keep the rest for calculation logic
    const inputValue = parseFloat(expression.split(' ').pop());  // Get last number
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      setPreviousValue(newValue);
    }
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

 const calculateResult = () => {
    if (!expression || !operation) return;
    const inputValue = parseFloat(expression.split(' ').pop());  // Last number
    const result = calculate(previousValue, inputValue, operation);
    const fullExpression = expression + ' = ' + result.toString();
    setDisplay(fullExpression);  // Show full equation with result
    setExpression('');  // Reset for new calc
    setPreviousValue(null);
    setOperation(null);
  };

  const clear = () => {
    setDisplay('');
     setExpression('');
    setPreviousValue(null);
    setOperation(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <div className="bg-gray-900 text-white text-right p-4 mb-4 rounded text-xl font-mono h-16 flex items-center justify-end overflow-hidden">
          {display || '0'}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => inputNumber(7)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl">7</button>
          <button onClick={() => inputNumber(8)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl">8</button>
          <button onClick={() => inputNumber(9)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl">9</button>
          <button onClick={() => inputOperation('/')} className="bg-orange-500 hover:bg-orange-400 text-white p-4 rounded text-xl">/</button>
          <button onClick={() => inputNumber(4)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl">4</button>
          <button onClick={() => inputNumber(5)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl">5</button>
          <button onClick={() => inputNumber(6)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl">6</button>
          <button onClick={() => inputOperation('*')} className="bg-orange-500 hover:bg-orange-400 text-white p-4 rounded text-xl">*</button>
          <button onClick={() => inputNumber(1)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl">1</button>
          <button onClick={() => inputNumber(2)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl">2</button>
          <button onClick={() => inputNumber(3)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl">3</button>
          <button onClick={() => inputOperation('-')} className="bg-orange-500 hover:bg-orange-400 text-white p-4 rounded text-xl">-</button>
          <button onClick={() => inputNumber(0)} className="bg-gray-600 hover:bg-gray-500 text-white p-4 rounded text-xl col-span-2">0</button>
          <button onClick={clear} className="bg-red-500 hover:bg-red-400 text-white p-4 rounded text-xl">C</button>
          <button onClick={() => inputOperation('+')} className="bg-orange-500 hover:bg-orange-400 text-white p-4 rounded text-xl">+</button>
          <button onClick={calculateResult} className="bg-green-500 hover:bg-green-400 text-white p-4 rounded text-xl col-span-4">=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;