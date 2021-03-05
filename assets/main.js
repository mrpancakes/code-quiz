// DOM Elements
let homeLink = document.querySelector("#home");
let homeScreen = document.querySelector("#home-screen");
let timerEl = document.querySelector("#timer");
let startButton = document.querySelector("#start-quiz");
let quizQuestions = document.querySelector("#quiz");
let titleEl = document.querySelector("#question-title");
let choicesEl = document.querySelector("#choices");
let feedbackEl = document.querySelector("#feedback");
let quizComplete = document.querySelector("#quiz-complete");
let finalScore = document.querySelector("#final-score");
let initials = document.querySelector("#initials");
let submitButton = document.querySelector("#submit");
let highScores = document.querySelector("#high-scores")
let scoreList = document.querySelector("#score-list");
let viewScores = document.querySelector("#view-scores");

// Starting variables 
let timeLeft = 89; // Starting amount of time when quiz begins
let currentQuestionIndex = 0; // starting point for which object in the Questions array will display at the start of the quiz, referenced in getQuestion function
let score = 0;
let scoresArray = [];

// Event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", submitScore);
viewScores.addEventListener("click", highScoresPage);
homeLink.addEventListener("click", function refreshPage(){
    window.location.reload();
})


// Countdown timer function
function countdown() {
    let timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = `Time Left: ${timeLeft} seconds`;
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = `Time Left: ${timeLeft} second`;
            timeLeft--;
        } else {
            timerEl.innerHTML = "Time Left: <strong>0 seconds</strong>";
            clearInterval(timeInterval);
            endQuiz(); // call some other function, maybe the "game over" function
        }
    }, 1000)
}

// Use this to cycle through and display the questions with answers. Should hide the "main" section of the page and show the quiz questions
function startQuiz() {
    homeScreen.setAttribute("class", "hidden"); // Hides the homescreen main paragraph
    quizQuestions.setAttribute("class", "visible"); // Makes the quiz section of the page visible
    viewScores.setAttribute("class", "hidden"); // Hides View Scores while the quiz is in progress
    homeLink.setAttribute("class", "visible"); // Shows the Home link in the header
    countdown();
    getQuestion();
}

function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    titleEl.textContent = currentQuestion.title; // Sets the title of the question

    choicesEl.innerHTML = " "; // Reset old choices

    currentQuestion.choices.forEach(choice => {
        let choiceNode = document.createElement("button");

        choiceNode.setAttribute("value", choice, "id", "choice");

        choiceNode.textContent = choice;

        choiceNode.onclick = questionClick;

        choicesEl.appendChild(choiceNode); // display answer choices on the page
    })

}

function questionClick() {

    // if the user's choice does not equal the correct answer, deduct 10 sec and flash "incorrect" block...
    if (this.value !== questions[currentQuestionIndex].answer) {
        timeLeft -= 10;

        if (timeLeft <= 0) {
            timeLeft = 0;
        }

        timeLeft.textContent = timeLeft;
        feedbackEl.textContent = "Incorrect"; // Adds the the text "Incorrect" to this element in the HTML
        feedbackEl.setAttribute("class", "incorrect"); // Adds the "Incorrect" class to the element in HTML, which has a red background color
        
    } else {
        feedbackEl.textContent = "Correct!"; // Adds the the text "Correct!"" to this element in the HTML
        feedbackEl.setAttribute("class", "correct"); // Adds the "Correct" class to the element in HTML, which has a green background color
        score += 20;
    }

    // Timeout function clears out the Feedback elements after one second
    setTimeout(function () {
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

function endQuiz() {
    timeLeft = 0;
    finalScore.textContent = `${score}`;
    finalScore.setAttribute("data-score", finalScore);
    quizQuestions.setAttribute("style", "display: none;");
    quizComplete.setAttribute("class", "visisble");
}

function submitScore() {

    let personScore = {
        initials: initials.value.toUpperCase().trim(),
        score: score
    }
    if (personScore.initials === "") {
        return;
    }

    if (JSON.parse(localStorage.getItem("Scores"))) {
        scoresArray = JSON.parse(localStorage.getItem("Scores"));
    }
    scoresArray.push(personScore);

    highScoresPage();

}

// Directs you to the High Scores page. Also used in the HTML onClick for the "View High Scores" link.
function highScoresPage() {
    quizQuestions.setAttribute("class", "hidden");
    homeScreen.setAttribute("class", "hidden");
    quizComplete.setAttribute("class", "hidden");
    viewScores.setAttribute("class", "hidden")
    timerEl.setAttribute("class", "hidden");
    homeLink.setAttribute("class", "visible")
    highScores.setAttribute("class", "visible");
    storeScores();
}

function renderScores() {
    scoreList.innerHTML = "";

    for (let i = 0; i < scoresArray.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoresArray[i].initials}: ${scoresArray[i].score}/100`;
        li.setAttribute("data-index", i);
        scoreList.appendChild(li);
    }
}

function init() {
    if (JSON.parse(localStorage.getItem("Scores"))) {
        scoresArray = JSON.parse(localStorage.getItem("Scores"));
    }
}

function storeScores() {
    localStorage.setItem("Scores", JSON.stringify(scoresArray));
    renderScores();
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

init();