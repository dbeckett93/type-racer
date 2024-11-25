# Typeracer | a Speed Typing Game
This project is a web-based Typing Speed Game where users can test and improve their typing speed by typing randomly generated text under different difficulty levels. The game tracks your performance, calculates Words Per Minute (WPM), and records the best times for each difficulty level.

## Features

- **Difficulty Levels**: Choose from Easy, Normal, and Hard.
- **Dynamic Word Generation**: Random strings of words are fetched from an [API](https://random-word.ryanrk.com/).
- **Performance Metrics**: Displays time taken, WPM, and best performance per difficulty.
- **Keyboard Shortcuts**:
  - Start/Stop Game: Space or Enter to start, Escape to stop.
  - Retry Game: Alt + Enter.

## How It Works

1. Select a difficulty level (Easy, Normal, or Hard).
2. Press Start to generate a random string and begin typing.
3. The game measures your time and WPM.
4. Press Stop when done to record your results.
5. Retry with the same text or start a new game with different difficulty settings.

## Installation

1. Clone the repository or download the project files.
2. Open the `index.html` file in any modern browser.

## Code Overview

- **Core Functions**:
  - `generateRandomString()`: Fetches random words from an external API.
  - `startGame()`: Initializes the game and timer.
  - `stopGame()`: Stops the timer, calculates results, and updates best scores.
  - `retryGame()`: Restarts the game with the same text.
  - `checkInput()`: Validates user input and provides real-time feedback with color-coded words.

- **Global Variables**: Tracks game state, user input, generated words, timing, and best scores for each difficulty.

- **Event Listeners**: Button clicks and keyboard shortcuts for controlling the game.

## Results Tracking

- **Difficulty**: Shows the difficulty level selected.
- **Time Taken**: Displays the time in seconds.
- **WPM**: Shows words per minute calculated based on the time and word count.
- **Best Times**: Highlights the fastest time for each difficulty level.

## API Used

[Random Word API](https://random-word.ryanrk.com/) is utilized to generate random words based on the difficulty level.
