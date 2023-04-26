// 사용변수
const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval ;
let checkInterval ;
let words = [];

// 인풋창에 글 작성했을 때 어떤 글 받아오는지 아는 값 작성
const wordInput = document.querySelector('.word-input');
//console.log(wordInput)
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() {
    buttonchange('게임 로딩중 ...');
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

// 게임실행
function run(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonchange('게임중');
}

function checkStatus() {
   if(!isPlaying && time === 0){
        buttonchange("게임시작")
        clearInterval(checkInterval)
   }
}

// 단어 불러오기 
function getWords() {
  
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            
            response.data.forEach((word) => {
                if(word.length < 10) {
                    words.push(word);
                }
            })
            buttonchange('게임시작');
            console.log(words)
            //console.log(response.data)
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })

}

wordInput.addEventListener('input', checkMatch
    //console.log(wordInput.value, wordDisplay.innerHTML)
                                           //innerHTML = html안에 어떤 속성이있는지
                                           //이거 사용하니까 console에 여백 뜸
    //console.log(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase())
                            // .toLowerCase() 로 둘 다 소문자 변환해서 비교해준다

                            
)

// 단어일치 체크
function checkMatch() {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = "";
        if(!isPlaying) {
            return;
        }
        score ++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random()*words.length) ;
        wordDisplay.innerText = words[randomIndex];
    }                  
}

// setInterval(countDown, 1000);
buttonchange('게임시작');

function countDown() {
    time > 0 ? time -- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonchange(text) {
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading') 
}