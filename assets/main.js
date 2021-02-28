let timerEl = document.querySelector("#timer");
let homeScreen = document.querySelector("#home-screen");
let startButton = document.querySelector("#start-quiz");
let quizQuestions = document.querySelector("#quiz");

let timeLeft = 199; // Starting amount of time when quiz begins
let currentQuestionIndex = 0;

startButton.addEventListener("click", startQuiz); // Event listener for Start Quiz buttons

// Countdown timer function
function countdown(){
   let timeInterval = setInterval(function(){
        if (timeLeft > 1) {
            timerEl.textContent = `${timeLeft} seconds`;
            timeLeft--;
        } else if (timeLeft === 1){
            timerEl.textContent = `${timeLeft} second`;
            timeLeft--;
        } else {
            timerEl.innerHTML = "<strong>0 seconds</strong>";
            clearInterval(timeInterval);
            // call some other function, maybe the "game over" function
        }
   }, 1000)
}

// Use this to cycle through and display the questions with answers. Should hide the "main" section of the page and show the quiz questions
function startQuiz(){
    homeScreen.setAttribute("class", "hidden"); // Hides the homescreen main paragraph
    quizQuestions.setAttribute("class", "visible"); // Makes the quiz section of the page visible

    countdown(); 

    getQuestion ();
} 


function getQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let titleEl = document.querySelector("#question-title");
    let questionEl = document.querySelector("#choices");
    titleEl.textContent = currentQuestion.title;
    questionEl.textContent = currentQuestion.choices;

}



// Array of questions/answers
let questions = [
    {
        title: "What's the proper format to initalize an array?",
        choices: ["let myArr = ();", "let myArr = [];", "let myArr = {};", "let myArr() = ;"],
        answer: "let myArr = [];"
    },
    {
        title: "To deterime hwo many characters are in a string, you add ______ to the end of your string/variable.",
        choices: [".characterCounter", ".length()", ".string", ".length"],
        answer: ".length"
    },
    {
        title: "How do you convert 'SCOTT' to 'scott'?",
        choices: [".toLowerCase()", ".lower", ".toLowercase", ".lowercase()"],
        answer: ".toLowerCase()"
    },
    {
        title: "How do you convert a number to a string?",
        choices: ["number + 0", "number.toString()", "number.string", "number.createString()"],
        answer: "number.toString()"
    },
    {
        title: "How do you divide 10 by 5 in JavaScript?",
        choices: ["10 / 5", "5 / 10", "10 % 5", "10 // 5"],
        answer: "10 / 5"
    }
]




