var startBtn = document.getElementById('start-game-btn');
var gameIntro = document.getElementById('game-start');
var gameContainer = document.getElementById('game-container');
var quizQuestions = document.getElementById('question');
var choiceArea = document.getElementById('choice-area');
var buttons = document.getElementById('btn');

var index = 0;
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
        index++
        displayQuestions();
        console.log(buttonId);
    } else {
        index++
        displayQuestions();
        console.log(buttonId);
    }
}

var displayTimer = function () {
    //gameStart();
    var timerStart = 60;
    var timer = document.getElementById('timer');
    var countdown = setInterval(function () {
        //console.log(timerStart);
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

function gameQuestions() {
    gameContainer.classList.add("hide");
}



function gameStart() {
    gameIntro.classList.add("hide");
    displayTimer();
    gameContainer.classList.remove("hide");
    displayQuestions();
}

gameQuestions();






startBtn.addEventListener("click", gameStart);
