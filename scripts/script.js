const resultDisplay = document.getElementById("result");
const clearBtn = document.getElementById("clear");
const negateBtn = document.getElementById("negate");
const percentBtn = document.getElementById("percent");
const operatorBtns = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".number");

let expression = [];
let operandOne = null;
let operandTwo = null;
let operator = null;
let result = null;
let shouldResetDisplay = false;
let displayValue = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    let result = 0;

    switch (operator) {
        case "add":
            result = add(a, b);
            break;
        case "subtract":
            result = subtract(a, b);
            break;
        case "multiply":
            result = multiply(a, b);
            break;
        case "divide":
            result = divide(a, b);
            break;
        default:
            break;
    }

    return result;
}

function updateDisplay(displayValue) {
    resultDisplay.innerText = String(displayValue);
}

function emptyExpression() {
    while(expression.length > 0) {
        expression.pop();
    }
    operandOne = operandTwo = operator = result = null;
    return;
}

function clear() {
    updateDisplay("0");
    emptyExpression();
    displayValue = "";
    shouldResetDisplay = false;
}

function evaluateExpression(btnOperator) {
    operator = expression.pop();
    operandOne = expression.pop();
    operandTwo = Number(displayValue);
    result = Math.round(operate(operator, operandOne, operandTwo) * 100) / 100;
    updateDisplay(result);
    expression.push(result);
    expression.push(btnOperator)
    operandOne = operandTwo = operator = null;
    shouldResetDisplay = true;
}

function evaluateOperator(btnOperator) {
    if (expression.length === 0) {
        expression.push(Number(displayValue));
        expression.push(btnOperator);
        shouldResetDisplay = true;
        return;
    }
    if (expression.length === 1) {
        expression.push(btnOperator);
        return;
    }
    if (expression.length === 2 && shouldResetDisplay === true) {
        expression.pop();
        expression.push(btnOperator);
        return;
    }
    if (expression.length === 2 && shouldResetDisplay === false) {
        evaluateExpression(btnOperator);
        return;
    }
}

function evaluateEqual() {
    if (expression.length > 1) {
        operator = expression.pop();
        operandOne = expression.pop();
        operandTwo = Number(displayValue);
        result = Math.round(operate(operator, operandOne, operandTwo) * 100) / 100;
        updateDisplay(result);
        expression.push(result);
        operandOne = operandTwo = operator = result = null;
        shouldResetDisplay = true;
    }
    return;
}

function isEqual(btnOperator) {
    return btnOperator === "equal" ? true : false;
}

clearBtn.addEventListener("click", clear);

numberBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (shouldResetDisplay) {
            displayValue = "";
        }
        displayValue += String(btn.value);
        updateDisplay(displayValue);
        shouldResetDisplay = false;
    });
});

operatorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        return isEqual(btn.value) ? evaluateEqual() : evaluateOperator(btn.value);
    });
});
