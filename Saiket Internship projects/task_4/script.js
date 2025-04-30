const quiz = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin"],
    answer: "Paris",
  },
  { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
  {
    question: "Which is the largest planet?",
    options: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  optionsEl.innerHTML = "";

  questionEl.textContent = quiz[currentQuestion].question;
  quiz[currentQuestion].options.forEach((option) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.textContent = option;
    button.onclick = () => selectAnswer(option);
    optionsEl.appendChild(button);
  });
}

function selectAnswer(selected) {
  if (selected === quiz[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    displayScore();
    document.getElementById("nextQuestion").classList.add("hidden");
  }
}

function displayScore() {
  document.getElementById("question").textContent = "Quiz Completed!";
  document.getElementById("options").innerHTML = "";
  document.getElementById(
    "score"
  ).textContent = `Your Score: ${score}/${quiz.length}`;
  document.getElementById("score").classList.remove("hidden");
  document.getElementById("reset").classList.remove("hidden");
}

function resetGame() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("score").classList.add("hidden");
  document.getElementById("reset").classList.add("hidden");
  loadQuestion();
}

loadQuestion();
