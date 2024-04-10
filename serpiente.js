const symbols = ['🍎', '🍌', '🍒', '🥝', '🍇', '🍊', '🍋', '🍉'];

let flippedCards = [];
let matches = 0;

const cardsContainer = document.getElementById('cards');

function initGame() {
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

    cardsContainer.innerHTML = '';

    shuffledSymbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = '<span class="symbol">' + symbol + '</span>';
        card.addEventListener('click', flipCard);
        cardsContainer.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.querySelector('.symbol').textContent;
    const symbol2 = card2.querySelector('.symbol').textContent;

    if (symbol1 === symbol2) {
        matches++;
        if (matches === symbols.length) {
            alert('¡Felicidades, has ganado!');
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 500);
    }
    flippedCards = [];
}

function resetGame() {
    initGame();
    flippedCards = [];
    matches = 0;
}

initGame();
