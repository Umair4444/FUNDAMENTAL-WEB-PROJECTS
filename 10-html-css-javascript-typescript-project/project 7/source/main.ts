type CalculatorState = {
  memory: number;
  currentInput: string;
  operator: string;
  result: number;
  history: string[];
};

const state: CalculatorState = {
  memory: 0,
  currentInput: "",
  operator: "",
  result: 0,
  history: [],
};

const inputBox = document.getElementById("inputBox") as HTMLInputElement;
const historyContainer = document.getElementById("history") as HTMLElement;
const historyToggleBtn = document.getElementById(
  "history-toggle"
) as HTMLElement;

function updateInput(value: string): void {
  // console.log("st. curr input", state.currentInput);

  state.currentInput += value;
  inputBox.value = state.currentInput;
}

function clearAll(): void {
  state.currentInput = "";
  state.operator = "";
  inputBox.value = "";
}

function backspace(): void {
  state.currentInput = state.currentInput.slice(0, -1);
  inputBox.value = state.currentInput;
}

function calculateResult(): void {
  try {
    // Security note: In production, consider using a safer evaluation method

    state.result = eval(state.currentInput);
    state.history.push(`${state.currentInput} = ${state.result}`);
    inputBox.value = state.result.toString();
    state.currentInput = state.result.toString();
    renderHistory();
  } catch {
    inputBox.value = "Error";
    state.currentInput = "";
  }
}

function handleOperator(op: string): void {
  if (state.currentInput !== "") {
    updateInput(op);
  }
}

function handleFunction(fn: string): void {
  const num = Number.parseFloat(state.currentInput);
  if (isNaN(num)) return;

  switch (fn) {
    case "√":
      state.result = Math.sqrt(num);
      break;
    case "x²":
      state.result = Math.pow(num, 2);
      break;
    case "%":
      state.result = num / 100;
      break;
    // case "1/x":
    //   state.result = 1 / num;
    //   break;
    // case "±":
    //   state.result = -num;
    //   break;
  }

  inputBox.value = state.result.toString();
  state.currentInput = state.result.toString();
  state.history.push(`${fn}(${num}) = ${state.result}`);
  renderHistory();
}

function handleMemory(action: string): void {
  let currentValue = Number.parseFloat(inputBox.value) || 0;
  // console.log("st.ci", state.currentInput);
  // console.log("cv", currentValue);

  switch (action) {
    case "MC":
      state.memory = 0;
      break;
    case "MR":
      updateInput(state.memory.toString());
      break;
    case "M+":
      state.memory += currentValue;
      // console.log("st.mem", state.memory);
      break;
    case "M-":
      state.memory -= currentValue;
      break;
  }
}

function renderHistory(): void {
  historyContainer.innerHTML = state.history
    .map((item) => `<div>${item}</div>`)
    .reverse()
    .join("");
}

function initializeCalculator(): void {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    const value = button.getAttribute("data-value");
    if (!value) return;

    button.addEventListener("click", () => {
      if (button.classList.contains("number-btn")) {
        updateInput(value);
      } else if (button.classList.contains("operator-btn")) {
        handleOperator(value);
      } else if (button.classList.contains("clear-btn")) {
        if (value === "AC") clearAll();
        else backspace();
      } else if (button.classList.contains("equal-btn")) {
        calculateResult();
      } else if (button.classList.contains("function-btn")) {
        handleFunction(value);
      } else if (button.classList.contains("memory-btn")) {
        handleMemory(value);
      }
    });
  });
  historyToggleBtn.addEventListener("click", () => {
    document.querySelector(".history-container")?.classList.toggle("show");
  });
}

// Initialize the calculator when the DOM is loaded.history-container.show
document.addEventListener("DOMContentLoaded", initializeCalculator);
