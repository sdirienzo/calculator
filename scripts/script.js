const resultDisplay = document.getElementById("result");
const clearBtn = document.getElementById("clear");
const negateBtn = document.getElementById("negate");
const percentBtn = document.getElementById("percent");
const operatorBtns = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".number");

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

function clear() {
    updateDisplay("0");
    operandOne, operandTwo, operator, result = null;
    displayValue = "";
    shouldResetDisplay = false;
}
//TODO: simplify and clean up
//TODO: add logic to display message when divide by 0
function evaluateOperator(btn) {
    if (operandOne === null && btn.value === "equal") {
        return;
    }
    if (operandOne !== null && shouldResetDisplay === true && btn.value === "equal") {
        return;
    }
    if (operandOne === null) {
        operandOne = Number(displayValue);
        operator = btn.value;
        shouldResetDisplay = true;
    } else if (operandOne !== null && shouldResetDisplay === true) {
        operator = btn.value;
    } else if (operandOne !== null && shouldResetDisplay === false) {
        if (btn.value === "equal") {
            operandTwo = Number(displayValue);
            result = Math.round(operate(operator, operandOne, operandTwo) * 100) / 100;
            updateDisplay(result);
            operandOne = result;
            operandTwo = null;
            operator = null;
            shouldResetDisplay = true;
        } else {
            operandTwo = Number(displayValue);
            result = Math.round(operate(operator, operandOne, operandTwo) * 100) / 100;
            updateDisplay(result);
            operandOne = result;
            operandTwo = null;
            operator = btn.value;
            shouldResetDisplay = true;
        }
    }
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
        evaluateOperator(btn);
    });
});
