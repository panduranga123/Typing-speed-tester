const quoteText = document.getElementById('quote');
const input = document.getElementById('input');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const restartBtn = document.getElementById('restart');

const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed matters when you're a fast coder!",
  "Practice makes perfect, keep typing!",
  "JavaScript is fun once you get the hang of it."
];

let currentQuote = '';
let startTime;
let timerInterval;

function startTest() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteText.textContent = currentQuote;
  input.value = '';
  timerDisplay.textContent = '0';
  wpmDisplay.textContent = '0';
  clearInterval(timerInterval);
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const seconds = Math.floor((currentTime - startTime) / 1000);
  timerDisplay.textContent = seconds;
  calculateWPM();
}

function calculateWPM() {
  const wordsTyped = input.value.trim().split(/\s+/).filter(Boolean).length;
  const timePassed = parseInt(timerDisplay.textContent);
  const wpm = timePassed > 0 ? Math.round((wordsTyped / timePassed) * 60) : 0;
  wpmDisplay.textContent = wpm;
}

input.addEventListener('input', () => {
  if (input.value === currentQuote) {
    clearInterval(timerInterval);
    calculateWPM();
  }
});

restartBtn.addEventListener('click', () => {
  document.querySelector('.container').classList.remove('fade-in');
  void document.querySelector('.container').offsetWidth; // Trigger reflow
  document.querySelector('.container').classList.add('fade-in');
  startTest();
});

window.onload = startTest;
