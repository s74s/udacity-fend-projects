const deck = document.querySelector('.deck');
const cardsToCompare = [];
const matchedCards = [];
const cardTypes = ['paper-plane-o', 'diamond', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];

const stars = document.querySelectorAll('.fa-star');
const movesIndicator = document.querySelector('.moves');
let movesCounter = 3;
const startBtn = document.querySelector('.start-btn');
const newGameBtn = document.querySelector('.new-btn');

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
  cards.forEach(card => fragment.appendChild(card));
  movesIndicator.innerHTML = `${movesCounter} Moves`;
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

// GLOBAL STATE
// Update Moves Indicator
function updateMovesIndicator() {
  if (movesCounter === 3) {
    stars.forEach(star => {
      if (!star.classList.contains('gold')) {
        star.classList.add('gold');
      }
    })
  }
  else {
    const star = stars[movesCounter];
    star.classList.remove('gold');
    const movesStatus = movesCounter === 1
      ? '1 Move'
      : `${movesCounter} Moves`;
    movesIndicator.innerHTML = movesStatus;
  }
}

// Compare Cards
function compareCards() {
  const [first, second] = cardsToCompare;
  const isSimilar = getCardType(first) === getCardType(second);
  
  if (isSimilar) {
    cardsToCompare.forEach(markMatching);
    matchedCards.push(...cardsToCompare);
    cardsToCompare.length = 0;
  }
  else {
    movesCounter -= 1;    
    updateMovesIndicator();
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
  }
  if (cardsToCompare.length === 2) compareCards();
}

// Handle card click
deck.addEventListener('click', handleCardClick);

// Handle start btn click
startBtn.addEventListener('click', () => {
    deck.querySelectorAll('.card').forEach(filpCard);
    setTimeout(() => deck.querySelectorAll('.card').forEach(filpCard), 3000);
    startBtn.disabled = true;
})

// Handle new game btn click
newGameBtn.addEventListener('click', () => {
  deck.innerHTML = '';
  movesCounter = 3;
  updateMovesIndicator();
  generateDeck(cardTypes);
  startBtn.disabled = false;  
});

generateDeck(cardTypes);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
