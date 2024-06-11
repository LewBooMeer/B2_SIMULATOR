document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const actionButton = document.getElementById('action-button');
    const paragraphs = document.querySelectorAll('#paragraphs p');
    const selectedParagraphsDiv = document.getElementById('selected-paragraphs');

    let countdownTime = 120; 
    let interval;

    function updateCountdown() {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startCountdown() {
        if (!interval) {
            interval = setInterval(() => {
                if (countdownTime > 0) {
                    countdownTime--;
                    updateCountdown();
                } else {
                    clearInterval(interval);
                    interval = null;
                }
            }, 1000);
        }
    }

    function stopCountdown() {
        clearInterval(interval);
        interval = null;
    }

    function resetCountdown() {
        clearInterval(interval);
        interval = null;
        countdownTime = 120;
        updateCountdown();
    }

    function getRandomParagraphs() {
        const shuffled = [...paragraphs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 2);
    }

    function displayRandomParagraphs() {
        selectedParagraphsDiv.innerHTML = ''; // Clear previous results
        const randomParagraphs = getRandomParagraphs();
        randomParagraphs.forEach(paragraph => {
            const paragraphClone = paragraph.cloneNode(true);
            selectedParagraphsDiv.appendChild(paragraphClone);
        });
    }

    startButton.addEventListener('click', startCountdown);
    stopButton.addEventListener('click', stopCountdown);
    resetButton.addEventListener('click', resetCountdown);
    actionButton.addEventListener('click', displayRandomParagraphs);

    // Initialize countdown display
    updateCountdown();
});
