import Card from './Card.js';
import Deck from './Deck.js';
import GameManager from './GameManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const deck = new Deck();
    const blackjackGame = new GameManager(deck);

    const dealButton = document.getElementById('deal-button');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');

    dealButton.addEventListener('click', () => {
        blackjackGame.startNewRound();
    })

    hitButton.addEventListener('click', () => {
        blackjackGame.playerHit();
    });

    standButton.addEventListener('click', () => {
        blackjackGame.playerStand();
    });
});