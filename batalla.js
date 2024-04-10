const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');

let playerShips = [];
let computerShips = [];

let playerTurn = true;
let gameOver = false;

function createBoard(board) {
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;
        cell.addEventListener('click', () => {
            if (!gameOver && playerTurn && !cell.classList.contains('hit') && !cell.classList.contains('miss')) {
                const index = parseInt(cell.dataset.index);
                if (computerShips.some(ship => ship.position <= index && index < ship.position + ship.size)) {
                    cell.classList.add('hit');
                    checkWin(computerBoard, computerShips);
                } else {
                    cell.classList.add('miss');
                    playerTurn = false;
                    setTimeout(computerTurn, 1000);
                }
            }
        });
        board.appendChild(cell);
    }
}

function placeShips(board, ships) {
    ships.forEach(ship => {
        for (let i = 0; i < ship.size; i++) {
            const index = ship.position + i;
            board.children[index].classList.add('ship');
        }
    });
}

function getRandomPosition() {
    return Math.floor(Math.random() * 100);
}

function computerTurn() {
    if (!gameOver) {
        let index;
        do {
            index = getRandomPosition();
        } while (playerBoard.children[index].classList.contains('hit') || playerBoard.children[index].classList.contains('miss'));

        if (playerShips.some(ship => ship.position <= index && index < ship.position + ship.size)) {
            playerBoard.children[index].classList.add('hit');
            checkWin(playerBoard, playerShips);
        } else {
            playerBoard.children[index].classList.add('miss');
            playerTurn = true;
        }
    }
}

function checkWin(board, ships) {
    if (ships.every(ship => {
        for (let i = ship.position; i < ship.position + ship.size; i++) {
            if (!board.children[i].classList.contains('hit')) {
                return false;
            }
        }
        return true;
    })) {
        gameOver = true;
        alert('¡Felicidades, has ganado!');
    }
}

function startGame() {
    playerShips = [{ position: getRandomPosition(), size: 3 }, { position: getRandomPosition(), size: 4 }];
    computerShips = [{ position: getRandomPosition(), size: 3 }, { position: getRandomPosition(), size: 4 }];

    createBoard(playerBoard);
    createBoard(computerBoard);

    placeShips(playerBoard, playerShips);
    placeShips(computerBoard, computerShips);
}
