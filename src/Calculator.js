import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [currValue, setCurrValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [prevValue, setPrevValue] = useState(null);

  const inputDigit = (digit) => {
    if (waiting) {
      setCurrValue(String(digit));
      setWaiting(false);
    } else {
      setCurrValue(currValue === '0' ? String(digit) : currValue + digit);
    }
  };

  const inputDot = () => {
    if (waiting) {
      setCurrValue('0.');
      setWaiting(false);
    } else if (!currValue.includes('.')) {
      setCurrValue(currValue + '.');
    }
  };

  const clear = () => {
    setCurrValue('0');
    setOperator(null);
    setWaiting(false);
    setPrevValue(null);
  };

  const convertSign = () => {
    setCurrValue(currValue.startsWith('-') ? currValue.slice(1) : '-' + currValue);
  };

  const inputPercent = () => {
    const currentValue = parseFloat(currValue);
    if (currentValue === 0) return;
    setCurrValue(String(currentValue / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(currValue);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = calculate[operator](currentValue, inputValue);

      setCurrValue(String(newValue));
      setPrevValue(newValue);
    }

    setWaiting(true);
    setOperator(nextOperator);
  };

  const calculate = {
    '/': (prev, next) => prev / next,
    '*': (prev, next) => prev * next,
    '+': (prev, next) => prev + next,
    '-': (prev, next) => prev - next,
    '=': (prev, next) => next,
  };

  return (
    <div className="calculator">
      <div className="display">{currValue}</div>
      <div className="buttons">
        <button className="button" onClick={clear}>AC</button>
        <button className="button" onClick={convertSign}>±</button>
        <button className="button" onClick={inputPercent}>%</button>
        <button className="button operator" onClick={() => performOperation('/')}>÷</button>
        <button className="button" onClick={() => inputDigit(7)}>7</button>
        <button className="button" onClick={() => inputDigit(8)}>8</button>
        <button className="button" onClick={() => inputDigit(9)}>9</button>
        <button className="button operator" onClick={() => performOperation('*')}>×</button>
        <button className="button" onClick={() => inputDigit(4)}>4</button>
        <button className="button" onClick={() => inputDigit(5)}>5</button>
        <button className="button" onClick={() => inputDigit(6)}>6</button>
        <button className="button operator" onClick={() => performOperation('-')}>−</button>
        <button className="button" onClick={() => inputDigit(1)}>1</button>
        <button className="button" onClick={() => inputDigit(2)}>2</button>
        <button className="button" onClick={() => inputDigit(3)}>3</button>
        <button className="button operator" onClick={() => performOperation('+')}>+</button>
        <button className="button zero" onClick={() => inputDigit(0)}>0</button>
        <button className="button" onClick={inputDot}>.</button>
        <button className="button operator" onClick={() => performOperation('=')}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
