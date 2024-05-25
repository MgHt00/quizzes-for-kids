const questionContainer = document.querySelector(".question-container");
const answersContainer = document.querySelector(".answers-container");

const questions = [
  { 
    question: "What is the capital of France?", 
    answers: ["Berlin", "Madrid", "Paris", "Rome"], 
    correctAnswer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    question: "What is the color of the sky?", 
    answers: ["Blue", "Green", "Red", "Yellow"], 
    correctAnswer: "Blue" 
  },
];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomQuestion() {
  // Clear previous answers
  answersContainer.innerHTML = '';

  let currentQuestionIndex = random(0, (questions.length-1));

  questionContainer.textContent = questions[currentQuestionIndex].question;

  let tempAnswersArray = questions[currentQuestionIndex].answers;

  for (let answer of tempAnswersArray) {
    const answerButton = document.createElement("button");
    answerButton.setAttribute("class", "answer-btn");
    answerButton.textContent = answer;
    //answerButton.addEventListener("click", handleAnswerClick);
    answersContainer.append(answerButton);
  }
}

randomQuestion();