const gameBoard = document.getElementById('game-board');
const keyboard = document.getElementById('keyboard');
const rows = document.querySelectorAll('.row');
const themeToggle = document.getElementById('theme-toggle');

// Словарь пятибуквенных слов
const dictionary = [
    "CRANE", "APPLE", "HOUSE", "TABLE", "CHAIR", "GLASS", "MOUSE", "TIGER", "LEMON", "GRAPE",
    "SNAKE", "ZEBRA", "OCEAN", "QUILT", "RADIO", "STONE", "TRAIN", "VIOLA", "WHEAT", "YACHT"
];

// Выбор случайного слова из словаря
const targetWord = dictionary[Math.floor(Math.random() * dictionary.length)];
let currentRow = 0;
let currentTile = 0;

const leafContainer = document.querySelector('.leaf-container');

// Создаем 12 листьев
for (let i = 0; i < 18; i++) {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leafContainer.appendChild(leaf);
}

// Обработка нажатий на клавиатуру
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

// Переключение темы
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
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
            updateKeyboard(letter, 'correct');
        } else if (targetWord.includes(letter)) {
            tile.setAttribute('data-state', 'present'); // Желтый
            updateKeyboard(letter, 'present');
        } else {
            tile.setAttribute('data-state', 'absent'); // Серый
            updateKeyboard(letter, 'absent');
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

function updateKeyboard(letter, state) {
    const keys = keyboard.querySelectorAll('button');
    keys.forEach(key => {
        if (key.textContent === letter) {
            // Если клавиша уже была помечена как "correct", не изменяем её состояние
            if (key.getAttribute('data-state') !== 'correct') {
                key.setAttribute('data-state', state);
            }
        }
    });
}