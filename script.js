document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid-container');
    const cells = [];

    function init() {
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            grid.appendChild(cell);
            cells.push(cell);
        }
        addRandomTile();
        addRandomTile();
    }

    function addRandomTile() {
        const emptyCells = cells.filter(cell => cell.innerHTML === '');
        if (emptyCells.length) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            randomCell.innerHTML = Math.random() < 0.9 ? 2 : 4;
        }
    }

    function handleKeyPress(e) {
        const key = e.key;
        let moved = false;

        if (key === 'ArrowUp') {
            // 处理向上移动
        } else if (key === 'ArrowDown') {
            // 处理向下移动
        } else if (key === 'ArrowLeft') {
            // 处理向左移动
        } else if (key === 'ArrowRight') {
            // 处理向右移动
        }

        if (moved) {
            addRandomTile();
        }
    }

    document.addEventListener('keydown', handleKeyPress);

    init();
});
