document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");
    const leftPaddle = document.getElementById("leftPaddle");
    const rightPaddle = document.getElementById("rightPaddle");

    let ballX = 300;
    let ballY = 200;
    let ballSpeedX = 5;
    let ballSpeedY = 5;
    let gameIsRunning = false;
    let level = 1;

    function updateGameArea() {
        if (gameIsRunning) {
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            if (ballY < 0 || ballY > 380) {
                ballSpeedY = -ballSpeedY;
            }

            if (
                (ballX < 20 && ballX > 10 && ballY > getPosition(leftPaddle) && ballY < getPosition(leftPaddle) + 80) ||
                (ballX > 570 && ballX < 580 && ballY > getPosition(rightPaddle) && ballY < getPosition(rightPaddle) + 80)
            ) {
                ballSpeedX = -ballSpeedX;
            }

            if (ballX < 0 || ballX > 580) {
                ballSpeedX = -ballSpeedX;
            }


            window.addEventListener("keydown", function (event) {
                if (event.key === "ArrowUp" && getPosition(rightPaddle) > 0) {
                    rightPaddle.style.top = getPosition(rightPaddle) - 10 + "px";
                }

                if (event.key === "ArrowDown" && getPosition(rightPaddle) < 320) {
                    rightPaddle.style.top = getPosition(rightPaddle) + 10 + "px";
                }

                if (event.key === "ArrowLeft" && getPosition(leftPaddle) > 0) {
                    leftPaddle.style.top = getPosition(leftPaddle) - 10 + "px";
                }

                if (event.key === "ArrowRight" && getPosition(leftPaddle) < 320) {
                    leftPaddle.style.top = getPosition(leftPaddle) + 10 + "px";
                }
            });

            ball.style.left = ballX + "px";
            ball.style.top = ballY + "px";

            requestAnimationFrame(updateGameArea);
        }
    }

    function getPosition(element) {
        return parseInt(window.getComputedStyle(element).getPropertyValue("top"));
    }

    function startGame() {
        gameIsRunning = true;
        updateGameArea();
    }

    function stopGame() {
        gameIsRunning = false;
    }

    function pauseGame() {
        gameIsRunning = !gameIsRunning;
        if (gameIsRunning) {
            updateGameArea();
        }
    }

    function increaseLevel() {
        level++;
    }

    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("stopButton").addEventListener("click", stopGame);
    document.getElementById("pauseButton").addEventListener("click", pauseGame);
    document.getElementById("levelUpButton").addEventListener("click", increaseLevel);
});
