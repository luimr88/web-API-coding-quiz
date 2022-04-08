var startBtn = document.getElementById('start-game-btn');
var displayTimer = function () {
    var timerStart = 59;
    var timer = document.getElementById('timer');
    var countdown = setInterval(function () {
        console.log(timerStart);
        timer.textContent = 'Timer: ' + timerStart;
        timerStart--;
        if (timerStart === -1) {
            stopInterval()
        }
    }, 1000);

    var stopInterval = function () {
        console.log('time is up!');
        clearInterval(countdown);
    }
}



displayTimer();

startBtn.addEventListener("click", displayTimer());
