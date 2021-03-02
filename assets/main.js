// DOM Elements
let timerEl = document.querySelector("#timer");
let homeScreen = document.querySelector("#home-screen");
let startButton = document.querySelector("#start-quiz");
let quizQuestions = document.querySelector("#quiz");
let titleEl = document.querySelector("#question-title");
let choicesEl = document.querySelector("#choices");
let questionEl = document.querySelector("#choices");
let feedbackEl = document.querySelector("#feedback");
let finalScore = document.querySelector("#final-score")
let submitScore = document.querySelector("#submit-score");


let timeLeft = 10; // Starting amount of time when quiz begins
let currentQuestionIndex = 0; // starting point for which object in the Questions array we'll display at the start of the quiz, Referenced in getQuestion function
let score = 0;

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
   if (timeLeft === 0){
       endQuiz();
   }
}

// Use this to cycle through and display the questions with answers. Should hide the "main" section of the page and show the quiz questions
function startQuiz(){
    homeScreen.setAttribute("class", "hidden"); // Hides the homescreen main paragraph
    quizQuestions.setAttribute("class", "visible"); // Makes the quiz section of the page visible

    countdown(); 

    getQuestion();

} 


function getQuestion(){
    let currentQuestion = questions[currentQuestionIndex]; 
    titleEl.textContent = currentQuestion.title; // Sets the title of the question

    choicesEl.innerHTML= " "; // Reset old choices

    currentQuestion.choices.forEach(choice => {
        let choiceNode = document.createElement("button");
       
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = choice;

        choiceNode.onclick = questionClick;

        choicesEl.appendChild(choiceNode); // display answer choices on the page

        console.log(score);
    })

}

function questionClick(){

    if (this.value !== questions[currentQuestionIndex].answer){
        timeLeft -= 10;

        if (timeLeft <= 0 ) {
            timeLeft = 0;
        }

        timerEl.textContent = timeLeft;
        feedbackEl.setAttribute("class", "incorrect");
        feedbackEl.textContent = "Incorrect";
        
    } else {
        feedbackEl.setAttribute("class", "correct");
        feedbackEl.textContent = "Correct!";
        score += 20;
    }

    setTimeout(function() {
        feedbackEl.setAttribute("class", "");
        feedbackEl.textContent = "";
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }

}

function endQuiz () {
    timeLeft = 0;
    finalScore.textContent = `${score}`;
    quizQuestions.setAttribute("class", "hidden");
    submitScore.setAttribute("class", "visisble");


}



// Array of questions/answers
let questions = [
    {
        title: "What's the proper format to initalize an array?",
        choices: ["let myArr = ();", "let myArr = [];", "let myArr = {};", "let myArr() = ;"],
        answer: "let myArr = [];"
    },
    {
        title: "To determine how many characters are in a string, you add ______ to the end of your string/variable.",
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




