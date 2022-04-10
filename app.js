const wordEl = document.getElementById("random-text");
const inputWord = document.getElementById("word-input");
const scoreEl = document.getElementById("score");
const highScore = document.getElementById("highscore");
const time = document.getElementById("time");
const levelEl = document.getElementById("level");
const modalBg = document.querySelector(".modal-bg");
const modal = document.querySelector(".modal");
const btnOk = document.getElementById("button");
const title = document.querySelector("#name-player");

// variables
let score = 0;
let timer = 10;
let level = localStorage.getItem("level")
  ? localStorage.getItem("level")
  : "easy";
levelEl.value = localStorage.getItem("level");
let highScoreEl = 0;
const api = "https://random-words-api.vercel.app/word";
let word;

// functions
function randomNewWord() {
  fetch(api)
    .then((data) => {
      return data.json();
    })
    .then(getWords);
  function getWords(data) {
    let newWord = data[0].word.toLowerCase();
    word = newWord;
    wordEl.textContent = word;
  }
}
randomNewWord();

function checkWord() {
  if (word == inputWord.value) {
    inputWord.value = "";
    score++;
    scoreEl.textContent = score;
    randomNewWord();
    if (level == "easy") {
      timer += 5;
    } else if (level == "medium") {
      timer += 3;
    } else {
      timer += 2;
    }
  }
}
// change level
function changeLevel() {
  localStorage.setItem("level", (level = levelEl.value));
  level = levelEl.value;
}

const counter = setInterval(() => {
  if (timer > 0) {
    timer--;
    time.textContent = timer;
  }
  againGame();

  if (timer == 0) {
    if (score > highScoreEl) {
      highScoreEl = score;
      highScore.textContent = highScoreEl;
      clearInterval(counter);
      againGame();
    }
  }
}, 1000);
againGame();

function againGame() {
  if (timer == 0) {
    modal.classList.add("modal-bg");
    return lose();
  }
}

function lose() {
  timer = 1;
  title.textContent = "You Lose the Game";
  inputWord.value = "";
}

// events
inputWord.addEventListener("input", checkWord);
levelEl.addEventListener("change", changeLevel);
