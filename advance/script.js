// 1. DOM Elements
const promptTextEl = document.getElementById('prompt-text');
const inputEl = document.getElementById('typing-input');
const startBtn = document.getElementById('start-btn');
const timeDisplay = document.getElementById('time-display');
const accuracyDisplay = document.getElementById('accuracy-display');

// 2. Game State Variables
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is learning to manage complexity.",
    "Web development is fun and full of creative challenges.",
    "A journey of a thousand miles begins with a single step."
];
let currentPrompt = "";
let startTime = 0;
let isRunning = false;

// 3. Helper Functions

function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
}

function calculateAccuracy(typed, prompt) {
    let correctChars = 0;
    
    // We compare based on the length of the original prompt
    for (let i = 0; i < prompt.length; i++) {
        // We only compare if the user has typed a character at this position
        if (typed[i] && typed[i] === prompt[i]) {
            correctChars++;
        }
    }
    
    // Calculate accuracy percentage
    return Math.round((correctChars / prompt.length) * 100);
}

// 4. Game Logic

function startTest() {
    // Setup the game
    currentPrompt = getRandomPrompt();
    promptTextEl.textContent = currentPrompt;
    
    // Reset inputs/results
    inputEl.value = "";
    timeDisplay.textContent = '0';
    accuracyDisplay.textContent = '0%';
    
    // Enable input and set state
    isRunning = true;
    inputEl.disabled = false;
    startBtn.textContent = 'END TEST'; // Button now explicitly stops the test
    
    // Record the precise start time and focus
    startTime = new Date().getTime(); 
    inputEl.focus(); 
}

function finishTest() {
    if (!isRunning) return;

    const endTime = new Date().getTime();
    
    // Calculate time difference in seconds
    const timeTakenSeconds = ((endTime - startTime) / 1000).toFixed(2);
    
    // Use trim() to clean up the user input before accuracy check
    const userInput = inputEl.value.trim(); 
    const accuracy = calculateAccuracy(userInput, currentPrompt);

    // Update results
    timeDisplay.textContent = timeTakenSeconds;
    accuracyDisplay.textContent = accuracy + '%';
    promptTextEl.textContent = `Test Complete! Time: ${timeTakenSeconds}s | Accuracy: ${accuracy}%`;

    // Reset state and button
    isRunning = false;
    inputEl.disabled = true;
    startBtn.textContent = 'START TEST';
}

// 5. Event Listeners

// Combined listener for the START/END button
startBtn.addEventListener('click', () => {
    if (isRunning) {
        // If the button is pressed while running, it means END TEST
        finishTest();
    } else {
        // If the button is pressed while stopped, it means START TEST
        startTest();
    }
});

// Listener to automatically finish when the user types the exact prompt
inputEl.addEventListener('input', () => {
    if (!isRunning) return;

    // Use trim() to ignore leading/trailing spaces in the user's input for the check
    if (inputEl.value.trim() === currentPrompt.trim()) {
        finishTest();
    }
});


// Initialize prompt display
promptTextEl.textContent = "Click START to test your typing speed!";