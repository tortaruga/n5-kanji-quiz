 import { kanji } from './questions.js';
 import { answerContainer, header, kanjiCard, quizContainer, startAllBtn, startTenBtn } from './constants.js';

//  using fisher-yates algorithm to shuffle elements
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

 const shuffledKanji = shuffleArray([...kanji]);
 
 
//  get count number of random elements from the array
 function getRandomElements(arr, count) {
    // using the spread operator prevents the original array from being changed too
    const shuffledArray = shuffleArray([...arr]);
    // gets the first count elements from the new array
    return shuffledArray.slice(0, count);
 } 

startTenBtn.addEventListener('click', (e) => {
  startQuiz(e);
  hideIntro(); 
})

let options = [];

function startQuiz(e) {
    if (e.target.id === 'start-10') {
    //  start quiz on 10 random kanji
      displayQuiz();
    //   get an array of 10 random kanji
     const questions = getRandomElements(kanji, 10);
    // everytime you start the quiz the index should start at 0  
     let index = 0;
    // show first kanji character   
     displayKanji(questions, index);  

    // create answer options 
    // one option should be the corect answer
     createOptions(questions[index].meaning, 'correct');

    //  remove the current kanji from the questions so it doesn't appear twice in the options
     const updatedArray = questions.filter(element => element !== questions[index]);
    // create two more random answer options
     const indexes = [];
     for (let i = 0; i < 2; i++) {
        let randomIndex;
    // make sure the two options are different
        do {
            randomIndex = Math.floor(Math.random() * updatedArray.length);
            createOptions(updatedArray[randomIndex].meaning, 'false');
        } while (indexes.includes(randomIndex)) 
        indexes.push(randomIndex);
     }
    //  shuffle the options array otherwise the correct answer will always be the first
    //  append the options to the ul container so they are displayed
     shuffleArray([...options]).forEach(option => {
        answerContainer.appendChild(option);
     });

    //  add event listeners to the options
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (option.classList.contains('correct')) {
               option.style.background = 'green';
            } else {
                option.style.background = 'red';
            }
            index += 1;
            displayKanji(questions, index);
            answerContainer.innerHTML = ''; 
            options = [];
            createOptions(questions[index].meaning, 'correct');

            //  remove the current kanji from the questions so it doesn't appear twice in the options
             const updatedArray = questions.filter(element => element !== questions[index]);
            // create two more random answer options
             const indexes = [];
             for (let i = 0; i < 2; i++) {
                let randomIndex;
            // make sure the two options are different 
                do {
                    randomIndex = Math.floor(Math.random() * updatedArray.length);
                    createOptions(updatedArray[randomIndex].meaning, 'false');
                } while (indexes.includes(randomIndex)) 
                indexes.push(randomIndex);
             }
            //  shuffle the options array otherwise the correct answer will always be the first
            //  append the options to the ul container so they are displayed
             shuffleArray([...options]).forEach(option => {
                answerContainer.appendChild(option);
             });
                           
        })
    })
    } else {
        // start quiz on all kanji
    }
}

function hide(element) {
    element.classList.add('hide');
    element.classList.remove('show');
}

function show(element) {
    element.classList.remove('hide');
    element.classList.add('show');
}

function displayQuiz() {
    show(quizContainer);
}

function hideIntro() { 
    hide(header); 
}

function displayKanji(arr, index) {
    kanjiCard.innerHTML = arr[index].kanji;  
}

function createOptions(meaning, state) {
    // create li element with a button with a kanji meaning as text
    // the state will be either correct or false
    const option = document.createElement('li');
    option.classList.add(state);
    console.log(option)
    option.innerHTML = `<button>${meaning}</button>`;

    // push the option in an array of options
    options.push(option);
}

