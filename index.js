var questionEl = document.getElementById("questions");
var answerEl = document.getElementById("answers");
var startEl = document.getElementById("start");
var headerEl = document.getElementById("header");

quizData = [
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
    correctAnswer: "4. parenthesis",
  },
  {
    question:
      "A very usefule tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. JavaScript",
      "2. terminal / bash",
      "3. for loops",
      "4. console.log",
    ],
    correctAnswer: "4. console.log",
  },
];

introPage();

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

  startEl.appendChild(startButton);
  questionEl.appendChild(startText);
  headerEl.appendChild(headerText);
}

