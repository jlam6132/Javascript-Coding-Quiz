const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
let c = 10;
var score = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function timer001() {
    c--;
    if (c < 10) {
        time001.innerHTML = c;
    }

    if (c === 0) {
        window.clearInterval(update)
        window.alert("Time's up! You got " + score + "/" + questions.length + ".")
    }
}

update = setInterval("timer001()", 1000);


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
    score++;
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
  {
    question: "Which is NOT a way a declare a variable in Javascript?",
    answers: [
        { text: "const", correct: false },
        { text: "var", correct: false },
        { text: "let", correct: false },
        { text: "cont", correct: true }
    ]
  },
  {
    question: "What is the arithmetic operator for modulo?",
    answers: [
      { text: "+=", correct: false },
      { text: "%", correct: true },
      { text: "===", correct: false },
      { text: "/=", correct: false }
    ]
  },
  {
    question: "What is used to make a single-line comment? in Javascript",
    answers: [
      { text: " */ text /*", correct: false },
      { text: "/* text */" , correct: false },
      { text: "// text", correct: true },
      { text: "<! text ->", correct: false }
    ]
  },
  {
    question: "What method is used to add an element to an array?",
    answers: [
        { text: ".push", correct: false },
        { text: ".pull" , correct: false },
        { text: ".pop", correct: true },
        { text: ".log", correct: false }
    ]
  }
]




