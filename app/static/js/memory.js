const tilesContainer = document.querySelector(".tiles");
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
    const element = document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");

        if (
            awaitingEndOfMove ||
            revealed === "true" ||
            element === activeTile
        ) {
            return;
        }

        // Reveal this color
        element.style.backgroundColor = color;

        if (!activeTile) {
            activeTile = element;

            return;
        }

        const colorToMatch = activeTile.getAttribute("data-color");

        if (colorToMatch === color) {
            element.setAttribute("data-revealed", "true");
            activeTile.setAttribute("data-revealed", "true");

            activeTile = null;
            awaitingEndOfMove = false;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                alert("Congrats you won! Click restat to play again.");
            }

            return;
        }

        awaitingEndOfMove = true;

        setTimeout(() => {
            activeTile.style.backgroundColor = null;
            element.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);
    });

    return element;
}

// Build up tiles
function buildTiles() {
    tilesContainer.innerHTML = ""; // Clear existing tiles

    for (let i = 0; i < tileCount; i++) {
        const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
        const color = colorsPicklist[randomIndex];
        const tile = buildTile(color);

        colorsPicklist.splice(randomIndex, 1);
        tilesContainer.appendChild(tile);
    }
}

// Restart game
function restartGame() {
    revealedCount = 0;
    activeTile = null;
    awaitingEndOfMove = false;
    colorsPicklist.length = 0;

    // Rebuild colorsPicklist
    colorsPicklist.push(...colors);
    colorsPicklist.push(...colors);

    buildTiles();
}

// Attach restartGame function to the restart button
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

// Build initial tiles
buildTiles();