// Define types
type GameState = {
    secretNumber: number
    attempts: number
    gameOver: boolean
  }
  
  // Initialize game state
  let gameState: GameState = {
    secretNumber: generateRandomNumber(1, 100),
    attempts: 0,
    gameOver: false,
  }
  
  // DOM Elements
  const guessInput = document.getElementById("guess-input") as HTMLInputElement
  const guessButton = document.getElementById("guess-btn") as HTMLButtonElement
  const resetButton = document.getElementById("reset-btn") as HTMLButtonElement
  const feedbackMessage = document.getElementById("feedback-message") as HTMLParagraphElement
  const attemptsDisplay = document.getElementById("attempts") as HTMLParagraphElement
  const container = document.querySelector(".container") as HTMLDivElement
  
  // Event Listeners
  guessButton.addEventListener("click", handleGuess)
  resetButton.addEventListener("click", resetGame)
  guessInput.addEventListener("keypress", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGuess()
    }
  })
  
  // Generate random number between min and max (inclusive)
  function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  
  // Handle user's guess
  function handleGuess(): void {
    if (gameState.gameOver) {
      return
    }
  
    const userGuess = Number.parseInt(guessInput.value)
  
    // Validate input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      feedbackMessage.textContent = "Please enter a valid number between 1 and 100."
      feedbackMessage.style.color = "#ff9800"
      return
    }
  
    // Increment attempts
    gameState.attempts++
    attemptsDisplay.textContent = `Attempts: ${gameState.attempts}`
  
    // Check guess
    if (userGuess === gameState.secretNumber) {
      feedbackMessage.textContent = `Congratulations! You guessed the number ${gameState.secretNumber} correctly!`
      feedbackMessage.style.color = "#4CAF50"
      gameState.gameOver = true
      container.classList.add("celebrate")
      setTimeout(() => {
        container.classList.remove("celebrate")
      }, 1500)
    } else if (userGuess < gameState.secretNumber) {
      feedbackMessage.textContent = "Too low! Try a higher number."
      feedbackMessage.style.color = "#ff9800"
    } else {
      feedbackMessage.textContent = "Too high! Try a lower number."
      feedbackMessage.style.color = "#ff9800"
    }
  
    // Clear input
    guessInput.value = ""
    guessInput.focus()
  }
  
  // Reset game
  function resetGame(): void {
    gameState = {
      secretNumber: generateRandomNumber(1, 100),
      attempts: 0,
      gameOver: false,
    }
  
    feedbackMessage.textContent = "Make your first guess!"
    feedbackMessage.style.color = "#fff"
    attemptsDisplay.textContent = "Attempts: 0"
    guessInput.value = ""
    guessInput.focus()
  }
  
  // Initialize the game
  resetGame()
  