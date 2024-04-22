import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export function Calculator() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const handleNumberClick = (number) => {
    setInput((prevInput) => prevInput + number);
  };

  const handleSubmit = (e) => {
    setInput(e.target.value);
  };

  function evaluateExpression(expression) 
  {
    const operands = [];
        const operators = [];
        let currentNumber = 0;
        let isNegative = false;
        const precedence = (operator) => {
          if (operator === '+' || operator === '-') {
              return 1;
          } else if (operator === '*' || operator === '/') {
              return 2;
          } else {
              return 0;
          }
      };
      
        const applyOperation = (operator, operand1, operand2) => {
          switch (operator) {
              case '+':
                  return operand1 + operand2;
              case '-':
                  return operand1 - operand2;
              case '*':
                  return operand1 * operand2;
              case '/':
                  return operand1 / operand2;
              default:
                  return 0;
          }
       };
        for (let i = 0; i < expression.length; i++) {
            const ch = expression.charAt(i);
            if (ch === '(') {
                if (currentNumber !== 0) {
                    operands.push(isNegative ? -currentNumber : currentNumber);
                    currentNumber = 0;
                    isNegative = false;
                }
                operators.push(ch);
            } else if (ch === ')') {
                if (currentNumber !== 0) {
                    operands.push(isNegative ? -currentNumber : currentNumber);
                    currentNumber = 0;
                    isNegative = false;
                }
                while (operators[operators.length - 1] !== '(') {
                    const operator = operators.pop();
                    const operand2 = operands.pop();
                    const operand1 = operands.pop();
                    operands.push(applyOperation(operator, operand1, operand2));
                }
                operators.pop();
            } else if (/[0-9.]/.test(ch)) {
                currentNumber = currentNumber * 10 + parseInt(ch, 10);
            } else if (ch === '-') {
                if (i === 0 || expression.charAt(i - 1) === '(') {
                    isNegative = true;
                } else {
                    if (currentNumber !== 0) {
                        operands.push(isNegative ? -currentNumber : currentNumber);
                        currentNumber = 0;
                        isNegative = false;
                    }
                    while (operators.length > 0 && precedence(operators[operators.length - 1]) >= precedence(ch)) {
                        const operator = operators.pop();
                        const operand2 = operands.pop();
                        const operand1 = operands.pop();
                        operands.push(applyOperation(operator, operand1, operand2));
                    }
                    operators.push(ch);
                }
            } else {
                if (currentNumber !== 0) {
                    operands.push(isNegative ? -currentNumber : currentNumber);
                    currentNumber = 0;
                    isNegative = false;
                }
                while (operators.length > 0 && precedence(operators[operators.length - 1]) >= precedence(ch)) {
                    const operator = operators.pop();
                    const operand2 = operands.pop();
                    const operand1 = operands.pop();
                    operands.push(applyOperation(operator, operand1, operand2));
                }
                operators.push(ch);
            }
        }

        if (currentNumber !== 0) {
            operands.push(isNegative ? -currentNumber : currentNumber);
        }
        while (operators.length > 0) {
            const operator = operators.pop();
            const operand2 = operands.pop();
            const operand1 = operands.pop();
            operands.push(applyOperation(operator, operand1, operand2));
        }
        return operands.pop();
  }

  function handleEvaluate() {
    let c1=0,c2=0;
    for(let i=0;i<input.length;i++)
    {
        if(c2 > c1)
        {
          setResult("Invalid Paranthasis")
        }
        if(input.charAt(i) === '(')
          c1++;
        else if(input.charAt(i) === ')')
          c2++;
    }
    if(c1 !== c2)
      setResult("Invalid Paranthasis");
    else{
      const t = evaluateExpression(input);
      setResult(t);
    }
  }

  function trans() {
    setInput('');
    setResult(0);
  }

  return (
    <div>
      <h1>Simple Calculator</h1>
      <Form.Control type="text" value={input} onChange={handleSubmit} /><br />

      <button onClick={() => handleNumberClick(1)}>1</button>
      <button onClick={() => handleNumberClick(2)}>2</button>
      <button onClick={() => handleNumberClick(3)}>3</button>
      <button onClick={() => handleNumberClick(4)}>4</button>
      <button onClick={() => handleNumberClick(5)}>5</button><br />

      <button onClick={() => handleNumberClick(6)}>6</button>
      <button onClick={() => handleNumberClick(7)}>7</button>
      <button onClick={() => handleNumberClick(8)}>8</button>
      <button onClick={() => handleNumberClick(9)}>9</button>
      <button onClick={() => handleNumberClick(0)}>0</button><br />

      <button onClick={() => handleNumberClick('+')}>+</button>
      <button onClick={() => handleNumberClick('-')}>-</button>
      <button onClick={() => handleNumberClick('*')}>*</button>
      <button onClick={() => handleNumberClick('/')}>/</button>
      <button onClick={() => handleNumberClick('.')}>.</button>
      <button onClick={() => trans()}>clr</button><br />

      <h4>Result: {result}</h4>
      <button className="btn btn-success" onClick={handleEvaluate}>Evaluate</button><br /><br />
      <button className="btn btn-success" onClick={() => navigate('/')}>logout</button>
    </div>
  );
}

export default Calculator;
