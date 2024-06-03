const questionContainer = document.querySelector(".question-container");
const answersContainer = document.querySelector(".answers-container");
const paginationContainer = document.querySelector(".pagination-container");
const messageContainer = document.querySelector(".message-container");
const nextButton = document.querySelector(".next-btn");
let currentQuestionIndex;
let currentQuestionNo = 1;

const questions = [
  { 
    question: "Whenever I go to the old part of a city, I like to ________ all the shops selling antiques.", 
    answers: ["examine", "search", "check", "explore"], 
    correctAnswer: "explore"
  },
  {
    question: "There was no fixed agenda for that particular day as it was to be regarded simply as a ________ meeting.",
    answers: ["possible", "probable", "unplanned", "casual"],
    correctAnswer: "casual"
  },
  {
    question: "The teacher asked the students to __________ their answers before submitting the test.", 
    answers: ["look", "review", "correct", "fix"], 
    correctAnswer: "review" 
  },
  {
    question: "She loves to __________ in her favorite book during rainy days.", 
    answers: ["read", "play", "sleep", "watch"], 
    correctAnswer: "read" 
  },
  /*
  To complete the process efficiently, it's essential to follow each step in the correct __________.
  (a) way
  (b) sequence
  (c) manner
  (d) fashion

  The artist was known for her ability to ________ emotions through her paintings.
  (a) display
  (b) convey
  (c) show
  (d) express
  */
];

// copy questions array to a temporary array
let shuffledQuestions = [...questions];

const correctMessages = ["Fantastic!", "Awesome!", "Brilliant!", "Great job!", "Excellent!", "Superb!", "Outstanding!"];
const wrongMessages = ["Almost there!", "Keep going!", "Nice effort!", "Keep practicing!", "Good try!"];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomQuestion() {
  // Simulate disabling the button after 0.3 seconds 
  // and add `disabled` class
  setTimeout(() => {
    nextButton.disabled = true;
    nextButton.classList.add("disabled");
  }, 300);
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

function DisplayPagination() {
    // Clear previous pagination (if needed)
    paginationContainer.innerHTML = '';
    // Display pagination
    for (let i = 1; i <= questions.length; i++) {
      const pagination = document.createElement("div");
      pagination.setAttribute("class", "pagination");
      // Add 'active' class to show where we are right now with the pagination
      if (i === currentQuestionNo) {
        pagination.classList.add("active");
      }
      paginationContainer.append(pagination);
    }
    currentQuestionNo++
}

function handleAnswerClick(event) {
  const selectedAnswer = event.target.textContent;

  // Assign currently showing question and answer set to a temp object.
  const currentQuestionSet = shuffledQuestions[currentQuestionIndex];

  if (selectedAnswer === currentQuestionSet.correctAnswer) {
    // Adds the `correct` class to the button that was clicked
    event.target.classList.add("correct");

    // Disable all buttons
    const allButtons = document.querySelectorAll(".answer-btn");
    for (let button of allButtons) {
      button.disabled = true;
    }
    
    // Simulate re-enabling the button after 0.3 seconds
    setTimeout(() => {
        nextButton.disabled = false;
        nextButton.classList.remove("disabled");
    }, 300);
    
    nextButton.addEventListener("click", nextButtonClick);
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
    DisplayPagination();
    shuffledQuestions.length === 0 ? finishSession() : spliceQuestion();
}


function spliceQuestion() {
  // Delete shown questions from `shuffleQuestions` array
  shuffledQuestions.splice(currentQuestionIndex, 1);

  // randomQestion() is called again, if there is still a question left after the splice()
  shuffledQuestions.length === 0 ? finishSession() : randomQuestion();
}

function finishSession() {
  // Clear previous question, answers, and pagination; then show the complete message
  questionContainer.remove();
  answersContainer.remove();
  paginationContainer.remove();
  
  messageContainer.textContent = "Well done! You've completed all the questions.";

  // Remove Next button from display
  if (nextButton) {
    nextButton.remove();
  }
}

// Calls initial functions at the start
randomQuestion();
DisplayPagination();

// Disable `nextButton` at the start
nextButton.disabled = true;