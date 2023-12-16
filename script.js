let displayTime = document.getElementById("display-time");
let lapTimesList = document.getElementById("lap-times");
let [seconds, minutes, hours] = [0, 0, 0];
let timer = null;
let lapStartTime = null;
let lapTimes = [];

function stopwatch() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    displayTime.innerHTML = h + ":" + m + ":" + s;
}

function watchStart() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
    lapStartTime = new Date();
}

function watchStop() {
    clearInterval(timer);
    if (lapStartTime !== null) {
        const lapTime = calculateLapTime();
        lapTimes.push(lapTime);
        updateLapTimes();
        lapStartTime = null;
    }
}

function watchReset() {
    clearInterval(timer);
    [seconds, minutes, hours] = [0, 0, 0];
    displayTime.innerHTML = "00:00:00";
    lapTimes = [];
    updateLapTimes();
    lapStartTime = null;
}

function recordLap() {
    if (lapStartTime !== null) {
        const lapTime = calculateLapTime();
        lapTimes.push(lapTime);
        updateLapTimes();
    }
}

function calculateLapTime() {
    const currentTime = new Date();
    const elapsedMilliseconds = currentTime - lapStartTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const lapHours = Math.floor(elapsedSeconds / 3600);
    const lapMinutes = Math.floor((elapsedSeconds % 3600) / 60);
    const lapSeconds = elapsedSeconds % 60;
    return `${lapHours < 10 ? "0" + lapHours : lapHours}:${lapMinutes < 10 ? "0" + lapMinutes : lapMinutes}:${lapSeconds < 10 ? "0" + lapSeconds : lapSeconds}`;
}

function updateLapTimes() {
    lapTimesList.innerHTML = "";
    lapTimes.forEach((lapTime, index) => {
        const li = document.createElement("li");
        li.innerHTML = `Lap ${index + 1}: ${lapTime}`;
        lapTimesList.appendChild(li);
    });
}