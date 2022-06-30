const questions = [
    {
        question: " Given the array, var a = [20, 40, 60, 80], which line of code accesses the value the value of 40?",
        options: ["a[0]", "a[1]", "a[2]", "a[3]"],
        answer: 1
    },

    {
        question: "Which term is not synonymous with the term JavaScript?",
        options: ["ECMAScript", " JS", "Java", "All of the terms above"],
        answer: 2
    },

    {
        question: " If the penalty is $20 per day late, which of the following lines of code accurately calculates the late penalty?",
        options: [" var penalty = daysLate + 20;", "var penalty = daysLate * 20;", "var penalty = daysLate * 20;", "var penalty = daysLate && 20;"],
        answer: 1
    },

    {
        question: " Which of the following is not a primary color used by computers to represent every possible color on a traditional computer screen?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: 3

    }
];
let gameIndex = 0
const highScores = [];
// const startButton = document.getElementById('start-button')
const startButton = $("#start-button");
const pageOne = $("#start");
const pageTwo = $("#game");
const answerButton = $(".answer-button");
const pageThree = $("#results")
const id = $("#initials")

const startMinute = 1.5;
let time = startMinute * 60;
const countdown = document.querySelector("p");

let setCoundown

function startTime() {
    if (time <= 0) {
        clearInterval(setCoundown)
    }
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdown.innerText = minutes + ":" + seconds
    time--
    // console.log({ minutes , seconds });
};

function loadQuestion(obj) {
    $("#question").text(obj.question)

    for (let i = 0; i < obj.options.length; i++) {
        $("#" + i).text(obj.options[i])


    }

}

function startGame(e) {
    // console.log("Im here");
    pageOne.addClass('hide');
    pageTwo.removeClass('hide');

    setCoundown = setInterval(startTime, 1000);
    loadQuestion(questions[gameIndex])
}


function answerClick(e) {
    let userInput = e.target.id
    if (questions[gameIndex].answer == userInput) {
        console.log("correct");
    } else {
        console.log("wrong");
        time -= 5
    }
    gameIndex++
    if (questions.length === gameIndex) {
        gameOver()
    } else {

        loadQuestion(questions[gameIndex])
    }

}

function gameOver() {
    clearInterval(setCoundown)

    pageTwo.addClass('hide');
    pageThree.removeClass('hide');
    $("#enter-score").text(time)
    id.removeClass('hide')
    renderScores()
}

function formSubmission(event) {
    event.preventDefault()
    let userInitials = $("#initials-text").val()
    localStorage.setItem(userInitials, time)
    renderScores()
    // console.log(userInitials);
};

function renderScores() {
    let display = $("#display-scores")
    display.empty()
    for (const key of Object.keys(localStorage)) {
        // console.log(key);
        display.append(`
        <li>${key} Score: ${localStorage.getItem(key)}</li>
        `)
        
        
    }
}


startTime()

// startButton.addEventListener("click", startGame)
startButton.on("click", startGame)
answerButton.on("click", answerClick)
id.on("submit", formSubmission)