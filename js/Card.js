export default class Card {
    constructor(s, r) {
        this.suit = s;
        this.rank = r;
    }

    show() {
        return `${this.rank}${this.suit}`;
    }
}