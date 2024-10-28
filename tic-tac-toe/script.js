const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const undoBtn = document.getElementById("undoBtn");
const celebrationPopup = document.getElementById("celebrationPopup");
const winnerDisplay = document.getElementById("winner");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let moveHistory = [];

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to handle cell click
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // Save the move to history
    moveHistory.push(clickedCellIndex);

    checkResult();
};

// Function to check the result
const checkResult = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        winnerDisplay.textContent = currentPlayer; // Show the winner
        celebrationPopup.style.display = "block"; // Show celebration popup
        setTimeout(() => {
            celebrationPopup.style.display = "none"; // Hide it after a few seconds
        }, 3000);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
};

// Function to restart the game
const restartGame = () => {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    moveHistory = []; // Clear move history
    statusDisplay.innerHTML = "";
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
};

// Function to undo the last move
const undoMove = () => {
    if (moveHistory.length === 0 || !gameActive) {
        return;
    }

    const lastMoveIndex = moveHistory.pop(); // Remove the last move from history
    gameState[lastMoveIndex] = ""; // Clear that move from the game state
    cells[lastMoveIndex].innerHTML = ""; // Clear the cell visually

    // Switch back to the previous player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
};

// Event listeners
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});
restartBtn.addEventListener("click", restartGame);
undoBtn.addEventListener("click", undoMove);
