document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.querySelector(".restart");
    const turnIndicator = document.getElementById("turn-indicator");

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = true;

    // Attach event listeners
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);

    function cellClicked() {
        const cellIndex = this.getAttribute("data-index");

        if (board[cellIndex] !== "" || !running) return;

        updateCell(this, cellIndex);
        checkWinner();
    }

    function updateCell(cell, index) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === "X" ? "#FFEE58" : "#80DEEA";
    }

    function changePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnIndicator.textContent = `${currentPlayer}'s Turn`;
    }

    function checkWinner() {
        let roundWon = false;
        let winningCombo = [];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                roundWon = true;
                winningCombo = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            turnIndicator.textContent = `${currentPlayer} Wins! 🎉`;
            running = false;
            highlightWinningCells(winningCombo);
        } else if (!board.includes("")) {
            turnIndicator.textContent = "Draw!";
            running = false;
        } else {
            changePlayer();
        }
    }

    function highlightWinningCells(indices) {
        indices.forEach(index => {
            cells[index].classList.add("winning-cell");
        });
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        running = true;
        currentPlayer = "X";
        turnIndicator.textContent = "X's Turn";

        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.color = ""; // Reset text color
            cell.classList.remove("winning-cell");
        });
    }
});
