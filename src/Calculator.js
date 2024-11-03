import React, { useState } from 'react';
import './Calculator.css';

const DigitButton = ({ digit, onClick = () => {} }) => (
  <button className={`button ${digit === 0 ? 'double-width' : ''}`} onClick={() => onClick(digit)}>
    {digit}
  </button>
);

const OperatorButton = ({ operator, onClick }) => (
  <button className="button operator" onClick={() => onClick(operator)}>
    {operator}
  </button>
);

const SpecialButton = ({ label, onClick }) => (
  <button className="button" onClick={onClick}>
    {label}
  </button>
);

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
        <SpecialButton label="AC" onClick={clear} />
        <SpecialButton label="±" onClick={convertSign} />
        <SpecialButton label="%" onClick={inputPercent} />
        <OperatorButton operator="÷" onClick={() => performOperation('/')} />
        
        {[7, 8, 9].map((digit) => (
          <DigitButton key={digit} digit={digit} onClick={inputDigit} />
        ))}
        <OperatorButton operator="×" onClick={() => performOperation('*')} />
        
        {[4, 5, 6].map((digit) => (
          <DigitButton key={digit} digit={digit} onClick={inputDigit} />
        ))}
        <OperatorButton operator="−" onClick={() => performOperation('-')} />
        
        {[1, 2, 3].map((digit) => (
          <DigitButton key={digit} digit={digit} onClick={inputDigit} />
        ))}
        <OperatorButton operator="+" onClick={() => performOperation('+')} />
        
        <DigitButton digit={0} onClick={inputDigit} />
        <SpecialButton label="." onClick={inputDot} />
        <OperatorButton operator="=" onClick={() => performOperation('=')} />
      </div>
    </div>
  );
};

export default Calculator;