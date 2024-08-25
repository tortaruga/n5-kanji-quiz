import { kanji } from './questions.js';
import { answerContainer, header, kanjiCard, quizContainer, scoreContainer, scoreSpan } from './constants.js';
import { playAgainBtn, startAllBtn, startTenBtn } from './buttons.js';

// initialize variables for later use
let score = 0;
let options = [];
let optionButtonListeners = [];
let scorePercentage;

const correctColor = '#91b5a9';
const incorrectColor = '#e78e8e';

// create function to shuffle elements using fisher-yates algorithm 
 function shuffleArray(arr) {
    // iterate from last element to first
    for (let i = arr.length - 1; i > 0; i--) {
        // create a random index between the current one and 0
        // (a random index among all those that haven't been swapped yet)
        const j = Math.floor(Math.random() * (i + 1));
        // swap the current element with the element at index j
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
 }

// function to get n number of random elements from an array
 function getRandomElements(arr, n) {
    // using the spread operator prevents the original array from being changed too
    const shuffledArray = shuffleArray([...arr]);
    // gets the first n elements from the new array
    return shuffledArray.slice(0, n); 
 } 

// add event listeners to start buttons
startTenBtn.addEventListener('click', (e) => {
    startQuiz(e);
})

startAllBtn.addEventListener('click', (e) => {
  startQuiz(e);
})

function startQuiz(e) {
    handleQuiz(e);
    hide(header);
    show(quizContainer);    
}

// create four buttons for the options and select them 
createOptionButtons(4);
const optionButtons = document.querySelectorAll('.option');


// function to handle quiz
function handleQuiz(e) {
    // everytime you take the quiz the index should be reset to 0
    let index = 0;
 
    if (e.target.id === 'start-10') {
       //  start quiz on 10 random kanji:
       //   get an array of 10 random kanji
       const questions = getRandomElements(kanji, 10);

       handleQuestions(questions, index);
    } else {
        // start quiz on all kanji
        // shuffle the questions so they are in different order everytime you take the quiz
        const questions = shuffleArray([...kanji]);
        handleQuestions(questions, index);
    }
}

function handleQuestions(arr, index) {
    // show current kanji 
    displayKanji(arr, index);  
    // update the text of the option buttons
     updateOptions(arr, index); 0
    // handle options event listeners
     optionsEventListener(arr, index);
}

// handle option buttons event listeners
function optionsEventListener(arr, index) {
    // remove previous event listeners (if present)
    optionButtons.forEach((btn, i) => {
        if (optionButtonListeners[i]) {
            btn.removeEventListener('click', optionButtonListeners[i]);
        }
    });

    // Add new event listeners
    optionButtons.forEach((btn, i) => {
        
        // create function to be triggered on click
        const listener = (e) => {
            // check the answer and handle feedback
            const selectedAnswer = e.target;
            const correctAnswer = Array.from(document.querySelectorAll('.option')).find(option => option.innerHTML === arr[index].meaning);
            
            checkAnswer(e, arr, index, selectedAnswer, correctAnswer);
            // update index of the question 
            index += 1;  
            // remove feedback colors and show next question after 800ms
            setTimeout(() => {
              resetColor(selectedAnswer);
              resetColor(correctAnswer);
              handleNextQuestion(arr, index);
            }, 800);       
        };
        // add the function as event listener and push it in the event listeners array
        // so it can be removed for the next question and then added again
        // if we dont do this the event listeners just keep on piling and weird stuff starts to happen
        // just strust me
        btn.addEventListener('click', listener);
        optionButtonListeners[i] = listener;
    });
}

function checkAnswer(e, arr, index, selected, correct) {
    if (selected.innerHTML === arr[index].meaning) {
        score += 1;
        selected.style.background = correctColor;
        selected.style.color = 'white';
        correct.style.color = 'white';
    } else {
        selected.style.background = incorrectColor;
        selected.style.color = 'white';
        correct.style.color = 'white';
        correct.style.background = correctColor;
    }

}

function resetColor(btn) {
    btn.style.background = 'white'; 
    btn.style.color = '#515f6d';
    btn.style.color = '#515f6d';
}


function calculateScore(arr) {
  scorePercentage = (score / arr.length) * 100; 
}

function displayScore() {
    if (scorePercentage < 50) {
        scoreSpan.innerHTML = `${scorePercentage}%... 😅`;
    } else if (scorePercentage >= 50 && scorePercentage < 75) {
        scoreSpan.innerHTML = `${scorePercentage}%! 👍`;
    } else if (scorePercentage >= 75 && scorePercentage < 100) {
        scoreSpan.innerHTML = `${scorePercentage}%! 🥳🎉`;
    } else {
        scoreSpan.innerHTML = `${scorePercentage}%! 🤩`; 
    }
 
}

function handleNextQuestion(arr, index) {
    // if it was the last question display the score
    if (index > arr.length - 1) {
        hide(quizContainer);
        show(scoreContainer);
        
        calculateScore(arr);
        displayScore();
    } else {
        // else show next question and update options
        displayKanji(arr, index);  
        updateOptions(arr, index);
    }
}

// handle play again
playAgainBtn.addEventListener('click', playAgain);

function playAgain() {
    // get back to intro page and reset values
    show(header); 
    hide(scoreContainer);
    score = 0;
    options = []; 
}

// handle option buttons
function updateOptions(arr, index) {
    // remove current kanji from the array of questions
    const updatedArray = arr.filter(question => question !== arr[index]);
    // get three random kanji from the updated array and store them in options array
    options = getRandomElements(updatedArray, 3); 
    // push the current kanji in the options to make sure one of the options is the correct one
    options.push(arr[index]);
    //  shuffle the options array otherwise the correct answer will always be the last
   shuffleArray(options);
    // update the text of the option buttons to be the meaning of our four kanji options   
   optionButtons.forEach((btn, index) => {
    btn.innerHTML = options[index].meaning; 
   })

}

function hide(element) {
    element.classList.add('hide');
    element.classList.remove('show');
}

function show(element) {
    element.classList.remove('hide');
    element.classList.add('show');
}

function displayKanji(arr, index) {
    kanjiCard.innerHTML = arr[index].kanji;  
}


function createOptionButtons(n) {
    // use a loop to create n buttons, give them a class of option and append them to the answer container
   for (let i = 0; i < n; i++) {
    const option = document.createElement('button');
    option.classList.add('option');
    answerContainer.appendChild(option);
   }
}

