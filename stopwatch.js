let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isPaused = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    let sec = seconds < 10 ? '0' + seconds : seconds;
    let min = minutes < 10 ? '0' + minutes : minutes;
    let hr = hours < 10 ? '0' + hours : hours;
    display.textContent = `${hr}:${min}:${sec}`;
}

function startTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateDisplay();
        }
    }, 1000);
}

startButton.addEventListener('click', () => {
    isPaused = false;
    startTimer();
    startButton.disabled = true;
    pauseButton.disabled = false;
    resumeButton.disabled = true;
    resetButton.disabled = false;
});

pauseButton.addEventListener('click', () => {
    isPaused = true;
    clearInterval(timer);
    startButton.disabled = true;
    pauseButton.disabled = true;
    resumeButton.disabled = false;
    resetButton.disabled = false;
});

resumeButton.addEventListener('click', () => {
    isPaused = false;
    startTimer();
    startButton.disabled = true;
    pauseButton.disabled = false;
    resumeButton.disabled = true;
    resetButton.disabled = false;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    hours = 0;
    isPaused = false;
    updateDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
    resumeButton.disabled = true;
    resetButton.disabled = true;
});

pauseButton.disabled = true;
resumeButton.disabled = true;
resetButton.disabled = true;
