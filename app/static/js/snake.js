const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);


class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7; // initial speed

let tileCount = 20;
let tileSize = canvas.width / tileCount- 2;
let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2; // initial length 

// snake head direction
let dx = 0;
let dy = 0;

let appleX = 5;
let appleY = 5;

let score = 0;

function resetGame() {
  snakeParts.length = 0;
  tailLength = 2;
  dx = 0;
  dy = 0;
  headX = 10;
  headY = 10;
  appleX = 5;
  appleY = 5;
  score = 0;
  speed = 7;

  drawGame();
}


//game loop
function drawGame(){
    moveSnake();
    // stops game if game over
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();

    eatApple();
    drawApple();
    drawSnake();

    showScore();

    setTimeout(drawGame, 1000/speed)
}

function isGameOver(){
    let gameOver = false;

    if(dx === 0 && dy === 0){
      return  false;
    }
  
    // wall collisions
    if (headX < 0){
        gameOver = true;
    }
    else if (headX === tileCount){
        gameOver = true;
    }
    else if (headY < 0){
        gameOver = true;
    }else if (headY === tileCount){
        gameOver = true;
    }
  
    //body collision
    for (let i = 0; i < snakeParts.length; i++){
      let part = snakeParts[i];
      if (part.x === headX && part.y === headY){
        gameOver = true;
        break;
      }
    }

    // game over screen
    if (gameOver){
      ctx.fillStyle = "white";
      ctx.font = "50px Verdana";
  
      ctx.fillText("Game Over!", canvas.width/6.5, canvas.height/2)
    }

    return gameOver;
  }

function showScore(){
    ctx.fillStyle = "white"
    ctx.font = "10px Verdana"
    ctx.fillText("Score: " + score, canvas.width-50, 10)
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height)
}

function drawSnake(){
    // snake body
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize,tileSize)
    }

    // add tail to the end of snake
    snakeParts.push(new SnakePart(headX,headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift(); //remove furthest item from snake parts if > tail size
    }

    // snake head
    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

}

function moveSnake(){
    headX = headX + dx;
    headY = headY + dy;
}

function drawApple(){
    ctx.fillStyle = "red"
    ctx.fillRect(appleX * tileCount,appleY*tileCount,tileSize,tileSize)
}

// if snake eat apple, new apple spawn in random place
function eatApple(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        tailLength++; // increase body part when apple eaten
        score++;
        speed++; // increases speed 
    }
}

document.body.addEventListener('keydown', keyDown)
function keyDown(event){
    // up
    if (event.keyCode == 38){
        if(dy == 1){ // if moving down, stop user from moving up
          return;
        }
        dy = -1;
        dx = 0;
      }
    
      // down_key
      if (event.keyCode == 40){
        if(dy == -1){
          return;
        }
        dy = 1;
        dx = 0;
      }
    
      // left_key
      if (event.keyCode == 37){
        if(dx == 1){
          return;
        }
        dy = 0;
        dx = -1;
      }
    
       // right_key
       if (event.keyCode == 39){
        if(dx == -1){
          return;
        }
        dy = 0;
        dx = 1;
      }
    
}

drawGame();