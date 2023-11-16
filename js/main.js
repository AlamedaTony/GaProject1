    /*Set all cards face down across board
    when clicked the 1st card is flipped face up, check to see if the card is already face up
    if the card is not already face up, flip the 2nd card face up.
    if 1st card and 2nd card are a match stay flipped face up.
    if 1st card and 2nd card are not a match flipp face down.*/
    
    
    
    /*----- constants -----*/
    const suits = ["s", "c", "d", "h"];
    const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A" ];

    //build an "original" deck of "card" objects used to create shuffled cards
    const originalDeck = buildOriginalDeck();
    //renderDeckInContainer(originalDeck, document.getElementById("original-deck-container"));
	/*----- state variables -----*/
    let board;
    let winner;
    let currentCard;
    let shuffledDeck;

	/*----- cached elements  -----*/
    const playAgainBtn = document.getElementById("play again");
    const shuffledContainer = document.getElementById("shuffled-deck-container");
    //console.log(shuffledContainer);
    
    
    
    //console.log(shuffledDeck);
	/*----- event listeners -----*/
    document.querySelector("button").addEventListener("click", onPlayAgainClick);
    
	/*----- functions -----*/
    init();

    
    function init() {
        board = [
            [],
            [],
            [],
            [],
        ];
        
    }

    function onPlayAgainClick() {
        //need to reset game state
        //reshuffle deck
        //all cards show "back" value
        // winner message disappers



        renderNewShuffledDeck();

    }

    function onCardClick(evt) {
        //flip card over showing the "face" value
        evt.target.classList.remove("back");
        /*When a card is clicked the back class is removed
        */
       
       

        //if a card is already visable(face value showing), do nothing
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
            cardsHtml += `<div class="card back ${card.face}"></div>`;
            
        });
        container.innerHTML = cardsHtml;
        const cards = document.querySelectorAll(".card");
        //console.log(cards);
            
        cards.forEach(function(card) {
             card.addEventListener("click", onCardClick)
           })
    }
    renderNewShuffledDeck();