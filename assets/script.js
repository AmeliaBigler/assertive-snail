// when user first opens app, only instructions section will be visible.
// when user pushes play game button (event listener 'click'), timer will start (60 seconds), instructions will be hidden, and first question will appear.
// timer will display in the upper right corner.
// questions will appear one at a time - after user inputs an answer the next question will appear.
// after the user selects an answer:
    // an event listener for 'click' will turn their selection a different color(green=correct. red=incorrect).
    // a message will appear to validate (correct/incorrect) their answer.
    // the next question will appear.
// if the user selects the incorrect answer, X seconds will be removed from their remaining time.
// once the timer reaches zero OR the user completes all questions, then the questions become invisible and the score section becomes visible.
// the user can choose to save their score and initials. The user can choose to play again.
// the high score section saves the top X highest scores and initials. 
// the high score form will validate the submission for initials. 
// the user can view high scores from the instructions page or the score page. Otherwise, the high score section is hidden.

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
var scoreDisplay = document.querySelector("#scores");
var scoreForm = document.querySelector("#scoreForm");

function init() {
    var storedScores = JSON.parse(localStorage.getItem("userScoreAndInitials"));

    if (storedScores !== null) {
        scoreArray.push(storedScores);
    }

    renderHighScores();

    instructionsDisplay.style.display = "default";
    scoreDisplay.style.display = "none";
    quizDisplay.style.display = "none";
    scoreForm.style.display = "none";
}

function renderHighScores() {
    for (var i = 0; i < scoreArray.length; i++) {

        // scoreArray.sort.score(function(a,b){return b.score - a.score});
        // TODO: to sort, must make sure parsed JSON scores are numbers, not strings.

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
})

// Variables for taking the quiz.
var playButton = document.querySelector("#play");
var incorrectBtns = document.querySelectorAll(".opt");
var correctBtns = document.querySelectorAll(".correct");

// all functions that run when Play button is pushed.
playButton.addEventListener("click", function() {
    quizDisplay.style.display = "flex";
    instructionsDisplay.style.display = "none";
    initTimer();
    // function for displaying one question at a time. switch to next question on click.
    quizCardDisplay();
})

// timer variables and functions.
var timerSpan = document.querySelector("#timer");
var userScoreSpan = document.querySelector("#userScoreSpan");
var lastQuestion = document.querySelector("#q20");
var timerCard = document.querySelector("#timerCard")

function initTimer() {
    var secondsLeft = 60;
    
    var clickLastQ = false;
    lastQuestion.addEventListener("click", function() {clickLastQ = true;})
    clickIncorrect = false;

    var timerInterval = setInterval(function() {
        timerSpan.textContent = secondsLeft;
        secondsLeft--;
        
        incorrectBtns.forEach(function(element) {
            element.addEventListener("click", function() {
                clickIncorrect = true;
            })
        })

        if (secondsLeft > 0 && clickIncorrect === true) {
            // timerCard.style.backgroundColor = "red"; //TODO: blink red for 2 seconds.
            secondsLeft = secondsLeft - 3;
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

function gameOver() {
    console.log("Game Over") //test
    quizDisplay.style.display = "none";
    scoreForm.style.display = "flex";
}

// TODO: remove onclick from HTML and replace here in script. 
// correctBtns.forEach.onclick = function(){plusCards(1)};
// incorrectBtns.forEach.onclick = function(){plusCards(1)};

let cardIndex = 1;

// Next controls
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