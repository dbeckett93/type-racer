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

// Results elements
let resultDifficulty = document.getElementById('resultDifficulty');
let resultTime = document.getElementById('resultTime');
let resultWPM = document.getElementById('resultWPM');

// Global variables
let generatedWords = "";
let startTime;
let endTime;

// Event Listeners
startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
retryButton.addEventListener('click', retryGame);
typingArea.addEventListener('input', checkInput);

document.addEventListener('keydown', function(event) {
    if ((event.code === 'Space' || event.code === 'Enter') && gameState === 'off') {
        event.preventDefault();
        typingArea.value = "";
        startGame();
    } else if (event.code === 'Escape' && gameState === 'on') {
        event.preventDefault();
        typingArea.value = "";
        stopGame();
    }
});

// Game off by default
if (gameState === "off") {
    typingArea.value = "";
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
    difficultySelector.disabled = true;

    // Start the timer
    startTime = new Date();

    initialise();
}

// Function to stop the game
function stopGame() {
    gameState = "off";
    typingArea.disabled = true;
    startButton.disabled = false;
    stopButton.disabled = true;
    retryButton.disabled = false;
    difficultySelector.disabled = false;
    typingArea.placeholder = "";

    // Stop the timer
    endTime = new Date();
    let timeTaken = (endTime - startTime) / 1000; // Time in seconds

    // Calculate WPM
    let wordCount = generatedWords.split(' ').length;
    let wpm = (wordCount / timeTaken) * 60;

    // Display results
    resultDifficulty.textContent = difficultySelector.value.charAt(0).toUpperCase() + difficultySelector.value.slice(1);
    resultTime.textContent = timeTaken.toFixed(2) + " seconds";
    resultWPM.textContent = wpm.toFixed(2);
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