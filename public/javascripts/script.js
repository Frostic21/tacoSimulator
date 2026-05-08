const tacoButton = document.getElementById('taco-button');
const scoreDisplay = document.getElementById('score-display');
const upgrade1Btn = document.getElementById('upgrade1-button');
const upgrade2Btn = document.getElementById('upgrade2-button');
const saveBtn = document.getElementById('save-button');
const resetBtn = document.getElementById('reset-button');
const multDisplay = document.getElementById('mult-display');
const bonusDisplay = document.getElementById('bonus-display');
const workerBtn = document.getElementById('worker-button');
const restaurantBtn = document.getElementById('restaurant-button');
const workerDisplay = document.getElementById('worker-display');
const restaurantDisplay = document.getElementById('restaurant-display');

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
workerBtn.addEventListener('click', async () => {
    const response = await fetch('/buy-worker', { method: 'POST' });
    if (response.ok) {
        const data = await response.json();
        document.getElementById('score-display').textContent = `Money:$${data.newScore}`;
        workerDisplay.textContent = `Workers Hired: ${data.newWorkers}`;
    }
});
setInterval(async () => {
    try {
        const response = await fetch('/passive-income', { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            document.getElementById('score-display').textContent = `Money:$${data.newScore}`;
        }
    } catch (err) {
        console.error('Passive income error:', err);
    }
}, 3000);

restaurantBtn.addEventListener('click', async () => {
    const response = await fetch('/buy-restaurant', { method: 'POST' });
    if (response.ok) {
        const data = await response.json();
        document.getElementById('score-display').textContent = `Money:$${data.newScore}`;
        restaurantDisplay.textContent = `Restaurant Multiplier: x${data.newRestaurants}`;
    }
});

// Passive Income Logic (Optional)
// If workers generate money every second, add this:
setInterval(async () => {
    // You could create a /passive-income route or just let the 
    // server calculate the difference on the next 'Save'
}, 1000);

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
