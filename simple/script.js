// 1. Get DOM elements
const display = document.getElementById('counter-display');
const increaseBtn = document.getElementById('increase-btn');
const decreaseBtn = document.getElementById('decrease-btn');
const resetBtn = document.getElementById('reset-btn');

// 2. Initialize the state variable
let count = 0;

// 3. Function to update the display
function updateDisplay() {
    display.textContent = count;
}

// 4. Event Listeners and Logic
increaseBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
});

decreaseBtn.addEventListener('click', () => {
    count--;
    updateDisplay();
});

resetBtn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});

// Initialize the display when the script loads
updateDisplay();