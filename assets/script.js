// the high score form will validate the submission for initials. 

// these variable are the locations of where the top scores will populate.
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

// variables for different displays. used to set displays as visible/none.
var instructionsDisplay = document.querySelector("#instructions");
var quizDisplay = document.querySelector("#quiz");
var scoreDisplay = document.querySelector("#highScores");
var scoreForm = document.querySelector("#scoreForm");

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
        console.log(scoreArray);

        highInitialsSpanArray[i].textContent = scoreArray[i].initials;
        highScoresSpanArray[i].textContent = scoreArray[i].score;
    }
}

// event listener for submit-score button
var submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // this object is where users initials and scores will be paired.
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

// Variables for taking the quiz.
var playButton = document.querySelector("#play");
var incorrectBtns = document.querySelectorAll(".opt");
var correctBtns = document.querySelectorAll(".correct");
var gradeMessage = document.querySelector("#grade");
var gradeSpan = document.querySelector("#gradeSpan");

// all functions that run when Play button is pushed.
playButton.addEventListener("click", function() {
    quizDisplay.style.display = "flex";
    instructionsDisplay.style.display = "none";
    gradeMessage.style.display = "none";
    initTimer();
    quizCardDisplay();
})

// timer variables and functions.
var timerSpan = document.querySelector("#timer");
var userScoreSpan = document.querySelector("#userScoreSpan");
var firstQuestion = document.querySelector("#q1");
var lastQuestion = document.querySelector("#q20");
var timerCard = document.querySelector("#timerCard")
var secondsLeft = 60;

function initTimer() {
    var clickLastQ = false;
    clickIncorrect = false;
    firstQuestion.addEventListener("click", function(){gradeMessage.style.display = "flex";})
    lastQuestion.addEventListener("click", function() {clickLastQ = true;})

    var timerInterval = setInterval(function() {
        timerSpan.textContent = secondsLeft;
        secondsLeft--;
        
        incorrectBtns.forEach(function(element) {
            element.addEventListener("click", function() {
                clickIncorrect = true;
            })
        })

        if (secondsLeft > 0 && clickIncorrect === true) {
            incorrectEvent();
        } else if (secondsLeft === 0 || secondsLeft < 0) {
            userScoreSpan.textContent = secondsLeft;
            clearInterval(timerInterval);
            gameOver();
        } else if (clickLastQ === true) {
            userScoreSpan.textContent = secondsLeft;
            clearInterval(timerInterval);
            gameOver();
        }

        clickIncorrect = false;
    }, 1000);
}

function incorrectEvent() {
    secondsLeft = secondsLeft - 3;
    timerCard.style.backgroundColor = "red";
    setTimeout(function(){timerCard.style.backgroundColor = "white"}, 1000);
    gradeSpan.textContent = "incorrect. 3 seconds deducted."
}

correctBtns.forEach(function(element) {
    element.addEventListener("click", function() {
        gradeSpan.textContent = "correct! Well done!";
    })
})

function gameOver() {
    quizDisplay.style.display = "none";
    scoreForm.style.display = "flex";
}

// TODO: remove onclick from HTML and replace here in script. 
// correctBtns.forEach.onclick = function(){plusCards(1)};
// incorrectBtns.forEach.onclick = function(){plusCards(1)};

let cardIndex = 1;

// Next quiz card controls
function plusCards(n) {
  cardIndex += n
  quizCardDisplay();
}

function quizCardDisplay() {
    var quizCardArray = Array.from(document.querySelector("#questions").children)
    
    quizCardArray.forEach(function(element) {
        element.style.display = "none";
    });

    quizCardArray[cardIndex-1].style.display = "flex";
}

init();