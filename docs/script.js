const board = document.getElementById("gameBoard");
const movesCount = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restart");
const message = document.getElementById("message");

// List of image file names from /assets folder
let cardImages = [
  "Tinker_Bell.jpg",
  "Periwinkle.jpg",
  "Silvermist.jpg",
  "Rosetta.jpg",
  "Fawn.jpg",
  "Vidia.jpg",
  "Iridessa.jpg",
  "Zarina.jpg",
];

// Duplicate for pairs
cardImages = [...cardImages, ...cardImages];

let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer;
let seconds = 0;
let isPlaying = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  board.innerHTML = "";
  message.classList.add("hidden");
  moves = 0;
  seconds = 0;
  movesCount.textContent = moves;
  timerDisplay.textContent = "0s";
  matchedCards = [];
  flippedCards = [];
  isPlaying = false;
  clearInterval(timer);

  const shuffled = shuffle(cardImages);

  shuffled.forEach((imgName) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">❓</div>
        <div class="card-back">
          <img src="/assets/${imgName}" alt="${imgName}">
        </div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card, imgName));
    board.appendChild(card);
  });
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    timerDisplay.textContent = `${seconds}s`;
  }, 1000);
}

function flipCard(card, imgName) {
  if (!isPlaying) {
    isPlaying = true;
    startTimer();
  }

  if (
    flippedCards.length < 2 &&
    !card.classList.contains("flipped") &&
    !matchedCards.includes(card)
  ) {
    card.classList.add("flipped");
    flippedCards.push({ card, imgName });

    if (flippedCards.length === 2) {
      moves++;
      movesCount.textContent = moves;
      checkMatch();
    }
  }
}

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.imgName === second.imgName) {
    matchedCards.push(first.card, second.card);
    flippedCards = [];

    if (matchedCards.length === cardImages.length) {
      clearInterval(timer);
      message.classList.remove("hidden");
    }
  } else {
    setTimeout(() => {
      first.card.classList.remove("flipped");
      second.card.classList.remove("flipped");
      flippedCards = [];
    }, 800);
  }
}

restartBtn.addEventListener("click", startGame);

startGame();
