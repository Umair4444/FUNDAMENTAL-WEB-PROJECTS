// Input area
const hoursinput = document.getElementById("hours-counter");
const minutesinput = document.getElementById("minutes-counter");
const secondsinput = document.getElementById("seconds-counter");
// Buttons
const setButton = document.getElementById("set");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
// Display area
const hoursel = document.getElementsByClassName("hours");
const minutesel = document.getElementsByClassName("minutes");
const secondsel = document.getElementsByClassName("seconds");
const container = document.querySelector(".container");
// Create audio element for alarm
const alarmSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
alarmSound.volume = 0.5;
let interval = null;
let isPaused = false;
let totalSeconds = 0;
let isTimerComplete = false;
// Function to validate and get positive integer values
const getPositiveInteger = (value) => {
    const num = Number.parseInt(value, 10);
    return isNaN(num) || num < 0 ? 0 : num;
};
// Function to start countdown
const startCountdown = () => {
    // Clear any existing interval
    if (interval !== null) {
        clearInterval(interval);
    }
    if (totalSeconds > 0 && !isPaused) {
        // Remove completed class if it exists
        container.classList.remove("timer-complete");
        isTimerComplete = false;
        interval = window.setInterval(() => {
            if (totalSeconds <= 0) {
                if (interval !== null) {
                    clearInterval(interval);
                    interval = null;
                }
                // Play alarm sound
                alarmSound.play();
                // Visual indication that timer is complete
                container.classList.add("timer-complete");
                isTimerComplete = true;
            }
            else {
                totalSeconds--;
                updateDisplay(totalSeconds);
            }
        }, 1000);
    }
};
// Function to update display with hours, minutes, and seconds
const updateDisplay = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    hoursel[0].innerHTML = hours.toString().padStart(2, "0");
    minutesel[0].innerHTML = minutes.toString().padStart(2, "0");
    secondsel[0].innerHTML = secs.toString().padStart(2, "0");
};
// Set function to initialize the countdown
const setfunc = () => {
    const hours = getPositiveInteger(hoursinput.value);
    const minutes = getPositiveInteger(minutesinput.value);
    const seconds = getPositiveInteger(secondsinput.value);
    // Validate minutes and seconds are between 0-59
    const validMinutes = minutes > 59 ? 59 : minutes;
    const validSeconds = seconds > 59 ? 59 : seconds;
    // Update input fields with validated values
    minutesinput.value = validMinutes.toString();
    secondsinput.value = validSeconds.toString();
    // Convert time to total seconds
    totalSeconds = hours * 3600 + validMinutes * 60 + validSeconds;
    // Update display immediately
    updateDisplay(totalSeconds);
    // Reset timer complete state
    container.classList.remove("timer-complete");
    isTimerComplete = false;
    // If timer was running, restart it with new values
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
        if (!isPaused) {
            startCountdown();
        }
    }
};
// Pause function
const pauseCountdown = () => {
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
        isPaused = true;
    }
};
// Reset function
const resetCountdown = () => {
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }
    // Stop alarm if it's playing
    alarmSound.pause();
    alarmSound.currentTime = 0;
    totalSeconds = 0;
    updateDisplay(totalSeconds);
    isPaused = false;
    // Reset timer complete state
    container.classList.remove("timer-complete");
    isTimerComplete = false;
    // Clear input fields
    hoursinput.value = "";
    minutesinput.value = "";
    secondsinput.value = "";
};
// Add event listeners
if (setButton) {
    setButton.addEventListener("click", setfunc);
}
if (startButton) {
    startButton.addEventListener("click", () => {
        isPaused = false;
        // If timer is complete, reset it first
        if (isTimerComplete) {
            resetCountdown();
            setfunc(); // Set the timer again with current input values
        }
        startCountdown();
    });
}
if (pauseButton) {
    pauseButton.addEventListener("click", pauseCountdown);
}
if (resetButton) {
    resetButton.addEventListener("click", resetCountdown);
}
// Add input validation for the number inputs
;
[hoursinput, minutesinput, secondsinput].forEach((input) => {
    input.addEventListener("input", () => {
        // Remove non-numeric characters
        input.value = input.value.replace(/[^0-9]/g, "");
        // Enforce min/max constraints
        if (input !== hoursinput) {
            const val = Number.parseInt(input.value, 10);
            if (!isNaN(val) && val > 59) {
                input.value = "59";
            }
        }
    });
});
export {};
