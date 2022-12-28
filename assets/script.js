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

// this is the funtion to determine where to place the score on the scoreboard.
// make an array of objects.
// after each score is saved, push result in to array.
// sort the array. 
// render array into top five placement spans by array index.

// TEST function to render high scores
function renderHighScore() {
    var initials = localStorage.getItem("initials");
    firstInitialsSpan.textContent = initials;
}

// event listener for submit-score button
var submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    // these variables are where users will input their initials.
    var initials = document.querySelector("#initials").value; 
    // var score = *time remaining on timer.
    
    // this local storage is how new initials/scores will be stored
    localStorage.setItem("initials", initials);
    // localStorage.setItem("score", score)

    renderHighScore();
});

// Variables for taking the quiz.
var playButton = document.querySelector("#play");

var correctBtns = document.querySelectorAll(".correct"); // creates a NodeList
var incorrectBtns = document.querySelectorAll(".opt");

correctBtns.forEach(function(elem) {
    elem.addEventListener("click", function() {
        elem.style.backgroundColor = "green";
    });
});

incorrectBtns.forEach(function(elem) {
    elem.addEventListener("click", function() {
        elem.style.backgroundColor = "red";
    });
});

// all functions that run when Play button is pushed.
playButton.addEventListener("click", function() {
    setTimer();
}
)

// timer variables and functions.
var timerSpan = document.querySelector("#timer");

function setTimer() {
    var secondsLeft = 60;
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerSpan.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
      } 
    //   add else if (answer last question) {pause interval}
    }, 1000);
  }