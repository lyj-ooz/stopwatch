let seconds = 0;
let minutes = 0;
let hours = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let interval = null;
let status = "paused";

function stopWatch() {
  seconds++;

  if (seconds / 60 === 1) {
    seconds = 0;
    minutes++;

    if (minutes / 60 === 1) {
      minutes = 0;
      hours++;
    }
  }

  if (seconds < 10) {
    displaySeconds = "0" + seconds.toString();
  } else {
    displaySeconds = seconds;
  }

  if (minutes < 10) {
    displayMinutes = "0" + minutes.toString();
  } else {
    displayMinutes = minutes;
  }

  if (hours < 10) {
    displayHours = "0" + hours.toString();
  } else {
    displayHours = hours;
  }

  document.getElementById(
    "display"
  ).innerHTML = `${displayHours}:${displayMinutes}:${displaySeconds}`;
}

// window.setInterval(stopWatch, 1000);

function startPause() {
  if (status === "paused") {
    interval = window.setInterval(stopWatch, 1000);
    document.getElementById("start-pause").innerHTML = "Pause";
    status = "started";
  } else {
    window.clearInterval(interval);
    document.getElementById("start-pause").innerHTML = "Resume";
    status = "paused";
  }
}

function reset() {
  window.clearInterval(interval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById("display").innerHTML = "00:00:00";
  document.getElementById("start-pause").innerHTML = "Start";
  status = "paused";
}

function stop() {
  const hourStopped = displayHours;
  const minuteStopped = displayMinutes;
  const secondStopped = displaySeconds;

  document.querySelector(
    "#save-data #timedata"
  ).innerText = `${hourStopped}:${minuteStopped}:${secondStopped}`;

  document.getElementById("save-data").style.display = "block";
}

function save() {
  console.log("save function");
  if (document.querySelector("#save-data input").value === "") {
  }
  //로컬 스토리지에 저장하기

  document.getElementById("save-data").style.display = "none";
}

document.getElementById("start-pause").addEventListener("click", startPause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("save").addEventListener("click", save);
