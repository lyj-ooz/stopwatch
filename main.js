let seconds = 0;
let minutes = 0;
let hours = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let interval = null;
let status = "paused";

let actions;

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
    document.getElementById("stop").disabled = false;
    document.getElementById("reset").disabled = false;

    if (document.getElementById("save-data").style.display === "block") {
      document.getElementById("save-data").style.display = "none";
    }
  } else {
    pause(interval);
  }
}

function pause(interval) {
  window.clearInterval(interval);
  document.getElementById("start-pause").innerHTML = "Resume";
  status = "paused";
}

function reset() {
  window.clearInterval(interval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById("display").innerHTML = "00:00:00";
  document.getElementById("start-pause").innerHTML = "Start";

  if (document.getElementById("save-data").style.display === "block") {
    document.getElementById("save-data").style.display = "none";
  }

  document.getElementById("stop").disabled = true;
  document.getElementById("reset").disabled = true;

  status = "paused";
}

function stop() {
  const hourStopped = displayHours;
  const minuteStopped = displayMinutes;
  const secondStopped = displaySeconds;

  pause(interval);

  document.querySelector(
    "#save-data #timedata"
  ).innerText = `${hourStopped}:${minuteStopped}:${secondStopped}`;

  document.getElementById("save-data").style.display = "block";
}

function save() {
  // action ????????? ????????????.
  const actionTime = `${displayHours}:${displayMinutes}:${displaySeconds}`;
  let actionTitle = document.querySelector("#save-data input").value.trim();

  if (actionTitle.length === 0) {
    actionTitle = selectRandomActionTitle();
  }

  document.querySelector("#save-data input").value = "";

  const actionID = Date.now().toString();

  addToActionList(actionTime, actionTitle, actionID);

  //?????? ??????????????? ????????????
  const actionData = {
    time: actionTime,
    action: actionTitle,
    id: actionID,
  };
  saveLocal(actionData);

  reset();
}

function addToActionList(time, action, id) {
  const li = document.createElement("li");
  li.setAttribute("data-id", id);

  const divActionTime = document.createElement("div");
  divActionTime.setAttribute("class", "action-time");
  divActionTime.innerText = time;

  const divActionTitle = document.createElement("div");
  divActionTitle.setAttribute("class", "action-title");
  divActionTitle.innerText = action;

  const divActionDel = document.createElement("div");
  divActionDel.setAttribute("class", "action-del");
  divActionDel.innerHTML = "<button>X</button>";

  li.appendChild(divActionTime);
  li.appendChild(divActionTitle);
  li.appendChild(divActionDel);

  document.querySelector("#action-list ul").appendChild(li);

  // setIDtoLastChild();
}

// function setIDtoLastChild() {
//   document
//     .querySelector("#action-list ul")
//     .lastElementChild.setAttribute("id", "last-list");
// }

function saveLocal(value) {
  // value???..
  // {time: '05:11:10', action: 'test'} ?????? ????????????.
  console.log(value);
  if (localStorage.getItem("action")) {
    actions = JSON.parse(localStorage.getItem("action"));
  } else {
    actions = [];
  }
  actions.push(value);
  localStorage.setItem("action", JSON.stringify(actions));
}

function selectRandomActionTitle() {
  const randomAction = [
    "???",
    "????",
    "????",
    "????",
    "????",
    "????",
    "????",
    "pooping",
    "drooling",
    "??????????????????..",
    "????????????",
    "??????",
    "????",
  ];
  const randomNum = Math.floor(Math.random() * randomAction.length);

  return randomAction[randomNum];
}

function removeTaskFromLocal(id) {
  const dataFromLocal = JSON.parse(localStorage.getItem("action"));
  const idx = dataFromLocal.findIndex((d) => {
    return d.id === id;
  });

  dataFromLocal.splice(idx, 1);
  localStorage.setItem("action", JSON.stringify(dataFromLocal));
}

document.getElementById("start-pause").addEventListener("click", startPause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("save").addEventListener("click", save);
// action ?????? (event delegation ??????)
document.getElementById("action-list").addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const liToRemove = e.target.parentElement.parentElement;
    liToRemove.remove();
    removeTaskFromLocal(liToRemove.dataset.id);
  }
});

// ??? ?????? ???????????? ?????? ??????????????? ????????? ???????????? ???????????? ???????????? ?????????
if (localStorage.getItem("action")) {
  const dataFromLocal = JSON.parse(localStorage.getItem("action"));

  dataFromLocal.forEach((data) => {
    addToActionList(data.time, data.action, data.id);
  });
}
