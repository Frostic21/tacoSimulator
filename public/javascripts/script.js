const tacoButton = document.getElementById('taco-button');
const scoreDisplay = document.getElementById('score-display');
const upgrade1Btn = document.getElementById('upgrade1-button');
const upgrade2Btn = document.getElementById('upgrade2-button');
const saveBtn = document.getElementById('save-button');
const resetBtn = document.getElementById('reset-button');
const multDisplay = document.getElementById('mult-display');
const bonusDisplay = document.getElementById('bonus-display');

tacoButton.addEventListener('click', async function(e) {
    e.preventDefault(); // Prevents any accidental reloads

    try {
        // Send the score update to the server in the background
        const response = await fetch('/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            // Update the UI with the new score returned from the server
            scoreDisplay.textContent = `Money:$${data.newScore}`;
        }
    } catch (err) {
        console.error('Error updating score:', err);
    }
});
upgrade1Btn.addEventListener('click', async () => {
    const response = await fetch('/upgrade', { method: 'POST' });
    if (response.ok) {
        const data = await response.json();
        scoreDisplay.textContent = `Money:$${data.newScore}`;
        multDisplay.textContent = `Tacos Sold per Click: ${data.newMult}`;
    }
});

// Buy Upgrade 2
upgrade2Btn.addEventListener('click', async () => {
    const response = await fetch('/bonus', { method: 'POST' });
    if (response.ok) {
        const data = await response.json();
        scoreDisplay.textContent = `Money:$${data.newScore}`;
        bonusDisplay.textContent = `Toppings Quality Multiplier: ${data.newBonus}`;
    }
});

// Save Progress
saveBtn.addEventListener('click', async () => {
    await fetch('/save', { method: 'POST' });
    alert("Progress Saved!");
});

// Reset Progress
resetBtn.addEventListener('click', async () => {
    if (confirm("Are you sure you want to reset?")) {
        const response = await fetch('/reset', { method: 'POST' });
        const data = await response.json();
        scoreDisplay.textContent = `Money:$0`;
        multDisplay.textContent = `Tacos Sold per Click: 1`;
        bonusDisplay.textContent = `Toppings Quality Multiplier: 1`;
    }
});
