	/*----- constants -----*/
    const suits = ["s", "c", "d", "h"];
    const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A" ];

    //build an "original" deck of "card" objects used to create shuffled cards
    const originalDeck = buildOriginalDeck();
    renderDeckInContainer(originalDeck, document.getElementById("original-dek-container"));
	/*----- state variables -----*/
    let board;
    let winner;
    let cards;
    let shuffledDeck;

	/*----- cached elements  -----*/
    const playAgainBtn = document.getElementById("play again");
    const shuffledContainer = document.getElementById("shuffled-deck-container");

	/*----- event listeners -----*/
    document.querySelector("button").addEventListener("click", renderNewShuffledDeck);

	/*----- functions -----*/
    init();

    
    function init() {
        board = [
            [],
            [],
            [],
            [],
        ];
        //first create a shuffled array of card objects and assign to card state
        //then, take each card object push each row
    }

    function getNewShuffledDeck() {
        const tempDeck = [...originalDeck];
        const newShuffledDeck = [];
        while (tempDeck.length) {
            const rndIdx = Math.floor(Math.random() * tempDeck.length);
            newShuffledDeck.push(tempDeck.splice(rndIdx, 1) [0]);
        }
        return newShuffledDeck;
    }

    function buildOriginalDeck() {
        const deck = [];
        suits.forEach(function(suit) {
            ranks.forEach(function(rank) {
                deck.push({
                    face: `${suit}${rank}`,
                })
            })
        })
        return deck;
    }

    function renderNewShuffledDeck() {
        shuffledDeck = getNewShuffledDeck();
        renderDeckInContainer(shuffledDeck, shuffledContainer);
    }
    function renderDeckInContainer(deck, container) {
        container.innerHTML = "";
        //build the cards as a string of HTML
        let cardsHtml = "";
        deck.forEach(function(card) {
            cards.Html += `<div class="card ${card.face}"></div>`;
        });
        container.innerHTML = cardsHtml;
    }
    renderNewShuffledDeck();