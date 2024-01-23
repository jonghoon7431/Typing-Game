
const gameTime = 9;

let score = 0;
let time = gameTime;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

const wordInput = document.querySelector(".word-input")
const wordDisplay = document.querySelector(".word-display")
const scoreDisplay = document.querySelector(".score")
const timeDisplay = document.querySelector(".time")
const button = document.querySelector(".button")


function init() {
    buttonChange("Loading . . .");
    getWords();
    wordInput.addEventListener('input', checkMatch)
}

init();

//게임 실행
function run() {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    time = gameTime;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    wordInput.value =  "";
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange("Now Playing")
}


function checkStatus() {
    if (isPlaying && time === 0) {
        buttonChange("START")
        clearInterval(checkInterval)
    }
}

//단어 불러오기
function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response){
            response.data.forEach(function(word){
                if (word.length < 10) {
                    words.push(word);
                }
            })

                buttonChange("START");

            })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }
    
//단어 일치 체크
function checkMatch() {
                if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
                    wordInput.value = "";
                    if (!isPlaying) {
                        return;
                    }
                    score++;
                    scoreDisplay.innerText = score;
                    time = gameTime;
                    const randomIndex = Math.floor(Math.random() * words.length)
                    wordDisplay.innerText = words[randomIndex]
                }
            }


function countDown() {
                time > 0 ? time-- : isPlaying = false;
                if (!isPlaying) {
                    clearInterval;
                }
                timeDisplay.innerText = time;
            }

function buttonChange(text) {
                button.innerText = text;
                text === "START" ? button.classList.remove('loading') : button.classList.add('loading')

            }
