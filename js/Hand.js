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
        container.innerHTML = '';
        for (const card of this.cards) {
            container.appendChild(card.render());
        }
    }

    addCard(card) {
        this.cards.push(card);
        card.render();
        this.value = this.calculateValue();
    }

    clear() {
        this.cards = [];
        this.value = 0;
    }

    calculateValue() {
        let total = 0;
        let aces = 0;

        for (const card of this.cards) {
            const rank = card.rank;
            if (rank === 'A') {
                aces++;
                total += 11;
            } else if (["K", "Q", "J"].includes(rank)) {
                total += 10;
            } else {
                total += parseInt(rank);
            }
        }

        // Handle ace logic (11 or 1)
        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }

        return total;
    }

    async autoPlay(deck, renderSelector) {
        while (this.value < 17) {
            const newCard = deck.deal(1)[0];
            this.addCard(newCard);
            if (renderSelector) this.render(renderSelector);
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
