import Card from "./Card.js";

class Deck {
    #deck = [];
    #suits = ["♥", "♠", "♣", "♦"];
    #ranks = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    #nCards = 0; //number of cards in the deck
    #nDecks = 1; //number of decks in the deck

    constructor() {
        this.scratchDeck();
    }

    //add card of suit s and rank r to the deck
    addCard(s, r) {
        this.#deck.push(new Card(s, r));
    }

    //set up deck assuming that current deck is empty
    scratchDeck() {
        for (let i = 0; i < this.#nDecks; i++) {
            for (const s of this.#suits) {
                for (const r of this.#ranks) {
                    this.addCard(s,r);
                    this.#nCards++;
                }
            }
        }
    }

    //shuffle the deck
    shuffle() {
        for (let i = 0; i < 100000; i++) {
            let randS = Math.floor(Math.random() * this.#nCards);
            let randE = Math.floor(Math.random() * (this.#nCards - randS)) + randS;
            if (i % 3 == 0) {
                this.#deck = this.#deck.slice(randS, randE).concat(this.#deck.slice(0, randS).concat(this.#deck.slice(randE)));
            }
            else if (i % 3 == 1) {
                this.#deck = this.#deck.slice(0, randS).concat(this.#deck.slice(randE).concat(this.#deck.slice(randS, randE)));
            }
            else {
                this.#deck = this.#deck.slice(randE).concat(this.#deck.slice(randS, randE).concat(this.#deck.slice(0, randS)));
            }
        }
    }

    //returns string of format "{rank}{suit}" which represents this.#deck[id] card
    getCard(id) {
        return this.#deck[id].show();
    }

    removeCard(id) {
        if (id == this.#nCards - 1) this.#deck.pop();
        if (id == 0) this.#deck = this.#deck.slice(1);
        else this.#deck = this.#deck.slice(0, id).concat(this.#deck.slice(id+1));
    }

    //outputs contents of the deck to the console
    showDeck() {
        let i = 0;
        let s = "";
        for (const card of this.#deck) {
            s = s.concat(card.show().concat(" "));
            i++;
            if (i == 13) {
                console.log(s);
                s = "";
                i = 0;
            }
        }
        if (i != 0) console.log(s);
    }

    //resets the deck
    reset() {
        this.#deck = [];
        this.scratchDeck();
    }

    //returns array of n Cards that are dealt
    deal(n) {
        let dealt = [];
        for (let i = 0; i < n; i++) {
            dealt.push(this.#deck.pop());
        }
        return dealt;
    }
}