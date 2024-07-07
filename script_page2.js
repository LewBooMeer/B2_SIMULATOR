document.addEventListener("DOMContentLoaded", function () {
  const countdownElement = document.getElementById("countdown");
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  const resetButton = document.getElementById("reset");
  const actionButton = document.getElementById("action-button");

  const paragraphs = Array.from(document.querySelectorAll("#paragraphs p"));
  const selectedParagraphDiv = document.getElementById("selected-paragraphs");

  let countdownTime = 180; 
  let interval;
  let lastParagraph = null;

  function updateCountdown() {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    countdownElement.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function startCountdown() {
    if (!interval) {
      interval = setInterval(function () {
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
    countdownTime = 180;
    updateCountdown();
  }

  function getRandomParagraph() {
    let randomParagraph;
    do {
      randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    } while (randomParagraph === lastParagraph);
    lastParagraph = randomParagraph;
    return randomParagraph;
  }

  function displayRandomParagraph() {
    selectedParagraphDiv.innerHTML = ""; 
    const randomParagraph = getRandomParagraph();
    const paragraphClone = randomParagraph.cloneNode(true);
    selectedParagraphDiv.appendChild(paragraphClone);
  }

  startButton.addEventListener("click", startCountdown);
  stopButton.addEventListener("click", stopCountdown);
  resetButton.addEventListener("click", resetCountdown);
  actionButton.addEventListener("click", displayRandomParagraph);

  updateCountdown();
});
