let timer;
let seconds = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
  }
});

stopBtn.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timer);
});

resetBtn.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timer);
  seconds = 0;
  updateDisplay();
});

function updateTimer() {
  seconds++;
  updateDisplay();
}

function updateDisplay() {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  timerDisplay.textContent = 
    `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}
