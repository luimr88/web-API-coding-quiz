var startBtn = document.getElementById('start-game-btn');
var gameIntro = document.getElementById('game-start');
var gameContainer = document.getElementById('game-container');
var quizQuestions = document.getElementById('question');
var choiceArea = document.getElementById('choice-area');
var buttons = document.getElementById('btn');
var gameEnd = document.getElementById('form-area');
var timer = document.getElementById('timer');
var playerForm = document.getElementById('initials-input');
var scoreDisplay = document.getElementById('score');

var countdown;
var timerStart = 60;
var index = 0;
var score = 0;
var name = [];
var scoreStorage = JSON.parse(localStorage.getItem("scoreStorage")) || [];
var questions = [
    {
        title: "What is 2 + 2?",
        choices:["1", "2", "3", "4"],
        answer: "4"
    },
    {
        title: "What is 5 + 5?",
        choices:["1", "2", "10", "4"],
        answer: "10"
    }

];

function displayQuestions() {
    //var question = ' ';
    quizQuestions.innerHTML = "";
    choiceArea.innerHTML = "";
    var questionTitle = questions[index].title;
    var choiceButtons = questions[index].choices;
    quizQuestions.append(questionTitle);

    // var choiceSection = document.createElement("div");
    // choiceSection.setAttribute("class", "choice-btns");
    // choiceSection.setAttribute("id", "choice-area");
    // choiceArea.appendChild(choiceSection);
    
    for(var i = 0; i < choiceButtons.length; i++) {
        var button = document.createElement('button');
        button.classList.add('btn');
        button.textContent = choiceButtons[i];

        if (choiceButtons[i] === questions[index].answer) {
            button.setAttribute("data-value", "true");
        } else {
            button.setAttribute("data-value", "false");
        }
        choiceArea.appendChild(button);
        button.addEventListener("click", checkAnswer);
    }

}

function checkAnswer(event) {
    var buttonId = event.currentTarget.dataset.value;
    if(buttonId === "true") {
        index++;
        score+=5;
        console.log(score);
        console.log(buttonId);
        if(index === questions.length){
            gameOver();
            resetTimer();
        } else {
            displayQuestions();
        }
    } else if(buttonId === "false") {
        index++
        subtractTime();
        console.log(buttonId);
        if(index === questions.length){
            gameOver();
            resetTimer();
        } else {
            displayQuestions();
        }
    }
}

var displayTimer = function () {
    //gameStart();
    //var timer = document.getElementById('timer');
    countdown = setInterval(function () {
        //console.log(timerStart);
        timer.textContent = 'Timer: ' + timerStart;
        timerStart--;
        if (timerStart <= 0) {
            stopInterval();
            gameOver();
            //resetTimer();
        }
    }, 1000);

    var stopInterval = function () {
        console.log('time is up!');
        clearInterval(countdown);
        resetTimer();
    }
}

function resetTimer() {
    clearInterval(countdown);
    timerStart = 60;
    timer.textContent = 'Timer: ' + timerStart;
}

function subtractTime() {
    timerStart = timerStart - 5;
    if(timerStart <= 0) {
        clearInterval(countdown);
        timerStart = 60;
        timer.textContent = 'Timer: ' + timerStart;
        gameOver();
    }
}

function playerNameInput (event) {
    event.preventDefault();
    var nameInput = document.querySelector("input[name='name-input']").value;
    var scoreInput = localStorage.getItem("mostRecentScore");
    var scoreTable = {
        initials: nameInput,
        score: scoreInput
    };
    scoreStorage.push(scoreTable);
    localStorage.setItem("scoreStorage", JSON.stringify(scoreStorage));
    console.log(scoreStorage);
}

function gameQuestions() {
    gameContainer.classList.add("hide");
    gameEnd.classList.add("hide");

}

function gameOver() {
    gameEnd.classList.remove("hide");
    gameContainer.classList.add("hide");
    localStorage.setItem('mostRecentScore', score);
    scoreDisplay.textContent = "Score: " + score;
}

function gameStart() {
    gameIntro.classList.add("hide");
    //gameEnd.classList.add("hide");
    displayTimer();
    gameContainer.classList.remove("hide");
    displayQuestions();
}

gameQuestions();

startBtn.addEventListener("click", gameStart);
playerForm.addEventListener("submit", playerNameInput)
