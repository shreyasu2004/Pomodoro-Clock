const timer=document.querySelector('.timer');
const title=document.querySelector('.title');
const startbtn=document.querySelector('.startbtn');
const pausebtn=document.querySelector('.pausebtn');
const restartbtn=document.querySelector('.restartbtn');
const resumebtn=document.querySelector('.resumebtn');
const workDurationInput = document.querySelector('#workDuration');
const breakDurationInput = document.querySelector('#breakDuration');

let workTime = parseInt(workDurationInput.value) * 60; // Work time in seconds
let breakTime = parseInt(breakDurationInput.value) * 60; // Break time in seconds
let currentTime = workTime;
let isPaused = false;
let isWorkTime = true;
let interval;

// Update the work and break durations dynamically
function updateDurations() {
    workTime = parseInt(workDurationInput.value) * 60;
    breakTime = parseInt(breakDurationInput.value) * 60;
    currentTime = isWorkTime ? workTime : breakTime;
    updateTimerDisplay(currentTime);
    title.textContent = isWorkTime ? "Work Time! Ready to Start!" : "Break Time! Ready to Relax!";
}

// Update the timer display
function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timer.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Start the timer
function startTimer() {
    clearInterval(interval);
    isPaused = false;
    interval = setInterval(() => {
        if (!isPaused) {
            currentTime--;
            updateTimerDisplay(currentTime);

            if (currentTime <= 0) {
                clearInterval(interval);
                isWorkTime = !isWorkTime;
                currentTime = isWorkTime ? workTime : breakTime;
                title.textContent = isWorkTime ? "Work Time! Stay Focused!" : "Break Time! Relax!";
                startTimer();
            }
        }
    }, 1000);
}

// Button event listeners
startbtn.addEventListener('click', () => {
    updateDurations();
    title.textContent = "Work Time! Stay Focused!";
    startTimer();
});

pausebtn.addEventListener('click', () => {
    isPaused = true;
    title.textContent = "Timer Paused";
});

resumebtn.addEventListener('click', () => {
    isPaused = false;
    title.textContent = isWorkTime ? "Work Time! Stay Focused!" : "Break Time! Relax!";
});

restartbtn.addEventListener('click', () => {
    clearInterval(interval);
    currentTime = isWorkTime ? workTime : breakTime;
    updateTimerDisplay(currentTime);
    title.textContent = isWorkTime ? "Work Time! Ready to Start!" : "Break Time! Ready to Relax!";
    isPaused = true;
});

// Listen for changes in duration inputs
workDurationInput.addEventListener('change', updateDurations);
breakDurationInput.addEventListener('change', updateDurations);
