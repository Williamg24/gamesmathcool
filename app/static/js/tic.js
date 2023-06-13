let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restart')
let boxes = Array.from(document.getElementsByClassName('box'))

let winIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O = "O"
const X = "X"
let currentPlayer = X
let selectedBoxes = Array(9).fill(null)
let count_plays = 0

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', fillBox))
}

//keep track of which box was clicked by filling boxes
function fillBox(e) {
    const id = e.target.id; //get id of html
    // if id not filled fill box with letter of current player
    if (!selectedBoxes[id] && count_plays < 9){
        selectedBoxes[id] = currentPlayer
        e.target.innerText = currentPlayer

        //check win condition
        if(playerWon() !== false ){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerWon()
            count_plays = 10
            winning_blocks.map(box => boxes[box].style.backgroundColor = winIndicator)
            return
        }
        count_plays++
        // basically saying if current player is x, current play = 0 and vice versa 
        currentPlayer = currentPlayer == X ? O : X

        // Update the turn text element
        turnText.innerHTML = `Player's Turn: ${currentPlayer}`
    }

    // if there is a tie
    if(count_plays === 9){
        playerText.innerHTML = "It's a tie!"
    }
}

// Array of all possible winning combinations 
const winningCombos = [
    // horizontal 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonal
    [0,4,8],
    [2,4,6]

]
function playerWon(){
    // a b c can take up any of the winning Combos
    for (const condition of winningCombos) {
        let [a,b,c] = condition
        // if a = b = c, player has won
        if (selectedBoxes[a] && (selectedBoxes[a] == selectedBoxes[b] && selectedBoxes[a] == selectedBoxes[c])){
            return [a,b,c]
        }
    }
    return false;
}

restartBtn.addEventListener('click', restartGame)

//clear board and selectedBoxes array and reset currentplayer
function restartGame() {
    selectedBoxes.fill(null)
    count_plays = 0
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.innerHTML = `Tic Tac Toe`
    turnText.innerHTML = `Player's Turn: ${X}` // Reset the turn text to the initial player
    currentPlayer = X
}

startGame()