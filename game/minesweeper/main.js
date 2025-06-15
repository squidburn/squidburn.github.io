let ROWS = 9;
let COLS = 9;
let MINES = 10;

let board = [];
let mineMap = [];
let flagCount = 0;
let gameOver = false;

const boardDiv = document.getElementById('game-board');
const flagCountSpan = document.getElementById('flag-count');
const restartBtn = document.getElementById('restart-button');
const inputRows = document.getElementById('input-rows');
const inputCols = document.getElementById('input-cols');
const inputMines = document.getElementById('input-mines');

function initGame() {
    ROWS = parseInt(inputRows.value) || 9;
    COLS = parseInt(inputCols.value) || 9;
    MINES = parseInt(inputMines.value) || 10;

    // 限制雷数不能超过总格数-1
    if (MINES >= ROWS * COLS) {
        MINES = ROWS * COLS - 1;
        inputMines.value = MINES;
    }

    board = [];
    mineMap = [];
    flagCount = 0;
    gameOver = false;
    flagCountSpan.textContent = flagCount;

    // 设置棋盘样式
    boardDiv.style.gridTemplateColumns = `repeat(${COLS}, 30px)`;
    boardDiv.style.gridTemplateRows = `repeat(${ROWS}, 30px)`;

    // 初始化棋盘
    for (let r = 0; r < ROWS; r++) {
        board[r] = [];
        mineMap[r] = [];
        for (let c = 0; c < COLS; c++) {
            board[r][c] = { open: false, flag: false };
            mineMap[r][c] = 0;
        }
    }

    // 随机布雷
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        let r = Math.floor(Math.random() * ROWS);
        let c = Math.floor(Math.random() * COLS);
        if (mineMap[r][c] === 0) {
            mineMap[r][c] = 1;
            minesPlaced++;
        }
    }

    renderBoard();
}

function renderBoard() {
    boardDiv.innerHTML = '';
    for (let r = 0; r < ROWS; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        for (let c = 0; c < COLS; c++) {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            if (board[r][c].open) cellDiv.classList.add('open');
            if (board[r][c].flag) cellDiv.classList.add('flag');
            cellDiv.dataset.row = r;
            cellDiv.dataset.col = c;

            if (board[r][c].open) {
                if (mineMap[r][c] === 1) {
                    cellDiv.classList.add('mine');
                    cellDiv.textContent = '💣';
                } else {
                    let count = countMines(r, c);
                    cellDiv.textContent = count > 0 ? count : '';
                }
            } else if (board[r][c].flag) {
                cellDiv.textContent = '🚩';
            }

            cellDiv.oncontextmenu = (e) => {
                e.preventDefault();
                if (gameOver || board[r][c].open) return;
                board[r][c].flag = !board[r][c].flag;
                flagCount += board[r][c].flag ? 1 : -1;
                flagCountSpan.textContent = flagCount;
                renderBoard();
            };

            cellDiv.onclick = () => {
                if (gameOver || board[r][c].open || board[r][c].flag) return;
                openCell(r, c);
            };

            rowDiv.appendChild(cellDiv);
        }
        boardDiv.appendChild(rowDiv);
    }
}

function countMines(r, c) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            let nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                if (mineMap[nr][nc] === 1) count++;
            }
        }
    }
    return count;
}

function openCell(r, c) {
    if (board[r][c].open || board[r][c].flag) return;
    board[r][c].open = true;
    if (mineMap[r][c] === 1) {
        gameOver = true;
        revealAll();
        alert('游戏结束！你踩到地雷了！');
        return;
    }
    let count = countMines(r, c);
    if (count === 0) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                let nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                    if (!board[nr][nc].open) openCell(nr, nc);
                }
            }
        }
    }
    checkWin();
    renderBoard();
}

function revealAll() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            board[r][c].open = true;
        }
    }
    renderBoard();
}

function checkWin() {
    let opened = 0;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c].open) opened++;
        }
    }
    if (opened === ROWS * COLS - MINES) {
        gameOver = true;
        revealAll();
        alert('恭喜你，胜利了！');
    }
}

restartBtn.onclick = initGame;

initGame();