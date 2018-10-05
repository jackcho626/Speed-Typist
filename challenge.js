const timer = document.querySelector("#timer");
const challenge = document.querySelector("#challenge-text blockquote");
const challengeText = challenge.innerText;
const challengeInputBox = document.querySelector("#challenge-input-box textarea");
// const clearButton = document.querySelector("#clear");

let started = false;
let timerInterval;
let time = [0,0,0];
let charPos = 0;

function startChallenge() {
  if (!started) {
    started = true;
    timerInterval = setInterval(runTimer, 10);
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

// highlight correctly matched characters
function matchChar(e) {
  let input = String.fromCharCode(e.which);
  if (input === challengeText[charPos]) {
    challenge.innerHTML = "<span class='text-success'>" + challengeText.slice(0, charPos+1)
      + "</span>" + challengeText.slice(charPos+1);
    charPos++;
  } else { // mismatch
    
  }
  if (charPos === challengeText.length) {
    clearInterval(timerInterval);
    // score / high score message, compare to leaderboard / percentile
    alert("Good job!");
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
challengeInputBox.addEventListener("keypress", matchChar, false);
// clearButton.addEventListener("click", clear, false);