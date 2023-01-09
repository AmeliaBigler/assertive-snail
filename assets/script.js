// variables for different displays. used to set displays as flex/none.
var instructionsDisplay = document.querySelector("#instructions");
var quizDisplay = document.querySelector("#quiz");
var scoreDisplay = document.querySelector("#highScores");
var scoreForm = document.querySelector("#scoreForm");

// these variable are the spans where the top scores will populate.
var firstInitialsSpan = document.querySelector("#initials1");
var firstScoreSpan = document.querySelector("#score1");
var secondInitialsSpan = document.querySelector("#initials2");
var secondScoreSpan = document.querySelector("#score2");
var thirdInitialsSpan = document.querySelector("#initials3");
var thirdScoreSpan = document.querySelector("#score3");
var fourthInitialsSpan = document.querySelector("#initials4");
var fourthScoreSpan = document.querySelector("#score4");
var fifthInitialsSpan = document.querySelector("#initials5");
var fifthScoreSpan = document.querySelector("#score5");

let highInitialsSpanArray = [
    firstInitialsSpan, 
    secondInitialsSpan,
    thirdInitialsSpan,
    fourthInitialsSpan,
    fifthInitialsSpan
];
let highScoresSpanArray = [
    firstScoreSpan,
    secondScoreSpan,
    thirdScoreSpan,
    fourthScoreSpan,
    fifthScoreSpan
];

var scoreArray = [];

// init functions.
function init() {
    renderHighScores();

    instructionsDisplay.style.display = "flex";
    scoreDisplay.style.display = "none";
    quizDisplay.style.display = "none";
    scoreForm.style.display = "none";
}

function renderHighScores() {
    var storedScores = JSON.parse(localStorage.getItem("userScoreAndInitials"));
    var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
    if (storedScores !== null) {
        scoreArray.push(storedScores);
        localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
        localStorage.setItem("userScoreAndInitials", null);
    }

    for (var i = 0; i < 5; i++) {
        var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));

        scoreArray.sort(function(a,b){return parseInt(b.score) - parseInt(a.score)});

        highInitialsSpanArray[i].textContent = scoreArray[i].initials;
        highScoresSpanArray[i].textContent = scoreArray[i].score;
    }
}

// event listeners for submit, viewHighScore, and home buttons.
var submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // this object is where users initials and scores are paired.
    var userScoreAndInitials = {
        initials: document.querySelector("#initials").value.trim(),
        score: userScoreSpan.textContent
    };
    
    // this local storage is how initials/score objects will be stored.
    localStorage.setItem("userScoreAndInitials", JSON.stringify(userScoreAndInitials));

    renderHighScores();

    instructionsDisplay.style.display = "none";
    scoreDisplay.style.display = "flex";
    quizDisplay.style.display = "none";
    scoreForm.style.display = "none";
})

var viewHighScoreButton = document.querySelector('#highScoreBtn');
viewHighScoreButton.addEventListener('click', function(){
    instructionsDisplay.style.display = "none";
    scoreDisplay.style.display = "flex";
    quizDisplay.style.display = "none";
    scoreForm.style.display = "none";
})

var homeButton = document.querySelector('.home');
homeButton.addEventListener('click', function(){
    instructionsDisplay.style.display = "flex";
    scoreDisplay.style.display = "none";
    quizDisplay.style.display = "none";
    scoreForm.style.display = "none";
})

// Variables and event listeners for taking the quiz.
var playButton = document.querySelector("#play");
var timerSpan = document.querySelector("#timer");
var userScoreSpan = document.querySelector("#userScoreSpan");
var timerCard = document.querySelector("#timerCard")
var secondsLeft = 60;

var firstQuestion = document.querySelector("#q1");
var lastQuestion = document.querySelector("#q20");
firstQuestion.addEventListener("click", function(){gradeMessage.style.display = "flex";})
lastQuestion.addEventListener("click", function() {clickLastQ = true;})

var gradeMessage = document.querySelector("#grade");
var gradeSpan = document.querySelector("#gradeSpan");
var incorrectBtns = document.querySelectorAll(".opt");
var correctBtns = document.querySelectorAll(".correct");

incorrectBtns.forEach(function(element) {
    element.addEventListener("click", function() {
        secondsLeft = secondsLeft - 3;
    timerCard.style.backgroundColor = "red";
    setTimeout(function(){timerCard.style.backgroundColor = "white"}, 1000);
    gradeSpan.textContent = "incorrect. 3 seconds deducted."
    plusCards(1);
    })
})

correctBtns.forEach(function(element) {
    element.addEventListener("click", function() {
        gradeSpan.textContent = "correct! Well done!";
        plusCards(1);
    })
})

playButton.addEventListener("click", function() {
    quizDisplay.style.display = "flex";
    instructionsDisplay.style.display = "none";
    gradeMessage.style.display = "none";
    initTimer();
    quizCardDisplay();
})

// functions for taking the quiz.
function initTimer() {
    var clickLastQ = false;
    secondsLeft = 60;

    var timerInterval = setInterval(function() {
        timerSpan.textContent = secondsLeft;
        secondsLeft--;
        
        if (secondsLeft === 0 || secondsLeft < 0) {
            userScoreSpan.textContent = secondsLeft;
            clearInterval(timerInterval);
            gameOver();
        } else if (clickLastQ === true) {
            userScoreSpan.textContent = secondsLeft;
            clearInterval(timerInterval);
            gameOver();
        }

    }, 1000);
}

function gameOver() {
    quizDisplay.style.display = "none";
    scoreForm.style.display = "flex";
}

// Quiz card variables and functions
let cardIndex = 1;

function plusCards(n) {
    if (cardIndex <= 20) {
    cardIndex += n
    quizCardDisplay()
    }
    else {cardIndex = 1};
}

function quizCardDisplay() {
    var quizCardArray = Array.from(document.querySelector("#questions").children)
    
    quizCardArray.forEach(function(element) {
        element.style.display = "none";
    });

    quizCardArray[cardIndex-1].style.display = "flex";
}

init();