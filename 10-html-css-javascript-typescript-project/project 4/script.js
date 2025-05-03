let timerInterval;

const button = document.getElementById("button");
function startTimer() {
  // const input = document.querySelector("#input");
  const inputel = document.getElementById("input");
  const secondsel = document.getElementById("seconds");
  const minutesel = document.getElementById("minutes");
  const hoursel = document.getElementById("hours");
  let input = parseInt(inputel.value);

  if (isNaN(input) || input <= 0) {
    alert("Please enter a valid number of seconds.");
    return;
  }

  clearInterval(timerInterval, 20); // Clear any existing timer

  timerInterval = setInterval(() => {
    if (input > 0) {
      input--;
      const hours = Math.floor(input / 60 / 60); //% 3600 % 60 %24
      const minutes = Math.floor((input / 60) % 60); //% 3600
      const seconds = input % 60;

      secondsel.innerHTML = seconds;
      minutesel.innerHTML = minutes;
      hoursel.innerHTML = hours;
    } else {
      clearInterval(timerInterval);
      alert("Time's up!");
    }
  }, 1000);
}

button.addEventListener("click", startTimer);
