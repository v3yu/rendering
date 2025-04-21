class Card {
    static values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    static suits = ["♥", "♠", "♣", "♦"];

    constructor(suit, value, faceUp = true) {
        if (!Card.values.includes(value)) {
            throw "Invalid card value!";
        }
        if (!Card.suits.includes(suit)) {
            throw "Invalid card suit!";
        }
        this.suit = suit;
        this.value = value;
        this.faceUp = faceUp;
    }

    flip() {
        this.faceUp = !this.faceUp;
    }

    get color() {
        return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
    }
    render() {
        // Create the card container
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        if (this.faceUp) {
            // Create the front face of the card
            const frontDiv = document.createElement('div');
            frontDiv.classList.add('front');
            // Change text color of the card according to the suit
            if (this.suit === '♥' || this.suit === '♦') {
                frontDiv.style.color = 'red';
            } else {
                frontDiv.style.color = 'black';
            }

            // Create the value and suit elements
            const valueDiv = document.createElement('div');
            valueDiv.classList.add('value');
            valueDiv.textContent = this.value;

            const suitDiv = document.createElement('div');
            suitDiv.classList.add('suit');
            suitDiv.textContent = this.suit;

            frontDiv.appendChild(valueDiv);
            frontDiv.appendChild(suitDiv);

            cardDiv.appendChild(frontDiv);
        } else {
            // Create the back face of the card
            const backDiv = document.createElement('div');
            backDiv.classList.add('back');

            cardDiv.appendChild(backDiv);
        }
        return cardDiv;
    }

    show() {
        return `${this.value}${this.suit}`;
    }
}
export default Card;