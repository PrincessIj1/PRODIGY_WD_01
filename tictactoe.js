const board = document.getElementById('board');
const message = document.getElementById('message');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const playAIButton = document.getElementById('playAI');
const playHumanButton = document.getElementById('playHuman');

let gameBoard = Array(9).fill(null);
let currentPlayer = 'X';
let isPlayingAgainstAI = false;
let isGameActive = false;

function createBoard() {
    const cells = board.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
    });
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] || !isGameActive) return;
    gameBoard[index] = currentPlayer;
    checkWinner();
    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (isPlayingAgainstAI && currentPlayer === 'O') {
            setTimeout(aiMove, 500);
        }
        createBoard();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            message.textContent = `Player ${gameBoard[a]} Wins!`;
            isGameActive = false;
            return;
        }
    }

    if (!gameBoard.includes(null)) {
        message.textContent = "It's a Draw!";
        isGameActive = false;
    }
}

function aiMove() {
    const emptyIndices = gameBoard.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    if (emptyIndices.length === 0) return;
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    gameBoard[randomIndex] = 'O';
    checkWinner();
    if (isGameActive) {
        currentPlayer = 'X';
        createBoard();
    }
}

function startGame() {
    gameBoard = Array(9).fill(null);
    currentPlayer = 'X';
    isGameActive = true;
    createBoard();
    message.textContent = '';
}

function resetGame() {
    startGame();
}

function playAgainstAI() {
    startGame();
    isPlayingAgainstAI = true;
}

function playAgainstHuman() {
    startGame();
    isPlayingAgainstAI = false;
}

board.addEventListener('click', handleClick);
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
playAIButton.addEventListener('click', playAgainstAI);
playHumanButton.addEventListener('click', playAgainstHuman);

// Initialize the game
startGame();
