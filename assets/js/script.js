var startBtn = document.getElementById('start-game-btn');
var gameIntro = document.getElementById('game-start');
var gameContainer = document.getElementById('game-container');
var quizQuestions = document.getElementById('question');
var highScorePage = document.getElementById('scores-container');
var choiceArea = document.getElementById('choice-area');
var buttons = document.getElementById('btn');
var gameEnd = document.getElementById('form-area');
var timer = document.getElementById('timer');
var playerForm = document.getElementById('initials-input');
var scoreDisplay = document.getElementById('score');
var scoreButton = document.getElementById('score-btn');
var scoreList = document.getElementById('score-list');
var correctAnswer = document.getElementById('correct-answer');
var deleteScores = document.getElementById('clear-score');

var countdown;
var timerStart = 60;
var index = 0;
var score = 0;
var name = [];
var scoreStorage = JSON.parse(localStorage.getItem("scoreStorage")) || [];
// Question and answer array.
var questions = [
    {
        title: "Where do you link the css file in the html file?",
        choices:["<header>", "<body>", "<head>", "<main>"],
        answer: "<head>"
    },
    {
        title: "How are variables assigned?",
        choices:["let", "var", "const", "All of the above"],
        answer: "All of the above"
    },
    {   
        title: "What values do Booleans return?",
        choices: ["Right and Wrong", "True and Wrong", "False and True", "Right and False"],
        answer: "False and True"
    },
    {   
        title: "What is the correct order to push data to a remote repo?",
        choices: ["git push, git add, git commit", "git commit, git push, git add", "git add, git commit, git push", "git checkout, git add, git commit"],
        answer: "False and True"
    }

];

// Adds the question and choices(as buttons) to the container.
function displayQuestions() {
    quizQuestions.innerHTML = "";
    choiceArea.innerHTML = "";
    var questionTitle = questions[index].title;
    var choiceButtons = questions[index].choices;
    quizQuestions.append(questionTitle);
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

// Checks whether the choice button that was selected is the correct answer.
function checkAnswer(event) {
    var buttonId = event.currentTarget.dataset.value;
    if(buttonId === "true") {
        index++;
        score+=5;
        correctAnswer.textContent = "Correct!";
        if(index === questions.length){
            gameOver();
            resetTimer();
        } else {
            displayQuestions();
        }
    } else if(buttonId === "false") {
        index++
        subtractTime();
        correctAnswer.textContent = "Wrong!";
        if(index === questions.length){
            gameOver();
            resetTimer();
        } else {
            displayQuestions();
        }
    }
}

// Timer function.
var displayTimer = function () {
    countdown = setInterval(function () {
        timer.textContent = 'Timer: ' + timerStart;
        timerStart--;
        if (timerStart <= 0) {
            stopInterval();
            gameOver();
        }
    }, 1000);

    var stopInterval = function () {
        clearInterval(countdown);
        resetTimer();
    }
}

// Reset timer function.
function resetTimer() {
    clearInterval(countdown);
    timerStart = 60;
    timer.textContent = 'Timer: ' + timerStart;
}

// Function that subtracts time when player gets question wrong
function subtractTime() {
    timerStart = timerStart - 5;
    if(timerStart <= 0) {
        clearInterval(countdown);
        timerStart = 60;
        timer.textContent = 'Timer: ' + timerStart;
        gameOver();
    }
}

// Gets the players initials and score and adds it to the localStorage.
function playerNameInput () {
    var nameInput = document.querySelector("input[name='name-input']").value;
    var scoreInput = localStorage.getItem("mostRecentScore");
    var scoreTable = {
        initials: nameInput,
        score: scoreInput
    };
    if(!scoreTable.initials || scoreTable.initials === " ") {
        alert("Must Enter Initials");
    } else {
        scoreStorage.push(scoreTable);
        localStorage.setItem("scoreStorage", JSON.stringify(scoreStorage));
        console.log(scoreStorage);
    }
}

// Adds players scores to the high score page.
function addHighScores() {
    scoreList.innerHTML = "";
    var getHighScore = JSON.parse(localStorage.getItem("scoreStorage"));
    if(getHighScore) {
        for(var i = 0; i < getHighScore.length; i++) {
            var list = document.createElement('li');
            list.setAttribute("class", "score-sort")
            list.textContent = getHighScore[i].initials + " - " + getHighScore[i].score;
            scoreList.appendChild(list);
        }
    }else  {
        var noScoreList = document.createElement("li");
        noScoreList.setAttribute("class", "score-sort");
        noScoreList.textContent = "No scores available";
        scoreList.appendChild(noScoreList);
    }
}

// Displays the question container.
function gameQuestions() {
    gameContainer.classList.add("hide");
    gameEnd.classList.add("hide");
    highScorePage.classList.add("hide");
}

// Displays the end of the game page where player inputs initials.
function gameOver() {
    gameEnd.classList.remove("hide");
    gameContainer.classList.add("hide");
    localStorage.setItem('mostRecentScore', score);
    scoreDisplay.textContent = "Score: " + score;
    playerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        playerNameInput();
    });
}

// Displays the games intro page.
function gameStart() {
    gameIntro.classList.add("hide");
    displayTimer();
    gameContainer.classList.remove("hide");
    displayQuestions();
}

// Displays highscore page.
function scorePage() {
    highScorePage.classList.remove("hide");
    gameContainer.classList.add("hide");
    gameEnd.classList.add("hide");
    gameIntro.classList.add("hide");
    resetTimer();
    addHighScores();
}

// Clears the local storage and inputs in the highscore page.
function clearScores() {
    window.localStorage.clear();
    addHighScores();
}

gameQuestions();

startBtn.addEventListener("click", gameStart);
scoreButton.addEventListener("click", scorePage);
deleteScores.addEventListener("click", clearScores);
