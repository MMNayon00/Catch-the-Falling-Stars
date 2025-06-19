const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
let score = 0;
let gameRunning = true;
let remainingTime = 90; // 1.5 minutes
let lastChangedAt = 0;

// Function to update the timer
function updateTimer() {
  if (!gameRunning) return;
  timerDisplay.textContent = `Time: ${remainingTime}s`;
  remainingTime--;
  if (remainingTime < 0) {
    endGame();
  } else {
    setTimeout(updateTimer, 1000);
  }
}

// Function to end the game
function endGame() {
  gameRunning = false;
  alert("⏰ Time's up! Your final score: " + score);
  clearInterval(starInterval);
  document.querySelectorAll('.star').forEach(s => s.remove());
}

// Function to change background to random color
function changeBackgroundColor() {
  const hue = Math.floor(Math.random() * 360);
  const bgColor = `radial-gradient(circle at top, hsl(${hue}, 70%, 25%), #000000)`;
  document.body.style.background = bgColor;
}

// Create a falling star
function createStar() {
  if (!gameRunning) return;

  const star = document.createElement('div');
  star.classList.add('star');
  star.style.left = Math.random() * (window.innerWidth - 30) + 'px';
  game.appendChild(star);

  let fallSpeed = 1 + Math.random() * (score / 10 + 1);
  let top = 0;

  const fall = setInterval(() => {
    if (!gameRunning) {
      clearInterval(fall);
      star.remove();
      return;
    }

    top += fallSpeed;
    star.style.top = top + 'px';

    if (top > window.innerHeight) {
      clearInterval(fall);
      star.remove();
    }
  }, 16);

  star.onclick = () => {
    clearInterval(fall);
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
    star.remove();

    // Change background every multiple of 5 (and only once per milestone)
    if (score % 5 === 0 && score !== lastChangedAt) {
      changeBackgroundColor();
      lastChangedAt = score;
    }
  };
}

// Start intervals
const starInterval = setInterval(createStar, 800);
updateTimer();
