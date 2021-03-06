# homework-04-code-quiz

## Description

This application is a quiz which tests the user's knowledge of JavaScript. By initiating the quiz, the 90 second timer begins ticking. Which each wrong answer, 10 seconds are deducted from the timer. Once complete, the score is displayed and user can submit their initials/score to local storage. All of the user's past scores are then displayed once the submit their initials.

### Application Functionality 
* When Start button is clicked:
    * The Main section is hidden
    * The timer function is called
    * The quiz function begings

* When a question is answered:
    * If correct, the "Correct!" feedback block appears, the next question appears, and 20 pts are added to your score.
    * If wrong, the timer decrements by 10 seconds, the "Incorrect" feedback block appears, and the next question appears.

* If the timer reaches 0, the quiz is over and your score is displayed.

* Used .toUpperCase() and .trim() in personScore.initials so that it coverts it to uppercase and removes any surrounding blank spaces
