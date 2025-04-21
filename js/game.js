import Card from 'js/card.js';
import Deck from 'js/js';
import GameManager from 'js/GameManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const deck = new Deck();
    const blackjackGame = new GameManager(deck);

    const dealButton = document.getElementById('deal-button');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');

    dealButton.addEventListener('click', () => {
        blackjackGame.startGame();
    });

    hitButton.addEventListener('click', () => {
        blackjackGame.playerHit();
    });

    standButton.addEventListener('click', () => {
        blackjackGame.playerStand();
    });
});