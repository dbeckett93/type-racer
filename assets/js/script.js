// Game state, defaults to off and is controlled using the buttons beneath the game text input box
let gameState = "off";
// Input label that displays the random string of words
let inputLabel = document.getElementById('game-text');
// Game text input box
let typingArea = document.getElementById('typing-area');
// Start button
let startButton = document.getElementById('start-button');
// Stop button
let stopButton = document.getElementById('stop-button');
// Retry button
let retryButton = document.getElementById('retry-button');
// Difficulty selector
let difficultySelector = document.getElementById('difficulty-select');

// Global variable to store the generated words
let generatedWords = "";

// Event Listeners
startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
retryButton.addEventListener('click', retryGame);
typingArea.addEventListener('input', checkInput);

// Game off by default
if (gameState === "off") {
    typingArea.disabled = true;
    stopButton.disabled = true;
    retryButton.disabled = true;
    difficultySelector.disabled = false;
}

// Function to generate a random string for the user to type.
// Using the API from https://random-word.ryanrk.com/
async function generateRandomString(wordCount, wordLength) {
    try {
        const response = await fetch(`https://random-word.ryanrk.com/api/en/word/random/${wordCount}?maxlength=${wordLength}`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        let words = await response.json();
        words = words.join(' '); // Join the words into a single string
        console.log(words); // Log the generated string to the console
        return words;
    } catch (error) {
        console.error('Error fetching random words:', error);
    }
}

// Function to initialize the game based on the selected difficulty
function initialise() {
    let wordCount = 0;
    let wordLength = 0;

    if (difficultySelector.value === "easy") {
        wordCount = 4;
        wordLength = 4;
    } else if (difficultySelector.value === "normal") {
        wordCount = 7;
        wordLength = 8;
    } else if (difficultySelector.value === "hard") {
        wordCount = 10;
        wordLength = 12;
    }

    generateRandomString(wordCount, wordLength).then(words => {
        inputLabel.textContent = words;
        generatedWords = words; // Store the generated words in the global variable
    });
}

// Function to start the game
function startGame() {
    gameState = "on";
    typingArea.value = "";
    typingArea.disabled = false;
    typingArea.focus();
    startButton.disabled = true;
    stopButton.disabled = false;
    retryButton.disabled = true;
    initialise();
}

// Function to stop the game
function stopGame() {
    gameState = "off";
    typingArea.disabled = true;
    startButton.disabled = false;
    stopButton.disabled = true;
    retryButton.disabled = false;
    typingArea.placeholder = "";
}

// Function to retry the game
function retryGame() {
    typingArea.value = "";
    typingArea.placeholder = "";
    startGame();
}

// Function to check the input
function checkInput() {
    let typedWords = typingArea.value;
    if (typedWords === generatedWords) {
        stopGame();
    }
}

// Results