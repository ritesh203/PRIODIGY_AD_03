const cells = document.querySelectorAll(".cell");
const result = document.getElementById("result");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.id);

    if (board[cellIndex] === "" && gameActive) {
        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkForWin()) {
            result.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (board.includes("")) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        } else {
            result.textContent = "It's a draw!";
        }
    }
}

function checkForWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }
    return false;
}

function handleRestartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    result.textContent = "";
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
document.getElementById("restart").addEventListener("click", handleRestartGame);
