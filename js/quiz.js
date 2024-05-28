const questionContainer = document.querySelector(".question-container");
const answersContainer = document.querySelector(".answers-container");
const messageContainer = document.querySelector(".message-container");
const nextButton = document.querySelector(".next");
let currentQuestionIndex;

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

// copy questions array to a temporary array
let shuffledQuestions = [...questions];

const correctMessages = ["Fantastic!", "Awesome!", "Brilliant!", "Great job!", "Excellent!", "Superb!", "Outstanding!"];
const wrongMessages = ["Almost there!", "Keep going!", "Nice effort!", "Keep practicing!", "Good try!"];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleAnswerClick(event) {
  const selectedAnswer = event.target.textContent;

  // Assign currently showing question and answer set to a temp object.
  const currentQuestionSet = shuffledQuestions[currentQuestionIndex];

  if (selectedAnswer === currentQuestionSet.correctAnswer) {
    // Adds the `correct` class to the button that was clicked
    event.target.classList.add("correct");
    // Show random correct message drawn from `correctMessages` array
    messageContainer.textContent = correctMessages[random(0, correctMessages.length-1)];
  } else {
    // Adds the `incorrect` class to the button that was clicked
    event.target.classList.add("incorrect");
    messageContainer.textContent = wrongMessages[random(0, wrongMessages.length-1)];
  }
}

function nextButtonClick(event) {
  // spliceQuestion() is called, if there is still a question left in `shuffledQuestions`
    shuffledQuestions.length === 0 ? finishSession() : spliceQuestion();
}

function randomQuestion() {
  // Clear previous answers
  answersContainer.innerHTML = '';

  // Generate a random question index
  currentQuestionIndex = random(0, (shuffledQuestions.length-1));

  // Display the question
  questionContainer.textContent = shuffledQuestions[currentQuestionIndex].question;

  // Copy `answers` array from `shuffledQuestions` to a temporary array
  let tempAnswersArray = [...shuffledQuestions[currentQuestionIndex].answers];

  // Display the answers
  for (let answer of tempAnswersArray) {
    const answerButton = document.createElement("button");
    answerButton.setAttribute("class", "answer-btn");
    answerButton.textContent = answer;
    answerButton.addEventListener("click", handleAnswerClick);
    answersContainer.append(answerButton);
  }
}

function spliceQuestion() {
  // Delete shown questions from `shuffleQuestions` array
  shuffledQuestions.splice(currentQuestionIndex, 1);

  // randomQestion() is called again, if there is still a question left after the splice()
  shuffledQuestions.length === 0 ? finishSession() : randomQuestion();
}

function finishSession() {
  // Clear previous question and answers; then show the complete message
  questionContainer.innerHTML = '';
  answersContainer.innerHTML = '';

  messageContainer.textContent = "Well done! You've completed all the questions.";

  // Remove Next button from display
  if (nextButton) {
    nextButton.remove();
  }
}

// Calls `randomQuestion()` at the start
randomQuestion();

nextButton.addEventListener("click", nextButtonClick);