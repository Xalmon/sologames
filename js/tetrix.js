document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const scoreValue = document.getElementById('scoreValue');
    const startButton = document.getElementById('startButton');
    const endScreen = document.getElementById('endScreen');
    const endMessage = document.getElementById('endMessage');
    const newGameButton = document.getElementById('newGameButton');
  
    const gridSize = 10;
    const tetrisSpeed = 500; 
    const blockColors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#e67e22'];
  
    let board = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
    let currentBlock = getRandomBlock();
    let currentBlockPosition = { row: 0, col: Math.floor(gridSize / 2) - Math.floor(currentBlock[0].length / 2) };
    let score = 0;
    let gameInterval;
  
    function getRandomBlock() {
      const blocks = [
        [[1, 1, 1, 1]],
        [[1, 1], [1, 1]],
        [[1, 1, 1], [0, 1, 0]],
        [[1, 1, 1], [1, 0, 0]],
        [[1, 1, 1], [0, 0, 1]],
      ];
      const randomIndex = Math.floor(Math.random() * blocks.length);
      return blocks[randomIndex];
    }
  
    function draw() {
      gameBoard.innerHTML = '';
  

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const cell = document.createElement('div');
          cell.style.backgroundColor = board[row][col] || '#fff';
          gameBoard.appendChild(cell);
        }
      }

      currentBlock.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (value === 1) {
            const cell = document.createElement('div');
            cell.style.backgroundColor = blockColors[currentBlock.length % blockColors.length];
            cell.style.gridColumnStart = colIndex + currentBlockPosition.col + 1;
            cell.style.gridRowStart = rowIndex + currentBlockPosition.row + 1;
            gameBoard.appendChild(cell);
          }
        });
      });
    }
  
    function moveBlock() {
      const newBlockPosition = {
        row: currentBlockPosition.row + 1,
        col: currentBlockPosition.col,
      };
  
      if (isValidMove(newBlockPosition)) {
        currentBlockPosition = newBlockPosition;
      } else {
        mergeBlock();
        clearLines();
        currentBlock = getRandomBlock();
        currentBlockPosition = { row: 0, col: Math.floor(gridSize / 2) - Math.floor(currentBlock[0].length / 2) };
      }
  
      draw();
    }
  
    function isValidMove(position) {
      return position.row + currentBlock.length <= gridSize &&
             position.col >= 0 &&
             position.col + currentBlock[0].length <= gridSize &&
             !hasCollision(position);
    }
  
    function hasCollision(position) {
      return currentBlock.some((row, rowIndex) =>
        row.some((value, colIndex) =>
          value === 1 &&
          (board[position.row + rowIndex] && board[position.row + rowIndex][position.col + colIndex]) !== undefined
        )
      );
    }
  
    function mergeBlock() {
      currentBlock.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (value === 1) {
            board[currentBlockPosition.row + rowIndex][currentBlockPosition.col + colIndex] = blockColors[currentBlock.length % blockColors.length];
          }
        });
      });
    }
  
    function clearLines() {
      for (let row = gridSize - 1; row >= 0; row--) {
        if (board[row].every(cell => cell !== null)) {
          score += 10;
          scoreValue.textContent = score;
          board.splice(row, 1);
          board.unshift(Array(gridSize).fill(null));
        }
      }
    }
  
    function handleKeyDown(event) {
      switch (event.key) {
        case 'ArrowUp':
          rotateBlock();
          break;
        case 'ArrowDown':
          moveBlock();
          break;
        case 'ArrowLeft':
          moveSideways(-1);
          break;
        case 'ArrowRight':
          moveSideways(1);
          break;
      }
    }
  
    function rotateBlock() {
      const rotatedBlock = transpose(currentBlock).map(row => row.reverse());
      if (isValidMove(currentBlockPosition, rotatedBlock)) {
        currentBlock = rotatedBlock;
      }
    }
  
    function moveSideways(direction) {
      const newBlockPosition = {
        row: currentBlockPosition.row,
        col: currentBlockPosition.col + direction,
      };
  
      if (isValidMove(newBlockPosition)) {
        currentBlockPosition = newBlockPosition;
        draw();
      }
    }
  
    function transpose(matrix) {
      return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }
  
    function startGame() {
      if (!gameInterval) {
        gameInterval = setInterval(moveBlock, tetrisSpeed);
      }
    }
  
    function stopGame() {
      clearInterval(gameInterval);
      gameInterval = null;
    }
  
    function endGame(message) {
      stopGame();
      endMessage.textContent = message;
      endScreen.style.display = 'flex';
    }
  
    function newGame() {
      endScreen.style.display = 'none';
      score = 0;
      scoreValue.textContent = score;
      board = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));
      currentBlock = getRandomBlock();
      currentBlockPosition = { row: 0, col: Math.floor(gridSize / 2) - Math.floor(currentBlock[0].length / 2) };
      draw();
      startGame();
    }
  
    startButton.addEventListener('click', () => {
      newGame();
    });
  
    newGameButton.addEventListener('click', () => {
      newGame();
    });
  
    document.addEventListener('keydown', handleKeyDown);
  
    draw();
  });
  