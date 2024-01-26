document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const scoreValue = document.getElementById('scoreValue');
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const endScreen = document.getElementById('endScreen');
    const endMessage = document.getElementById('endMessage');
    const newGameButton = document.getElementById('newGameButton');
  
    const gridSize = 20;
    const snakeSpeed = 150; 
    const initialSnakeLength = 3;
  
    let snake = [{ row: 0, col: 0 }];
    let direction = 'right';
    let food = getRandomFoodPosition();
    let isGameOver = false;
    let isGamePaused = false;
    let gameInterval;
  
    function getRandomFoodPosition() {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      return { row, col };
    }
  
    function draw() {
      gameBoard.innerHTML = '';
  
      
      snake.forEach(segment => {
        const cell = document.createElement('div');
        cell.className = 'snake';
        cell.style.gridColumnStart = segment.col + 1;
        cell.style.gridRowStart = segment.row + 1;
        gameBoard.appendChild(cell);
      });
  
      
      const foodCell = document.createElement('div');
      foodCell.className = 'food';
      foodCell.style.gridColumnStart = food.col + 1;
      foodCell.style.gridRowStart = food.row + 1;
      gameBoard.appendChild(foodCell);
    }
  
    function move() {
      if (isGamePaused || isGameOver) return;
  
      const head = Object.assign({}, snake[0]);
  
      switch (direction) {
        case 'up':
          head.row -= 1;
          break;
        case 'down':
          head.row += 1;
          break;
        case 'left':
          head.col -= 1;
          break;
        case 'right':
          head.col += 1;
          break;
      }
  
      
      if (head.row < 0 || head.row >= gridSize || head.col < 0 || head.col >= gridSize || isCollisionWithItself(head)) {
        endGame();
        return;
      }
  
      
      if (head.row === food.row && head.col === food.col) {
        snake.unshift(food);
        food = getRandomFoodPosition();
        updateScore();
      } else {
        
        snake.unshift(head);
        snake.pop();
      }
  
      draw();
    }
  
    function isCollisionWithItself(head) {
      return snake.slice(1).some(segment => segment.row === head.row && segment.col === head.col);
    }
  
    function updateScore() {
      scoreValue.textContent = snake.length - initialSnakeLength;
    }
  
    function startGame() {
      if (!gameInterval) {
        resetGame();
        gameInterval = setInterval(move, snakeSpeed);
      }
    }
  
    function resetGame() {
      snake = [{ row: 0, col: 0 }];
      direction = 'right';
      food = getRandomFoodPosition();
      isGameOver = false;
      isGamePaused = false;
      updateScore();
    }
  
    function endGame() {
      isGameOver = true;
      clearInterval(gameInterval);
      gameInterval = null;
      showEndScreen();
    }
  
    function showEndScreen() {
      endMessage.textContent = isGameOver ? 'Game Over' : 'You Win!';
      endScreen.style.display = 'flex';
    }
  
    function newGame() {
      endScreen.style.display = 'none';
      startGame();
    }
  
    function togglePause() {
      isGamePaused = !isGamePaused;
      if (isGamePaused) {
        clearInterval(gameInterval);
      } else {
        gameInterval = setInterval(move, snakeSpeed);
      }
    }
  
    document.addEventListener('keydown', (event) => {
      if (event.key.startsWith('Arrow')) {
        const newDirection = event.key.toLowerCase().replace('arrow', '');
        
        if ((newDirection === 'up' && direction !== 'down') ||
            (newDirection === 'down' && direction !== 'up') ||
            (newDirection === 'left' && direction !== 'right') ||
            (newDirection === 'right' && direction !== 'left')) {
          direction = newDirection;
        }
      }
    });
  
    startButton.addEventListener('click', () => {
      startGame();
    });
  
    newGameButton.addEventListener('click', () => {
      newGame();
    });
  
    pauseButton.addEventListener('click', () => {
      togglePause();
    });
  
    draw();
  });
  