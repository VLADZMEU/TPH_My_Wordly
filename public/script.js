
const gameBoard = document.getElementById('game-board');
const keyboard = document.getElementById('keyboard');
const rows = document.querySelectorAll('.row');
const tiles = document.querySelectorAll('.tile');

const targetWord = "CRANE";
let currentRow = 0;
let currentTile = 0;

keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const key = e.target.textContent;

        if (key === 'Backspace') {
            if (currentTile > 0) {
                currentTile--;
                rows[currentRow].children[currentTile].textContent = '';
                rows[currentRow].children[currentTile].removeAttribute('data-state');
            }
        } else if (key === 'Enter') {
            if (currentTile === 5) {
                checkWord();
            }
        } else if (currentTile < 5) {
            rows[currentRow].children[currentTile].textContent = key;
            currentTile++;
        }
    }
});

function checkWord() {
    const guessedWord = Array.from(rows[currentRow].children)
        .map(tile => tile.textContent)
        .join('');

    if (guessedWord.length !== 5) return;

    for (let i = 0; i < 5; i++) {
        const tile = rows[currentRow].children[i];
        const letter = tile.textContent;

        if (letter === targetWord[i]) {
            tile.setAttribute('data-state', 'correct'); // Зеленый
        } else if (targetWord.includes(letter)) {
            tile.setAttribute('data-state', 'present'); // Желтый
        } else {
            tile.setAttribute('data-state', 'absent'); // Серый
        }
    }

    if (guessedWord === targetWord) {
        alert('Поздравляем! Вы угадали слово!');
        return;
    }

    currentRow++;
    currentTile = 0;

    if (currentRow === 6) {
        alert(`Игра окончена! Загаданное слово: ${targetWord}`);
    }
}