
/*----- constants -----*/
const suits = ["s", "c", "d", "h"];
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A" ];

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
    winner = false;

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
    if (
        !("row" in evt.target.dataset) ||
        board[evt.target.dataset.row][evt.target.dataset.col].flipped
    ) return;
    const row = parseInt(evt.target.dataset.row);
    const col = parseInt(evt.target.dataset.col);
    board[row][col].flipped = true;
    
    if (!firstPick) {
        firstPick = board[row][col];
    } else if (firstPick.value === board[row][col].value) {
        firstPick = null;
        checkWinner();
    } else {
        setTimeout(function() {
            firstPick.flipped = false;
            board[row][col].flipped = false;
            firstPick = null;
            render();
        }, 3000)
    }
    render();
}

function getNewShuffledDeck() {
    //shallow copy created
    const tempDeck = [...originalDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
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
                value: rank,
            });
        });
    });
    //console.log(deck);
    return deck;
}

function checkWinner() {
    //check the board array and if EVERY card obj is flipped
    //set winner to true
    board.forEach(function(row) {
        row.forEach(function(col) {
            if (col.every(function(card) {
                card.flipped === true;
            })
            ) {
                winnerMessage();
                return winner = true;
            }
        })
    })
    
}

function winnerMessage() {
    console.log("Congrats, you got all the matches!");
    //render();
}