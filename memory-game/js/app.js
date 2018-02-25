const mainContainer = document.querySelector('.container');
const deck = document.querySelector('.deck');
const cardsToCompare = [];
const matchedCards = [];
const cardTypes = ['paper-plane-o', 'diamond', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];

const modal = document.querySelector('.modal');
const timer = document.querySelector('.timer');
const stars = document.querySelectorAll('.fa-star');
const movesIndicator = document.querySelector('.moves');
const startBtn = document.querySelector('.start-btn');
const newGameBtn = document.querySelector('.new-btn');
const modalCloseBtn = document.querySelector('.close-modal');


let numberOfCards = 0;
let movesCounter = 0;
let time = 0;
let timerInterval;

// CREATE ITEMS
// Duplicate Array
function duplicateArray(array, numberOfDuplicates = 2) {
  const duplicates = [];
  for (let i = 1; i <= numberOfDuplicates; i += 1) {
    duplicates.push(...array);
  }
  return duplicates;
}

// Generating cards and append it to deck
function generateDeck(cardTypes) {
  const cardsToShuffle = duplicateArray(cardTypes);
  const shuffledCards = shuffle(cardsToShuffle);
  const fragment = document.createDocumentFragment();
  const cards = shuffledCards.map((iconName, index) => createCard(iconName, index));
  numberOfCards = cards.length;
  cards.forEach(card => fragment.appendChild(card));
  movesIndicator.innerHTML = movesCounter;
  matchedCards.length = 0;
  deck.appendChild(fragment);
}

// Create Card
function createCard(iconName, id) {
  const card = document.createElement('li');
  card.className = 'card';
  const icon = document.createElement('i');
  icon.className = `fa fa-${iconName}`;
  card.id = id;
  card.appendChild(icon);
  card.setAttribute('data-type', iconName);
  return card;
}

// CARDS STATE
// Shuffle
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Flip card
function filpCard(card) {
  card.classList.toggle('show');
  card.classList.toggle('open');
}

// Get Card Type
function getCardType(card) {
  return card.dataset.type;
}

// Mark matching
function markMatching(card) {
  card.classList.remove('show', 'open');
  card.classList.add('match');
}

// Format time
function format(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = sec % 60;
  return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
}

// Increment Time Counter
function tick() {
  time += 1;
  timer.innerHTML = format(time);
}

//Update Rating
function updateRatingIndicator() {
  if (movesCounter > 22) {
    stars[stars.length - 1].classList.remove('gold');
  }
  if (movesCounter >= 30) {
    stars[stars.length - 2].classList.remove('gold');
  }
  if (movesCounter === 0) {
    stars.forEach(star => {
      if (!star.classList.contains('gold')) star.classList.add('gold')
    })
  }
  movesIndicator.innerHTML = movesCounter;
}

// Compare Cards
function compareCards() {
  const [first, second] = cardsToCompare;
  const isSimilar = getCardType(first) === getCardType(second);

  if (isSimilar) {
    cardsToCompare.forEach(markMatching);
    matchedCards.push(...cardsToCompare);
    cardsToCompare.length = 0;
    if (matchedCards.length === numberOfCards) {
      clearInterval(timerInterval);
      showModal();
    }
  } else {
    setTimeout(() => {
      cardsToCompare.forEach(filpCard);
      cardsToCompare.length = 0;
    }, 1000);
  }
}

// Cards click handler
function handleCardClick(event) {
  const card = event.target;
  if (card.nodeName === 'LI' && !card.classList.contains('match') && !cardsToCompare.includes(card) && cardsToCompare.length < 2) {
    cardsToCompare.push(card);
    filpCard(card);
    movesCounter += 1;
    updateRatingIndicator();
  }
  if (cardsToCompare.length === 2) compareCards();
}

// Handle card click
deck.addEventListener('click', handleCardClick);

// Start Game function
function startGame(event) {
  deck.querySelectorAll('.card').forEach(filpCard);
  setTimeout(() => {
    deck.querySelectorAll('.card').forEach(filpCard);
    time = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(tick, 1000);
  }, 3000);
  modal.classList.remove('show-modal');
}

// Handle start btn click
startBtn.addEventListener('click', () => {
  deck.scrollIntoView();  
  startGame();
});

// Start New Game function
function startNewGame(event) {
  clearInterval(timerInterval);
  deck.innerHTML = '';
  movesCounter = 0;
  updateRatingIndicator();
  generateDeck(cardTypes);
  newGameBtn.disabled = true;
  startGame();
  setTimeout(() => newGameBtn.disabled = false, 3000);
}

// Handle new game btn click
newGameBtn.addEventListener('click', startNewGame);

// Handle Game Finished
function gameFinished() {
  clearInterval(timerInterval);
}

// Modals
function showModal() {
  const modal = document.createElement('div');
  const formattedTime = time >= 60
    ? `${format(time)} ${time > 120 ? 'minutes' : 'minute'}`
    : `${time} seconds`;
  modal.className = 'modal modal-results show-modal';
  modal.innerHTML = `<h2>Congratulations! You Win !</h2>
    <h3> You made ${movesCounter} moves</h3>
    <h3>For ${formattedTime}</h3>
    <h3>Match rating</h3>
    <ul class="stars">
    </ul>`
  const ratingPanel = document.querySelector('.stars').cloneNode(true);
  const newGameBtn = document.createElement('button');
  newGameBtn.className = 'btn new-game-btn';
  newGameBtn.innerHTML = 'Next Game ?';
  const closeModalBtn = document.createElement('button');
  closeModalBtn.className = 'close-modal';
  newGameBtn.addEventListener('click', () => {
    modal.classList.remove('show-modal');
    startNewGame();
  });
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show-modal');
  });
  modal.appendChild(ratingPanel);
  modal.appendChild(newGameBtn);
  modal.appendChild(closeModalBtn);
  deck.appendChild(modal);
}

modalCloseBtn.addEventListener('click', () => {
  console.log('modal closed');
  modal.classList.remove('show-modal');
})

// Initail deck generation
generateDeck(cardTypes);