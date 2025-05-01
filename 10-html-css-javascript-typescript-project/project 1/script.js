const secondsEl = document.getElementById("seconds");
const minutesEl = document.getElementById("minutes");
const hoursEl = document.getElementById("hours");
const daysEl = document.getElementById("days");
const monthsEl = document.getElementById("months");

const newYears = "1 Jan 2026";

function countdown() {
  const newYearDate = new Date(newYears);
  const currentDate = new Date();

  const totalseconds = (newYearDate - currentDate) / 1000;

  const seconds = Math.floor(totalseconds) % 60;
  const minutes = Math.floor(totalseconds / 60) % 60;
  const hours = Math.floor(totalseconds / 60 / 60) % 24;
  const days = Math.floor(totalseconds / 3600 / 24) % 30;
  const months = Math.floor(totalseconds / 3600 / 24 / 30);

  //   console.log(seconds);
  //   console.log(minutes);
  //   console.log(hours);
  //   console.log(days);
  //   console.log(months);

  secondsEl.innerHTML = seconds;
  minutesEl.innerHTML = minutes;
  hoursEl.innerHTML = hours;
  daysEl.innerHTML = days;
  monthsEl.innerHTML = months;
}

// countdown();

setInterval(countdown, 1000);
