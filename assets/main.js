let timerEl = document.querySelector("#timer");

let timeLeft = 200; // Starting amount of time when quiz begins



function countdown(){
   let timeInterval = setInterval(function(){
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + " seconds";
            timeLeft--;
        } else if (timeLeft === 1){
            timerEl.textContent = timeleft + " second";
            time--;
        } else {
            clearInterval(timeInterval);
            // call some other function, maybe the "game over" function
        }
   }, 1000)
}