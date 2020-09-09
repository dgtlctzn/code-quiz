var topBar = document.getElementById("top-bar");
var questionEl = document.getElementById("questions");
var answerEl = document.getElementById("answers");
var startEl = document.getElementById("start");
var headerEl = document.getElementById("header");
var confirmEl = document.getElementById("confirmation");
var timerEl = document.getElementById("timer");
var endEl = document.getElementById("end");
var scoreEl = document.getElementById("score-page");

var quizData = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAnswer: "3. alerts",
  },
  {
    question:
      "The condition in an If / Else Statement is enclosed within ________.",
    answers: [
      "1. quotes",
      "2. curly brackets",
      "3. parenthesis",
      "4. square brackets",
    ],
    correctAnswer: "3. parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store ________.",
    answers: [
      "1. numbers and strings",
      "2. other Arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correctAnswer: "4. all of the above",
  },
  {
    question:
      "String values must be enclosed within ________ when being assigned to variables.",
    answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    correctAnswer: "3. quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. JavaScript",
      "2. terminal / bash",
      "3. for loops",
      "4. console.log",
    ],
    correctAnswer: "4. console.log",
  },
];

// which question the user is on
var currentNumber = 0;
var currentTime = 0;
var done = false;

// page generation functions
function introPage() {
  headerEl.innerHTML = "";
  questionEl.innerHTML = "";
  topBar.setAttribute("class", "");

  var headerText = document.createElement("h1");
  headerText.textContent = "Coding Quiz Challenge";

  var startText = document.createElement("p");
  startText.textContent =
    "Try to answer to following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by ten seconds!";

  var startButton = document.createElement("button");
  startButton.textContent = "Start Quiz";
  startButton.setAttribute("type", "button");
  startButton.setAttribute("class", "btn btn-primary");

  headerEl.appendChild(headerText);
  questionEl.appendChild(startText);
  startEl.appendChild(startButton);

  currentTime = 55;
  changeTimer(currentTime);
}

function finalPage() {
  var finalHeader = document.createElement("h1");
  finalHeader.textContent = "All Done!";

  var endText = document.createElement("p");
  endText.textContent = "Your final score is " + currentTime + ".";

  var inputEl = document.createElement("div");
  // inputEl.setAttribute("id", "end-text")
  inputEl.innerHTML =
    "<input id='end-text' placeholder='Enter Initials'/><button type='button' class='btn btn-primary m-1'>Submit</button>";

  answerEl.innerHTML = "";
  questionEl.innerHTML = "";

  headerEl.appendChild(finalHeader);
  questionEl.appendChild(endText);
  endEl.appendChild(inputEl);
}

function scorePage() {
  headerEl.innerHTML = "";
  questionEl.innerHTML = "";
  answerEl.innerHTML = "";
  startEl.innerHTML = "";
  endEl.innerHTML = "";
  topBar.setAttribute("class", "hide");

  var highScores = document.createElement("h1");
  highScores.textContent = "Highscores";
  headerEl.appendChild(highScores);

  stopStartTimer();

  var myScores = JSON.parse(localStorage.getItem("scores"));
  if (myScores) {
    for (var i = 0; i < myScores.length; i++) {
      var scoreEl = document.createElement("p");
      scoreEl.setAttribute("class", "score-list")
      if (i % 2 === 0) {
        scoreEl.setAttribute("style", "background-color: lavender;")
      }
      scoreEl.textContent = (i + 1) + ". " + myScores[i].userName + " - " + myScores[i].score;
      questionEl.appendChild(scoreEl)
    }
  }

  var goBack = document.createElement("button");
  goBack.textContent = "Go Back";
  goBack.setAttribute("type", "button");
  goBack.setAttribute("class", "btn btn-primary m-1");

  var clearHighscores = document.createElement("button");
  clearHighscores.textContent = "Clear Highscores";
  clearHighscores.setAttribute("type", "button");
  clearHighscores.setAttribute("class", "btn btn-primary m-1");

  questionEl.appendChild(goBack);
  questionEl.appendChild(clearHighscores);  
}

// timer functions
function changeTimer(time) {
  timerEl.textContent = "Time: " + time;
}

function stopStartTimer() {
  var countdown = setInterval(function () {
    if (currentTime > 0 && !done && headerEl.textContent !== "Highscores") {
      currentTime--;
      console.log("1")
      changeTimer(currentTime);
    } else if ((currentTime === 0 || done) && headerEl.textContent !== "Highscores") {
      console.log("2")
      changeTimer(currentTime);
      clearInterval(countdown);
      finalPage();
    } else if (headerEl.textContent === "Highscores") {
      changeTimer(currentTime);
      clearInterval(countdown);
    }
  }, 1000);
}

// question generation functions
function generateQuestion(questionNumber) {
  headerEl.innerHTML = "";
  questionEl.innerHTML = "";
  startEl.innerHTML = "";

  var questionText = document.createElement("h3");
  questionText.textContent = quizData[questionNumber].question;

  questionEl.appendChild(questionText);

  displayAnswers(questionNumber);
}

function displayAnswers(questionNumber) {
  answerEl.innerHTML = "";
  for (var i = 0; i < 4; i++) {
    var answerButton = document.createElement("button");
    answerButton.textContent = quizData[questionNumber].answers[i];
    answerButton.setAttribute("type", "button");
    answerButton.setAttribute("class", "btn btn-primary m-1");

    answerEl.appendChild(answerButton);
  }
}

function grader(userPick, questionNumber) {
  confirmEl.innerHTML = "";
  if (userPick === quizData[questionNumber].correctAnswer) {
    confirmEl.innerHTML = "<p id='caption'>Correct Answer!</p><hr>";
    setTimeout(function () {
      confirmEl.innerHTML = "";
    }, 1000);
  } else {
    currentTime -= 10;
    confirmEl.innerHTML = "<p id='caption'>Wrong Answer</p><hr>";
    setTimeout(function () {
      confirmEl.innerHTML = "";
    }, 1000);
  }
}

function setLocal(user) {
  if (!localStorage.getItem("scores")) {
    var finalScores = [{userName: user, score: currentTime}];
    localStorage.setItem("scores", JSON.stringify(finalScores));
  } else {
    var finalScores = JSON.parse(localStorage.getItem("scores"));
    var newScores = {userName: user, score: currentTime};
    finalScores.push(newScores);
    localStorage.setItem("scores", JSON.stringify(finalScores));
  }
}

introPage();

// start quiz
startEl.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    done = false;
    currentNumber = 0;
    generateQuestion(0);   
    stopStartTimer();
  }
});

// next question
answerEl.addEventListener("click", function (event) {
  var userAnswer = event.target.textContent;
  if (event.target.matches("button") && currentNumber < quizData.length - 1) {
    grader(userAnswer, currentNumber);

    currentNumber++;
    generateQuestion(currentNumber);
  } else {
    done = true;
    grader(userAnswer, currentNumber);
  }
});

// enter initials

endEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.matches("button")) {
    var endText = document.getElementById("end-text");
    setLocal(endText.value);
    scorePage();
  }
});

scoreEl.addEventListener("click", function() {
  scorePage();
})

questionEl.addEventListener("click", function(event) {
  event.preventDefault();
  if (event.target.matches("button") && event.target.textContent === "Go Back") {
    introPage();
  }
})

questionEl.addEventListener("click", function(event) {
  event.preventDefault();
  if (event.target.matches("button") && event.target.textContent === "Clear Highscores") {
    localStorage.clear();
    scorePage();
  }
})
