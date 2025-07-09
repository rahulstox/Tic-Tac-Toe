const choices = ['rock', 'paper', 'scissors'];
const playerScoreText = document.getElementById('playerScore');
const computerScoreText = document.getElementById('computerScore');
const resultText = document.getElementById('resultText');
const roundSelect = document.getElementById('roundSelect');

let playerScore = 0;
let computerScore = 0;
let maxRounds = parseInt(roundSelect.value);

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  maxRounds = parseInt(roundSelect.value);
  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;
  resultText.textContent = 'Make your move!';
}

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function checkWinner(player, computer) {
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'player';
  return 'computer';
}

function updateScores(winner) {
  if (winner === 'player') {
    playerScore++;
    resultText.textContent = "You won this round! 🎉";
  } else if (winner === 'computer') {
    computerScore++;
    resultText.textContent = "LOL! Computer wins this round! 🤖";
  } else {
    resultText.textContent = "It's a draw! ⚖️";
  }

  playerScoreText.textContent = playerScore;
  computerScoreText.textContent = computerScore;

  if (playerScore >= Math.ceil(maxRounds / 2)) {
    resultText.textContent = "🎉 Congratulations! You won the game!";
    disableGame();
  } else if (computerScore >= Math.ceil(maxRounds / 2)) {
    resultText.textContent = "💀 Computer wins the game!";
    disableGame();
  }
}

function disableGame() {
  document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);
}

function enableGame() {
  document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
}

document.querySelectorAll('.choice-btn').forEach(button => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const winner = checkWinner(playerChoice, computerChoice);
    updateScores(winner);
  });
});

document.getElementById('resetBtn').addEventListener('click', () => {
  resetGame();
  enableGame();
});

roundSelect.addEventListener('change', () => {
  resetGame();
  enableGame();
});

resetGame(); // initialize on load