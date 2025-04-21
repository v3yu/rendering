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
        const dealerSecondCard = this.deck.deal(1)[0];
        dealerSecondCard.faceUp = false; // Set the dealer's second card face-down
        this.dealerHand.addCard(dealerSecondCard);
        this.playerHand.addCard(this.deck.deal(1)[0]);
        this.dealerHand.addCard(this.deck.deal(1)[0]);

        // Render the cards in the game area
        const gameArea = document.getElementById('hand-area');
        gameArea.classList.add('hand-area');
        gameArea.innerHTML = ''; // Clear previous cards

        const dealerSection = document.createElement('div');
        dealerSection.classList.add('section');
        dealerSection.id = 'dealer-section';
        // Create dealer hand section
        const dealerHandDiv = document.createElement('div');
        dealerHandDiv.classList.add('hand');
        dealerHandDiv.id = 'dealer-hand';
        this.dealerHand.cards.forEach(card => {
            dealerHandDiv.appendChild(card.render());
        });

        //Create dealer score section
        const dealerScore = document.createElement('div');
        dealerScore.classList.add('score');
        dealerScore.id = 'dealer-score';
        dealerScore.textContent = `🏦 Dealer: ${this.dealerHand.value}`;
        dealerHandDiv.appendChild(dealerScore);

        // Create player hand section
        const playerHandDiv = document.createElement('div');
        playerHandDiv.classList.add('hand');
        playerHandDiv.id = 'player-hand';
        this.playerHand.cards.forEach(card => {
            playerHandDiv.appendChild(card.render());
        });
        // Create player score section
        const playerScore = document.createElement('div');
        playerScore.classList.add('score');
        playerScore.id = 'player-score';
        playerScore.textContent = `👤 Player: ${this.playerHand.value}`
        playerHandDiv.appendChild(playerScore);

        // Add hands to the game area
        gameArea.appendChild(dealerHandDiv);
        gameArea.appendChild(playerHandDiv);
        /* Use the following when rendering 
        this.playerHand.render("#phand");
        this.dealerHand.render("#dhand");
        */

        this.state = "playerTurn"
    }

    playerHit() {
        if (this.state != "playerTurn") return;

        this.playerHand.hit(this.deck);

        //re-render the player hand
        const playerHandDiv = document.getElementById('player-hand');
        playerHandDiv.innerHTML = ''; // Clear previous cards
        this.playerHand.cards.forEach(card => {
            playerHandDiv.appendChild(card.render());
        });
        //re-render the player score
        const playerScore = document.getElementById('player-score');
        playerScore.textContent = `👤 Player: ${this.playerHand.value}`;
        playerHandDiv.appendChild(playerScore);
        this.checkWinner();
        if (this.playerHand.value > 21) {
            this.state = "end";
            this.updateMessage("Busted! Dealer wins.");
        }

    }

    async playerStand() {
        if (this.state !== "playerTurn") return;
    
        this.state = "dealerTurn";
    
        // Flip the dealer's second card
        this.dealerHand.cards[0].faceUp = true;
    
        const dealerHandDiv = document.getElementById('dealer-hand');
        dealerHandDiv.innerHTML = ''; // Clear previous cards
        this.dealerHand.cards.forEach(card => {
            dealerHandDiv.appendChild(card.render());
        });
    
        // Dealer's turn to play
        await this.dealerHand.autoPlay(this.deck, "#dealer-hand");
        // Check the winner
        this.checkWinner();
        console.log("dealer's cards:" + this.dealerHand.cards.map(card => card.show()));
    }

    checkWinner() {
        const playerVal = this.playerHand.value;
        const dealerVal = this.dealerHand.value;
    
        let result;
    
        if (playerVal > 21) {
            // Player busts
            result = "Busted! Dealer wins.";
        } else if (dealerVal > 21) {
            // Dealer busts
            this.balanceTracker.add(this.currentBet * 2); // Player wins 2x the bet
            result = "Dealer busted! You win!";
        } else if (playerVal > dealerVal) {
            // Player has a higher value
            this.balanceTracker.add(this.currentBet * 2); // Player wins 2x the bet
            result = "You win!";
        } else if (playerVal === dealerVal) {
            // Tie
            this.balanceTracker.add(this.currentBet); // Player gets their bet back
            result = "Push!";
        } else {
            // Dealer has a higher value
            result = "Dealer wins.";
        }
    
        this.state = "end"; // Set the game state to end
        this.updateMessage(result); // Display the result message
    }

    resetRound() {
        this.playerHand.clear();
        this.dealerHand.clear();

        this.state = "betting";
        this.updateMessage("New round. Place your bet.");
    }

    updateMessage(msg) {
        const el = document.getElementById("message-area");
        if (el) el.textContent = msg;
    }
}

export default GameManager;