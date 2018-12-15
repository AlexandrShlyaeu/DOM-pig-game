/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, isPlaying, previuosDiceValue;

let diceDom1 = document.querySelector(".dice");
let diceDom2 = document.querySelector(".dice2");

init();

function init() {
  isPlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector(`#score-0`).textContent = 0;
  document.querySelector(`#score-1`).textContent = 0;
  document.querySelector(`#current-0`).textContent = 0;
  document.querySelector(`#current-1`).textContent = 0;
  document.querySelector(`#name-0`).textContent = "PLAYER 1";
  document.querySelector(`#name-1`).textContent = "PLAYER 2";
  document.querySelector(`.player-0-panel`).classList.add("active");
  document.querySelector(`.player-0-panel`).classList.remove("winner");
  document.querySelector(`.player-1-panel`).classList.remove("active");
  document.querySelector(`.player-1-panel`).classList.remove("winner");
  diceDom1.style.display = "none";
  diceDom2.style.display = "none";
  previuosDiceValue = 0;
}

function endOfGame(playerStatus) {
  isPlaying = false;
  document.querySelector(
    `#name-${activePlayer}`
  ).textContent = `${playerStatus}`;
  diceDom1.style.display = "none";
  diceDom2.style.display = "none";
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.add("winner");
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove("active");
}

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (isPlaying) {
    let dice = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);
    diceDom1.style.display = "block";
    diceDom1.src = `./../img/dice-${dice}.png`;
    diceDom2.style.display = "block";
    diceDom2.src = `./../img/dice-${dice2}.png`;

    if (dice === previuosDiceValue && dice == 6) {
      endOfGame("LOOSER!");
    }

    if (dice !== 1 && dice2 !== 1) {
      roundScore += dice + dice2;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
      previuosDiceValue = dice;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (isPlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      endOfGame("WINNER!");
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(`#current-0`).textContent = 0;
  document.querySelector(`#current-1`).textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  diceDom1.style.display = "none";
  diceDom2.style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);
