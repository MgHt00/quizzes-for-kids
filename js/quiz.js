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
  console.log(`target.textContent - ${selectedAnswer}`);
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  console.log(`correct answer - ${currentQuestion.correctAnswer}`);
  if (selectedAnswer === currentQuestion.correctAnswer) {
    // This line adds the correct class to the button that was clicked
    event.target.classList.add("correct");
    // Show random correct message
    messageContainer.textContent = correctMessages[random(0, correctMessages.length-1)];
  } else {
    event.target.classList.add("incorrect");
    messageContainer.textContent = wrongMessages[random(0, wrongMessages.length-1)];
  }
}

function nextButtonClick(event) {
    shuffledQuestions.length === 0 ? finishSession() : randomQuestion();
}

function randomQuestion() {
  // Clear previous answers
  answersContainer.innerHTML = '';

  // Generate a random question index
  currentQuestionIndex = random(0, (shuffledQuestions.length-1));
  console.log(`current index is: ${currentQuestionIndex}`);

  // Display the question
  questionContainer.textContent = shuffledQuestions[currentQuestionIndex].question;
  console.log(`Length of ShuffledQuestions: ${shuffledQuestions.length}`);

  // Display the answers
  let tempAnswersArray = shuffledQuestions[currentQuestionIndex].answers;
  for (let answer of tempAnswersArray) {
    const answerButton = document.createElement("button");
    answerButton.setAttribute("class", "answer-btn");
    answerButton.textContent = answer;
    answerButton.addEventListener("click", handleAnswerClick);
    answersContainer.append(answerButton);
  }

  // Delete shown questions from `shuffleQuestions` array
  shuffledQuestions.splice(currentQuestionIndex, 1);
  //console.log(`${shuffledQuestions[currentQuestionIndex].question} : is popped.`);
  console.log(`Length of ShuffledQuestions after one question is displayed: ${shuffledQuestions.length}`);
}

function finishSession() {
  // Clear previous question and answers
  questionContainer.innerHTML = '';
  answersContainer.innerHTML = '';

  messageContainer.textContent = "Well done! You've completed all the questions.";

  if (nextButton) {
    nextButton.remove();
  }
}

randomQuestion();

nextButton.addEventListener("click", nextButtonClick);