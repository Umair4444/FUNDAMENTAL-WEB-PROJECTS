// Input area
let hoursinput = document.getElementById("hours-counter") as HTMLInputElement;
let minutesinput = document.getElementById(
  "minutes-counter"
) as HTMLInputElement;
let secondsinput = document.getElementById(
  "seconds-counter"
) as HTMLInputElement;

// Buttons
let setButton = document.getElementById("set");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");

// Display area
let hoursel = document.getElementsByClassName(
  "hours"
) as HTMLCollectionOf<HTMLElement>;
let minutesel = document.getElementsByClassName(
  "minutes"
) as HTMLCollectionOf<HTMLElement>;
let secondsel = document.getElementsByClassName(
  "seconds"
) as HTMLCollectionOf<HTMLElement>;

// Create audio element for alarm
const alarmSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
);
alarmSound.volume = 0.5;

let interval: number | null = null; // Adjusted for browser
let isPaused = false;
let totalSeconds = 0; // Total time in seconds

// Function to validate and get positive integer values
const getPositiveInteger = (value: string): number => {
  let num = Number(value);
  return isNaN(num) || num < 0 ? 0 : num;
};

// Function to start countdown
let startCountdown = () => {
  if (totalSeconds > 0 && !isPaused) {
    interval = window.setInterval(() => {
      if (totalSeconds <= 0) {
        if (interval !== null) {
          clearInterval(interval);
        }
        console.log("Time is up!");
        // alert("time is up");
        // Play alarm sound
        alarmSound.play();
      } else {
        totalSeconds--;
        updateDisplay(totalSeconds);
      }
    }, 1000);
  }
};

// Function to update display with hours, minutes, and seconds
let updateDisplay = (seconds: number) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  hoursel[0].innerHTML = hours.toString().padStart(2, "0");
  minutesel[0].innerHTML = minutes.toString().padStart(2, "0");
  secondsel[0].innerHTML = secs.toString().padStart(2, "0");
};

// // Set function to initialize the countdown
// let setfunc = () => {
//   let hours = Number(hoursinput.value) || 0;
//   let minutes = Number(minutesinput.value) || 0;
//   let seconds = Number(secondsinput.value) || 0;

// Set function to initialize the countdown
let setfunc = () => {
  let hours = getPositiveInteger(hoursinput.value);
  let minutes = getPositiveInteger(minutesinput.value);
  let seconds = getPositiveInteger(secondsinput.value);

  // Convert time to total seconds
  totalSeconds = hours * 3600 + minutes * 60 + seconds;

  // Update display immediately
  updateDisplay(totalSeconds);
};

// Pause function
let pauseCountdown = () => {
  if (interval !== null) {
    clearInterval(interval);
    isPaused = true;
  }
};

// Reset function
let resetCountdown = () => {
  if (interval !== null) {
    clearInterval(interval);
  }
  totalSeconds = 0;
  updateDisplay(totalSeconds);
  isPaused = false;
    // Stop alarm if it's playing
    alarmSound.pause()
    alarmSound.currentTime = 0
};

// Add event listeners
if (setButton) {
  setButton.addEventListener("click", setfunc);
}
if (startButton) {
  startButton.addEventListener("click", () => {
    isPaused = false;
    startCountdown();
  });
}
if (pauseButton) {
  pauseButton.addEventListener("click", pauseCountdown);
}
if (resetButton) {
  resetButton.addEventListener("click", resetCountdown);
}
