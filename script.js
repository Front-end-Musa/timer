let tabs = document.querySelectorAll('.tab');
let items = document.querySelectorAll('.item');
// Real Time Clock
function updateRealTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('realTime').textContent = `${hh}:${mm}:${ss}`;
}
setInterval(updateRealTime, 1000);
updateRealTime();

// Stopwatch
let stopwatchSeconds = 0;
let stopwatchInterval = null;
let stopwatchRunning = false;

const stopwatchDisplay = document.getElementById('stopwatch');
const startSW = document.getElementById('startStopwatch');
const stopSW = document.getElementById('stopStopwatch');
const resetSW = document.getElementById('resetStopwatch');

startSW.addEventListener('click', () => {
  if (!stopwatchRunning) {
    stopwatchRunning = true;
    stopwatchInterval = setInterval(() => {
      stopwatchSeconds++;
      updateStopwatch();
    }, 1000);
  }
});

stopSW.addEventListener('click', () => {
  stopwatchRunning = false;
  clearInterval(stopwatchInterval);
});

resetSW.addEventListener('click', () => {
  stopwatchRunning = false;
  clearInterval(stopwatchInterval);
  stopwatchSeconds = 0;
  updateStopwatch();
});

function updateStopwatch() {
  const hrs = Math.floor(stopwatchSeconds / 3600);
  const mins = Math.floor((stopwatchSeconds % 3600) / 60);
  const secs = stopwatchSeconds % 60;
  stopwatchDisplay.textContent = 
    `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

// Countdown Timer
let countdownSeconds = 0;
let countdownInterval = null;

const countdownDisplay = document.getElementById('countdown');
const countdownInput = document.getElementById('countdownInput');
const startCD = document.getElementById('startCountdown');
const stopCD = document.getElementById('stopCountdown');
const resetCD = document.getElementById('resetCountdown');

startCD.addEventListener('click', () => {
  if (!countdownInterval) {
    const minutes = parseInt(countdownInput.value);
    if (!minutes || minutes <= 0) {
      alert("Please enter a valid number of minutes.");
      return;
    }
    countdownSeconds = minutes * 60;
    updateCountdown();
    countdownInterval = setInterval(() => {
      countdownSeconds--;
      updateCountdown();
      if (countdownSeconds <= 0) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        alert("⏰ Time's up!");
      }
    }, 1000);
  }
});

stopCD.addEventListener('click', () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
});

resetCD.addEventListener('click', () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
  countdownSeconds = 0;
  updateCountdown();
  countdownInput.value = '';
});

function updateCountdown() {
  const mins = Math.floor(countdownSeconds / 60);
  const secs = countdownSeconds % 60;
  countdownDisplay.textContent = `${pad(mins)}:${pad(secs)}`;
}

// Helper
function pad(num) {
  return String(num).padStart(2, '0');
}

// Init displays
updateStopwatch();
updateCountdown();

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active-tab'));
    tab.classList.add('active-tab');
    if (tab.classList.contains('stopwatch-tab')) {
      items.forEach(item => item.classList.remove('active'));
      document.querySelector('.stopwatch-container').classList.add('active');
    } else if (tab.classList.contains('countdown-tab')) {
      items.forEach(item => item.classList.remove('active'));
      document.querySelector('.countdown-container').classList.add('active');
    }
    const target = tab.getAttribute('data-target');
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = content.id === target ? 'block' : 'none';
    });
  });
});
