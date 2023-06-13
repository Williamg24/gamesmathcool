var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
    document.getElementById("restart").addEventListener("click", restartGame);
}

function setGame() {
    // create a empty board first 
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // creates <div> tag for html
            let tile = document.createElement("div");
            // coordinate of the tile in "row-col"
            tile.id = r.toString() + "-" + c.toString(); 
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //create 2 to begin the game
    setTwo();
    setTwo();
}

function setTwo() {
    // don't add 2 if there isn't an empty tile instead break 
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            //updating the HTML
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}

// update tile number when it collides
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList so there's only 1 
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        // any number less than 4096, set to specific color 
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else { 
            tile.classList.add("x8192");
        }                
    }
}

// key inputs to slide the tiles 
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();

    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    //update score
    document.getElementById("score").innerText = score;
})

//create new array of all nums without the zeros
function filterZero(row){
    return row.filter(num => num != 0); 
}

function slide(row) {
    row = filterZero(row); 
    //slide 
    for (let i = 0; i < row.length-1; i++){
        // check every 2 value in array
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } 
    row = filterZero(row); 
    //add zeroes back to the end of rows
    while (row.length < columns) {
        row.push(0);
    } 
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        // updating the HTML 
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// same as left() function but reversing the values in array twice
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// transform each column to an array formatted as a row, then slide left 
function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

// similar to slideUp() but just reversing the column
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function restartGame() {
    // Clear the board
    document.getElementById("board").innerHTML = "";
    // Reset the score
    score = 0;
    document.getElementById("score").innerText = score;
    // Set the game again
    setGame();
}