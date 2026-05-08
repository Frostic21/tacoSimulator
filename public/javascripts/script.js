const tacoButton = document.getElementById('taco-button');
const scoreDisplay = document.getElementById('score-display');

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
