document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    const resultScreen = document.getElementById('resultScreen');
    const resultContent = document.getElementById('resultContent');
    const resultText = document.getElementById('resultText');
    const playAgainBtn = document.getElementById('playAgainBtn');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
  
      return null;
    };
  
    const showResultScreen = (result) => {
      resultText.textContent = result === 'draw' ? 'It\'s a draw!' : `Player ${result} wins!`;
      resultScreen.style.display = 'flex';
    };
  
    const handleCellClick = (index) => {
      if (gameBoard[index] || !gameActive) return;
  
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
  
      const winner = checkWinner();
      if (winner) {
        message.textContent = '';
        showResultScreen(winner);
        gameActive = false;
      } else if (!gameBoard.includes('')) {
        message.textContent = '';
        showResultScreen('draw');
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
      }
    };
  
    const handleResetClick = () => {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
  
      cells.forEach(cell => {
        cell.textContent = '';
      });
  
      message.textContent = 'Player X\'s turn';
      resultScreen.style.display = 'none';
    };
  
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => handleCellClick(index));
    });
  
    resetBtn.addEventListener('click', handleResetClick);
  
    playAgainBtn.addEventListener('click', () => {
      resultScreen.style.display = 'none';
      handleResetClick();
    });
  });
  