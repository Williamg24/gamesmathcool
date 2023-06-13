var playerRed = "R";
var playerYellow = "Y";
var currentPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; //keeps track of which row each column is at.

window.onload = function() {
    startGame();
    document.getElementById("restart").addEventListener("click", restartGame);
}

function startGame() {
    board = [];

    // imaginary columns for gravity 
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            
            row.push(' ');
            // in HTML, give tile an id of row-column
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", dropPiece);
            // adds <div id = 'row-col' class = 'tile'></div> to the HTML for each space
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function dropPiece() {
    // if there is a winner, can't place any more pieces
    if (gameOver) {
        return;
    }

    //id of "0-0" becomes array of ["0","0"] (row,col)
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c]; 

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    // update JS board
    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    // alternate between the colors
    if (currentPlayer == playerRed) {
        tile.classList.add("red-piece");
        currentPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currentPlayer = playerRed;
    }

    r -= 1; //moves up row after each piece drops 
    currColumns[c] = r; //update the array to new row

    checkWinner();
}

function checkWinner() {
     // horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal left-top to right-bottom 
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal left-bottom to right-top 
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

// winning text
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";             
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true;
}

function restartGame() {
    // Clear the board
    let tiles = document.getElementsByClassName("tile");
    while (tiles.length > 0) {
        tiles[0].parentNode.removeChild(tiles[0]);
    }
  
    // Reset variables
    currentPlayer = playerRed;
    gameOver = false;
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
  
    // Clear the winner text
    document.getElementById("winner").innerText = "";
  
    // Start a new game
    startGame();
}

