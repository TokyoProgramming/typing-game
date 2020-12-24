const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// set difficulty to value in ls or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start
text.focus();

// Update time
const updateTime = () => {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
};

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

console.log(getRandomWord());

// Add word to DOM
const addWordDOM = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
};

//update score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

// gameOver show end screen
const gameOver = () => {
  endgameEl.innerHTML = `
	
	<h1>Time ran out </h1>
	<p>Your final score ${score}</p>
	<button onClick='location.reload()'>Reload</button>
	`;

  endgameEl.style.display = 'flex';
};

addWordDOM();

// Event listeners
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;
  console.log(insertedText);

  if (insertedText === randomWord) {
    addWordDOM();
    updateScore();
    // clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
  }
});
// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
