import Deck from "./Deck.js";
import Hand from "./Hand.js";
import BalanceTracker from "./BalanceTracker.js";

class GameManager {
    constructor() {
        this.deck = new Deck();
        this.balanceTracker = new BalanceTracker(1000);

        this.playerHand = new Hand([], this.balanceTracker);
        this.dealerHand = new Hand([], null);

        this.state = "betting";
        this.currentBet = 100;

    }

    startNewRound() {
        this.resetRound();

        this.deck.reset();
        this.deck.shuffle();
        
        // Use this for player bets
        const betInput = document.getElementById("bet-input");
        if (betInput) {
            const value = parseInt(betInput.value);
            if (!isNaN(value) && value > 0) {
                this.currentBet = value;
            }
        }

        this.playerHand.placeBet(this.currentBet);

        // Starting hands
        this.playerHand.addCard(this.deck.deal(1)[0]);
        this.dealerHand.addCard(this.deck.deal(1)[0]);

        this.playerHand.addCard(this.deck.deal(1)[0]);
        this.dealerHand.addCard(this.deck.deal(1)[0]);

        /* Use the following when rendering 
        this.playerHand.render("#phand");
        this.dealerHand.render("#dhand");
        */

        this.state = "playerTurn"
    }

    playerHit() {
        if (this.state != "playerTurn") return;

        this.playerHand.hit(this.deck);
        // this.playerHand.render("#phand");

        if (this.playerHand.value > 21) {
            this.state = "end";
            this.updateMessage("Busted! Dealer wins.");
        }
    }

    async playerStand() {
        if (this.state !== "playerTurn") return;

        this.state = "dealerTurn";
        await this.dealerHand.autoPlay(this.deck, "#dhand");
        this.checkWinner();
    }

    checkWinner() {
        const playerVal = this.playerHand.value;
        const dealerVal = this.dealerHand.value;

        let result;

        if (dealerVal > 21 || playerVal > dealerVal) {
            this.balanceTracker.add(this.currentBet * 2); // 2x rewards
            result = "You win!";
        } else if (playerVal === dealerVal) {
            this.balanceTracker.add(this.currentBet); // tie
            result = "Push!";
        } else {
            result = "Dealer wins."; // lose
        }

        this.state = "end";
        this.updateMessage(result);
    }

    resetRound() {
        this.playerHand.clear();
        this.dealerHand.clear();

        // removes visuals from html, feel free to change
        document.querySelector("#phand").innerHTML = ""; 
        document.querySelector("#dhand").innerHTML = "";

        this.state = "betting";
        this.updateMessage("New round. Place your bet.");
    }

    updateMessage(msg) {
        const el = document.getElementById("message-area");
        if (el) el.textContent = msg;
    }
}

export default GameManager;