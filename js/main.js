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
    let firstPick;
	/*----- cached elements  -----*/
    const playAgainBtn = document.getElementById("play again");
    const boardEl = document.getElementById("shuffled-deck-container");
    //console.log(shuffledContainer);
    
    
    
    //console.log(shuffledDeck);
	/*----- event listeners -----*/
    document.querySelector("button").addEventListener("click", init);
    boardEl.addEventListener("click", handleBoardClick);
	/*----- functions -----*/
    init();

    
    function init() {
        shuffledDeck = getNewShuffledDeck();
        board = [
            [],
            [],
            [],
            [],
        ];

        board.forEach(function(row) {
            for (let i = 0; i < 13; i++) {
                row.push(shuffledDeck.pop());
            }
        });

        firstPick = null;

        render();
    }


    function render() {
        renderBoard();
    }

    function renderBoard() {
        boardEl.innerHTML = "";
        board.forEach(function(row, rowIdx) {
            row.forEach(function(card, colIdx) {
                const cardEl = document.createElement("div");
                cardEl.dataset.row = rowIdx;
                cardEl.dataset.col = colIdx;
                //cardEl.id = `r${rowIdx}c${colIdx}`;
                if(card.flipped) {
                    cardEl.className = `card ${card.face}`
                    
                } else {
                    cardEl.className = "card back";
                }
                boardEl.append(cardEl);
            })
        })
    };

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

    function handleBoardClick(evt) {
        if (!("row" in evt.target.dataset)) return;
        const row = parseInt(evt.target.dataset.row);
        const col = parseInt(evt.target.dataset.col);
        board[row][col].flipped = true;
        //if there is no current firstPick,equal null, then set
        //card that was clicked to be equal to firstPick
        
        //otherwise,if there is a current firstPick
        //compare the current firstPick to card just clicked
       
       
        render();
    }

    function getNewShuffledDeck() {
        //shallow copy created
        const tempDeck = [...originalDeck];
        const newShuffledDeck = [];
        while (tempDeck.length) {
            //need to know if a card is visable(face value is showing) or not

            //need to know if it is matched
            const rndIdx = Math.floor(Math.random() * tempDeck.length);
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
                    flipped: false,
                });
            });
        });
        //console.log(deck);
        return deck;
    }


    
   