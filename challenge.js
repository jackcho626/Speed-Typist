const timer = document.querySelector("#timer");
const challengeText = document.querySelector("#challenge-text").value;
const challengeInputBox = document.querySelector("#challenge-input-box textarea");
// const clearButton = document.querySelector("#clear");

let started = false;
let timerInterval;
let time = [0,0,0];
// let matchedStr;
// let matchedStrLen = challengeText.innerHTML.length;

function startChallenge() {
  if (!started) {
    started = true;
    timerInterval = setInterval(runTimer, 10);
    document.querySelector("#origin-text").style.backgroundColor = "#65CCf3";
  }
}

// Add leading zero for single digits in time
function doubleDigits(time) {
  if (time < 10) return "0" + time;
  return time;
}

function runTimer() {
  timer.innerHTML = doubleDigits(time[0]) + ":" + doubleDigits(time[1]) + ":" + doubleDigits(time[2]);
  time[2]++;
  // 100cs --> 1s
  if (time[2] === 100) {
    time[1]++;
    time[2] = 0;
  }
  // 60s --> 1 min
  if (time[1] === 60) {
    time[0]++;
    time[1] = 0;
  }
}

// highlight correct / incorrect characters
function matchChar() {
  let input = challengeInputBox.value;
  let challengeSubstr = challengeText.substr(0, input.length);
  if (input === challengeSubstr) {
    // matchedStr = input;
    if (input.length === challengeText.length) {
      clearInterval(timerInterval);
    }
  } else {
    
  }
}

// Replay challenge
function clear() {
  clearInterval(timerInterval);
  timer.innerHTML = "00:00:00";
  challengeInputBox.value = "";
  time = [0,0,0];
  timerInterval = null;
  started = false;
}

// Start challenge by typing
challengeInputBox.addEventListener("keypress", startChallenge, false);
challengeInputBox.addEventListener("keyup", matchChar, false);
// clearButton.addEventListener("click", clear, false);