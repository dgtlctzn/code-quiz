var questionEl = document.getElementById("questions");
var answerEl = document.getElementById("answers");
var startEl = document.getElementById("start");
var headerEl = document.getElementById("header");
var confirmEl = document.getElementById("confirmation");
var timerEl = document.getElementById("timer");

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

introPage();

// generates quiz intro page
function introPage() {
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

  changeTimer(currentTime);
}

// timer functions
function changeTimer(time) {
  timerEl.textContent = "Time: " + time;
}

function displayAnswers(questionNumber) {
  answerEl.innerHTML = "";
  for (var i = 0; i < 4; i++) {
    var answerButton = document.createElement("button");
    answerButton.textContent = quizData[questionNumber].answers[i];
    answerButton.setAttribute("type", "button");
    answerButton.setAttribute("class", "btn btn-primary");

    answerEl.appendChild(answerButton);
  }
}

function subtractTime() {
  currentTime--;
  changeTimer(currentTime);
}

function generateQuestion(questionNumber) {
  headerEl.innerHTML = "";
  questionEl.innerHTML = "";
  startEl.innerHTML = "";

  var questionText = document.createElement("p");
  questionText.textContent = quizData[questionNumber].question;

  questionEl.appendChild(questionText);

  displayAnswers(questionNumber);
}

function grader(userPick, questionNumber) {
  confirmEl.innerHTML = "";
  console.log("correct: " + quizData[questionNumber].correctAnswer);
  if (userPick === quizData[questionNumber].correctAnswer) {
    confirmEl.innerHTML = "<p>Correct Answer!</p><hr>";
    setTimeout(function () {
      confirmEl.innerHTML = "";
    }, 1000);
  } else {
    currentTime -= 10;
    confirmEl.innerHTML = "<p>Wrong Answer</p><hr>";
    setTimeout(function () {
      confirmEl.innerHTML = "";
    }, 1000);
  }
}

function finalPage() {
  var finalHeader = document.createElement("h1");
  finalHeader.textContent = "All Done!";

  answerEl.innerHTML = "";
  questionEl.innerHTML = "";

  headerEl.appendChild(finalHeader);
}

function score() {
  var finalScore = currentTime;
  changeTimer(finalScore);
  return finalScore;
}

// start quiz
startEl.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    generateQuestion(0);
    currentTime = 75;
    changeTimer(currentTime);
    setInterval(subtractTime, 1000);
  }
});

// next question
answerEl.addEventListener("click", function (event) {
  if (event.target.matches("button") && currentNumber < quizData.length - 1) {

    var userAnswer = event.target.textContent;
    grader(userAnswer, currentNumber);

    currentNumber++;
    generateQuestion(currentNumber);
  } else {
    var userAnswer = event.target.textContent;
    grader(userAnswer, currentNumber);
    var myScore = score();
    console.log(myScore);
    finalPage();
  }
});
