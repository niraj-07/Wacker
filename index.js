const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timerMenu = document.querySelector('#timer-menu');

let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function startGame() {
  const selectedTime = parseInt(timerMenu.value, 10);
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();

  setTimeout(() => {
    endGame();
  }, selectedTime * 1000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', bonk));

function peep() {
  if (timeUp) return;

  const time = randomTime(300, 1000);
  const hole = getRandomHole();

  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep(); // Continue the game until time is up
  }, time);
}

function getRandomHole() {
  const idx = Math.floor(Math.random() * holes.length);
  return holes[idx];
}

function endGame() {
  timeUp = true;

  const endGamePopup = document.getElementById('end-game-popup');
  const endGameMessage = document.getElementById('end-game-message');
  endGameMessage.textContent = `Game Over! Final Score: ${score}`;
  endGamePopup.style.display = 'flex'; // Show the popup

  // Close the popup if clicked outside
  endGamePopup.addEventListener('click', function(event) {
    if (event.target === this) {
    
      endGamePopup.style.display = 'none'; // Hide the popup
    }
  });
}
