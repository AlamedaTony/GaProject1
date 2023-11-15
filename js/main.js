	/*----- constants -----*/
    const suits = ["s", "c", "d", "h"];
    const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A" ];

    //build an "original" deck of "card" objects used to create shuffled cards
    const originalDeck = buildOriginalDeck();
    //renderDeckInContainer(originalDeck, document.getElementById("original-deck-container"));
	/*----- state variables -----*/
    let board;
    let winner;
    let cards;
    let shuffledDeck;

	/*----- cached elements  -----*/
    const playAgainBtn = document.getElementById("play again");
    const shuffledContainer = document.getElementById("shuffled-deck-container");

	/*----- event listeners -----*/
    document.querySelector("button").addEventListener("click", onPlayAgainClick);
    document.querySelector(".card-container").addEventListener("click", onCardClick);
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

    function onPlayAgainClick() {
        //need to reset game state
        //reshuffle deck
        //all cards show "back" value
        // winner message disappers



        renderNewShuffledDeck();

    }

    function flipCard() {

    }

    function onCardClick() {
        //if a card is already visable(face value showing), do nothing
        //if ()
        //flip card over showing the "face" value
        //if card already flipped and clicked card doesn't match, flip back over to "back" value
        //if card is already flipped and cicked card does match, stay flipped
        //if all cards are clicked, needs to render winner message
    }

    function getNewShuffledDeck() {
        //shallow copy created
        const tempDeck = [...originalDeck];
        const newShuffledDeck = [];
        while (tempDeck.length) {

            //need to know if a card is visable(face value is showing) or not

            //need to know if it is matched

            const rndIdx = Math.floor(Math.random() * tempDeck.length);
            tempDeck[rndIdx].visable = false;
            tempDeck[rndIdx].matched = false;

            newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);

        }
        console.log(newShuffledDeck);
        return newShuffledDeck;
    }

    function buildOriginalDeck() {
        const deck = [];
        suits.forEach(function(suit) {
            ranks.forEach(function(rank) {
                deck.push({
                    face: `${suit}${rank}`,
                });
            });
        });
        //console.log(deck);
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
            cardsHtml += `<div class="card ${card.face}"></div>`;
        });
        container.innerHTML = cardsHtml;
    }
    renderNewShuffledDeck();