class Card{
    static values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    static suits = ["♥", "♠", "♣", "♦"];

    constructor(suit, value, faceUp = false) {
        if(!this.values.includes(value)){
            throw "Invalid card value!";
        }
        if(!this.suits.includes(suit)){
            throw "Invalid card suit!";
        }
        this.suit = suit;
        this.value = value;
        this.faceUp = faceUp;
    }

    flip(){
        this.faceUp = !this.faceUp;
    }

    get color(){
        return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
    }

    render(){
        const cardDiv = document.createElement("div");
        cardDiv.innerText = this.show();
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = this.show();
        return cardDiv;
    }

    show() {
        return `${this.value}${this.suit}`;
    }
}
