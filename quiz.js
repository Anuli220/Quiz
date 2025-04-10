// creating an array consisting of the quiz questions, options and answers.
// object in JavaScript is basically represented inside curly brackets and we write the object in key value pairs.
// For example  question: "What is the *real spelling* of my name?",
// This "question" is the key and "What is the real spelling..." is the pair.
const quizData = [
    // {QUESTION 1}
    {
        question: "What is the *real spelling* of my name?",
        options: ["Anuli", "Anulimsinachi", "Anulimshanichi","Anulimmsinachi"],
        answer: "Anulimsinachi",
    },
    // {QUSTION 2}
    {
        question: "What is my favourite game",
        options: ["Roblox", "Minecraft", "Among Us","CRK"],
        answer: "Roblox",
    },
    // {QUESTION 3}
    {
        question: "What is my favourite hobby?",
        options: ["Writing", "Cooking", "Sports","Drawing"],
        answer: "Drawing",
    },
    // {QUESTION 4}
    {
        question: "Do I like Pokemon",
        options: ["Yes", "No", "Maybe","I don't know"],
        answer: "No",
    },
    // {QUESTION 5}
    {
        question: "What is my favourite colour?",
        options: ["Yellow", "Blue", "Red","off-white"],
        answer: "Yellow",
    },
    // {QUESTION 6}
    {
        question: "What flavour do I like",
        options: ["Spicy", "Sweet", "Salty","Zesty"],
        answer: "Salty",
    },
    // {QUESTION 7}
    {
        question: "Which app do I spend most of my time on?",
        options: ["Pinterest", "Youtube", "Spotify","Roblox"],
        answer: "Pinterest",
    },
]

const quizContainer=document.getElementById("quiz");
const resultContainer=document.getElementById("result");
const submitButton=document.getElementById("submit");
const retryButton=document.getElementById("retry");
const showAnswerButton=document.getElementById("showAnswer");

let currentQuestion=0;
let score=0;
let incorrectAnswers=[];
function shuffleArray(array){
    for(let i = arrayLength-1; i>0; i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
}

function displayQuesion(){
    const questionData=quizData[currentQuestion];
    // it's targetting the first question.
    const questionElement=document.createElement("div");
    questionElement.className="question";
    questionElement.innerHTML=`${currentQuestion+1}.${questionData.question}`;
    const optionsElement=document.createElement("div");
    optionsElement.className="options";
    const shuffledOptions=[...questionData.options];
    // '...' is a spread operator which will copy exactly what's written after that
    shuffleArray(shuffledOptions);
    for(let i = 0; i<shuffledOptions.length; i++){
        const option = document.createElement("label");
        option.className="option";
        const radio=document.createElement("input");
        radio.type="radio";
        radio.name="quiz";
        radio.value=shuffledOptions[i];
        const optionText=document.createTextNode(shuffledOptions[i]);
        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }
    quizContainer.innerHTML="";
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}
function checkAnswer(){
    const selectedOption=document.querySelector(`input[name="quiz"]:checked`);
    if(selectedOption){
        const answer=selectedOption.value;
        if(answer===quizData[currentQuestion].answer){
            score++;
        }else{
            incorrectAnswers.push({
                question:quizData[currentQuestion].question,
                incorrectAnswer:answer,
                correctAnswer:quizData[currentQuestion].answer,
            })
        }
        currentQuestion++;
        selectedOption.checked=false;
        if(currentQuestion<quizData.length){
            displayQuesion();
        }
        else{
            displayResult();
        }
    }
}
function displayResult(){
    quizContainer.style.display="none";
    submitButton.style.display="none";
    retryButton.style.display="inline-block";
    showAnswerButton.style.display="inline-block";
    resultContainer.innerHTML=`You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz(){
    currentQuestion=0;
    score=0;
    incorrectAnswers=[];
    quizContainer.style.display="block";
    submitButton.style.display="inline-block";
    retryButton.style.display="none";
    showAnswerButton.style.display="none";
    resultContainer.innerHTML="";
    displayQuesion();
}

function showAnswer(){
    quizContainer.style.display="none";
    submitButton.style.display="none";
    retryButton.style.display="inline-block";
    showAnswerButton.style.display="none";
    let incorrectAnswersHtml="";
    for(let i=0; i<incorrectAnswers.length; i++){
        // += means we are adding a new value to the previous value
        incorrectAnswersHtml += `
        <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
        `;
    }
    resultContainer.innerHTML=`
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers: </p>
    ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener("click",checkAnswer);
retryButton.addEventListener("click",retryQuiz);
showAnswerButton.addEventListener("click",showAnswer);
displayQuesion();