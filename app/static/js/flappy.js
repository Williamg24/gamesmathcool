document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Bird
    let birdX = 50;
    let birdY = canvas.height / 2;
    let birdSize = 20;
    let birdSpeed = 0;
    let gravity = 0.4;
    let jumpForce = -8;

    function drawBird() {
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.fillRect(birdX, birdY, birdSize, birdSize);
        ctx.closePath();
    }

    function updateBird() {
        birdSpeed += gravity;
        birdY += birdSpeed;
    }

    // Pipes
    const pipeWidth = 60;
    const pipeGap = 200;
    let pipes = [];
    pipes.push({
        x: canvas.width,
        y: 0,
        width: pipeWidth,
        height: Math.floor(Math.random() * (canvas.height - pipeGap)),
    });

    function drawPipes() {
        ctx.fillStyle = '#00FF00';

        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];

            ctx.beginPath();
            ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
            ctx.fillRect(pipe.x, pipe.height + pipeGap, pipe.width, canvas.height);
            ctx.closePath();
        }
    }

    function updatePipes() {
        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];

            pipe.x -= 2;

            if (pipe.x + pipe.width < 0) {
                pipes.shift();
            }
        }

        if (pipes[pipes.length - 1].x < canvas.width - pipeGap) {
            pipes.push({
                x: canvas.width,
                y: 0,
                width: pipeWidth,
                height: Math.floor(Math.random() * (canvas.height - pipeGap)),
            });
        }
    }

    // Event Listeners
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            birdSpeed = jumpForce;
        }
    });

    // Collision Detection
    function checkCollision() {
    const birdRight = birdX + birdSize;
    const birdBottom = birdY + birdSize;

    // Check if the bird hits the pipes
    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];

        if (
            birdRight >= pipe.x &&
            birdX <= pipe.x + pipe.width &&
            (birdY <= pipe.height || birdBottom >= pipe.height + pipeGap)
        ) {
            // Collision detected, game over
            return true;
        }
    }

    // Check if the bird goes beyond the canvas boundaries
    if (birdY + birdSize > canvas.height || birdY < 0) {
        // Collision detected, game over
        return true;
    }

    return false;
}


    // Score Tracking
    let score = 0;
    let scoreUpdated = false;

    function updateScore() {
        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];

            if (birdX > pipe.x + pipe.width && !scoreUpdated) {
                score++;
                scoreUpdated = true;
            }

            if (birdX <= pipe.x + pipe.width) {
                scoreUpdated = false;
            }
        }
    }

    function drawScore() {
        ctx.fillStyle = '#000000';
        ctx.font = '24px Calibri';
        ctx.fontColor= 'white';
        ctx.fillText('Score: ' + score, 10, 30);
    }

    // Start New Game
    function startNewGame() {
        // Reset variables and state
        score = 0;
        birdX = 50;
        birdY = canvas.height / 2;
        birdSpeed = 0;
        pipes = [];
        pipes.push({
            x: canvas.width,
            y: 0,
            width: pipeWidth,
            height: Math.floor(Math.random() * (canvas.height - pipeGap)),
        });

        // Hide the "Start New Game" button
        startButton.style.display = 'none';

        // Restart the game loop
        gameLoop();
    }

    // Event Listener for the "Start New Game" button
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startNewGame);

    // Game Loop
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBird();
        drawPipes();
        updateBird();
        updatePipes();
        updateScore();
        drawScore();

        if (checkCollision()) {
            // Game over
            startButton.style.display = 'block';
        } else {
            requestAnimationFrame(gameLoop);
        }
    }

    // Hide the "Start New Game" button initially
    startButton.style.display = 'none';

    // Initial game start
    gameLoop();
});
