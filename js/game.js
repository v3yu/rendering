// game.js
import GameManager from "./GameManager.js";

document.addEventListener("DOMContentLoaded", () => {
  const gameStateEl = document.getElementById("game-state");
  const messageArea = document.createElement("div");
  messageArea.id = "message-area";
  gameStateEl.prepend(messageArea);

  const gm = new GameManager();

  const dealBtn      = document.getElementById("deal-button");
  const hitBtn       = document.getElementById("hit-button");
  const standBtn     = document.getElementById("stand-button");
  const wagerInput   = document.getElementById("wager-input");
  const playerScore  = document.getElementById("player-score");
  const dealerScore  = document.getElementById("dealer-score");
  const playerHandEl = "#player-hand";
  const dealerHandEl = "#dealer-hand";

  function refreshUI() {
    // buttons
    switch (gm.state) {
      case "betting":
        dealBtn.disabled  = false;
        hitBtn.disabled   = true;
        standBtn.disabled = true;
        break;
      case "playerTurn":
        dealBtn.disabled  = true;
        hitBtn.disabled   = false;
        standBtn.disabled = false;
        break;
      case "dealerTurn":
        dealBtn.disabled  = true;
        hitBtn.disabled   = true;
        standBtn.disabled = true;
        break;
      case "end":
        dealBtn.disabled  = false;
        hitBtn.disabled   = true;
        standBtn.disabled = true;
        break;
    }

    // hands
    gm.playerHand.render(playerHandEl);
    gm.dealerHand.render(dealerHandEl);

    // scores
    playerScore.textContent = `👤 Player: ${gm.playerHand.value}`;
    dealerScore.textContent = `🏦 Dealer: ${gm.dealerHand.value}`;
  }

  dealBtn.addEventListener("click", () => {
    const w = parseInt(wagerInput.value);
    if (!isNaN(w) && w > 0) {
      gm.currentBet = w;
    }
    gm.startNewRound();
    refreshUI();
  });

  hitBtn.addEventListener("click", () => {
    gm.playerHit();
    refreshUI();
  });

  standBtn.addEventListener("click", async () => {
    await gm.playerStand();
    refreshUI();
  });

  refreshUI();
});