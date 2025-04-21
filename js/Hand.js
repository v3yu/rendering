// hand.js
import Card from "./Card.js";

class Hand {
    constructor(cards = [], balanceTracker = null) {
        this.cards = cards;
        this.balanceTracker = balanceTracker;
        this.value = this.calculateValue();
    }

    render(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error(`Container not found for selector: ${containerSelector}`);
            return;
        }
        console.log(`Rendering to container: ${containerSelector}`);
        container.innerHTML = '';
        for (const card of this.cards) {
            container.appendChild(card.render());
        }
    }

    addCard(card) {
        this.cards.push(card);
        card.render();
        this.value = this.calculateValue();
        console.log(`Hand value: ${this.value}, Cards: ${this.cards.map(card => card.value).join(", ")}`);
    }

    clear() {
        this.cards = [];
        this.value = 0;
    }

    calculateValue() {
        let total = 0;
        let aces = 0;
    
        // Loop through all cards in the hand
        for (const card of this.cards) {
            if (card.value === "A") {
                aces += 1; // Count the number of aces
                total += 11; // Initially count each ace as 11
            } else if (["K", "Q", "J"].includes(card.value)) {
                total += 10; // Face cards are worth 10
            } else {
                total += parseInt(card.value); // Number cards are worth their face value
            }
        }
    
        // Adjust for aces if the total exceeds 21
        while (total > 21 && aces > 0) {
            total -= 10; // Count an ace as 1 instead of 11
            aces -= 1;
        }
    
        return total;
    }

    async autoPlay(deck, renderSelector) {
        const container = document.querySelector(renderSelector);
        if (!container) {
            console.error(`Container not found for selector: ${renderSelector}`);
            return;
        }
    
        while (this.calculateValue() < 17) {
            const card = deck.deal(1)[0];
            this.addCard(card);
            // Re-render the dealer's hand
            container.innerHTML = ''; // Clear previous cards
            this.cards.forEach(card => {
                container.appendChild(card.render());
            });
            await new Promise(resolve => setTimeout(resolve, 600));
        }
    }

    placeBet(amount) {
        if (this.balanceTracker) {
            this.balanceTracker.deduct(amount);
        }
    }

    hit(deck) {
        const card = deck.deal(1)[0];
        this.addCard(card);
        return card;
    }

    stand() {
        // GameManager will handle turn ending
    }
}

export default Hand;
