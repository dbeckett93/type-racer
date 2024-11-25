// Game state, defaults to off and is controlled using the buttons beneath the game text input box
let gameState = "off";

// Function to generate a random string for the user to type. No more than ten words at a time.
// Using the API from https://random-word.ryanrk.com/
async function generateRandomString() {
    try {
        const response = await fetch('https://random-word.ryanrk.com/api/en/word/random/10');
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