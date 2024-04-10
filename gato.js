const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            message.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        message.textContent = "It's a draw!";
    }
}

function handleClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (!gameOver && gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    message.textContent = '';
    board.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
