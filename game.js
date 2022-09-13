function startGame() {
    let canvas = document.getElementById("game");
    let context = canvas.getContext("2d");
    let x = 20, y = 20;
    let dx = 3, dy = 3;
    // Khai báo phần tử Bricks
    let offsetx = 25,
        offsety = 25,
        magin = 25,
        wbricks = 70,
        hbricks = 15,
        totalRow = 6,
        totalCol = 8;

    let Brickslist = [];

    for (let i = 0; i < totalRow; i++) {
        for (let j = 0; j < totalCol; j++) {
            Brickslist.push({
                Bx: offsetx + j * (wbricks + magin),
                By: offsety + i * (hbricks + magin),
                isBroken: false

            });
        };
    };
    //Khai báo sự kiện nhập vào từ bàn phím
    //Kiểm tra sự kiện
    document.addEventListener("keyup", function (event) {
        console.log("KEY UP");
        console.log(event);
        if (event.keyCode == 37) {
            isMovingLeft = false;
        } else if (event.keyCode == 39) {
            isMovingRight = false;
        }
    });
    document.addEventListener("keydown", function (event) {
        console.log("KEY DOWN");
        console.log(event);
        if (event.keyCode == 37) {
            isMovingLeft = true;
        } else if (event.keyCode == 39) {
            isMovingRight = true;
        }
    });

    //Ball
    function drawBall() {
        context.beginPath();
        context.arc(x, y, 20, 0, Math.PI * 2);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }
    drawBall();
    //Paddle
    let xPosition = 0;
    let yPosition = canvas.height - 20;
    let width = 80;
    let height = 10;
    let speed = 10;
    let isMovingLeft = false;
    let isMovingRight = false;

    function drawPaddle() {
        context.beginPath();
        context.rect(xPosition, yPosition, width, height);
        context.fillStyle = " Red ";
        context.fill();
        context.closePath();
    }
    //Vẽ Bricks
    function drawBricks() {
        Brickslist.forEach(function (b) {
            if (!b.isBroken) {
                context.beginPath();
                context.rect(b.Bx, b.By, wbricks, hbricks);
                context.fill();
                context.closePath();
            }
        });
    }
    //Hàm điểu kiện di chuyển của bóng
    let ballWidth = 800, ballheight = 600;
    let radius = 20;
    function handleBallCollieBounds() {
        if (x < radius || x > ballWidth - radius) {
            dx = -dx;
        };
        if (y < radius) {
            dy = -dy;
        }
    }
    // Điều kiện va chạm và xử lý va chạm
    let maxheight = canvas.height;
    function handleBallCollidePaddle() {
        if (x + radius >= xPosition && x + radius <= xPosition + width && y + radius >= maxheight - height) {
            dy = -dy;
        }
    }
    //Câu lệnh khi Ball va chạm vào Bricks
    function handleBallCollideBricks() {
        Brickslist.forEach(function (b) {
            if (!b.isBroken) {
                if (x >= b.Bx && x <= b.Bx + wbricks && y + radius >= b.By && y - radius <= b.By + hbricks) {
                    dy = -dy;
                    b.isBroken = true;
                    userCore += 1;
                    if (userCore >= maxCore) {
                        isGameOver = true;
                        isGameWin = true;
                    }
                };
                document.getElementById("core").innerText = " " + userCore + ""

            };
        });
    }
    // Vị trí chuyển hướng của bóng
    function updateBallPosition() {
        x += dx;
        y += dy;
    }
    //Điều kiện để Paddle chuyển hướng
    function updatePaddlePosition() {
        if (isMovingLeft) {
            xPosition -= speed;
        } else if (isMovingRight) {
            xPosition += speed;
        }
        if (xPosition < 0) {
            xPosition = 0;
        } else if (xPosition > canvas.width - width) {
            xPosition = canvas.width - width;
        }
    }
    //Check game
    function checkGameOver() {
        if (y > ballheight - radius) {
            isGameOver = true;
        }
    }
    //In ra màn hình nếu thua
    function handleGameOver() {
        if (isGameWin) {
            context.font = "30px Arial";
            context.fillText("YOU WIN", 50, 50);
        } else {
            context.font = "30px Arial";
            context.fillText("YOU LOSE", 50, 50);
        }
    }
    // Kiểm tra điều kiện game
    let isGameOver = false;
    let isGameWin = false;
    let userCore = 0;
    let maxCore = totalCol * totalRow;
    function draw() {
        if (!isGameOver) {

            context.clearRect(0, 0, ballWidth, ballheight);
            drawBall();
            drawPaddle();
            drawBricks();

            handleBallCollieBounds();
            handleBallCollidePaddle();
            handleBallCollideBricks();

            updateBallPosition();
            updatePaddlePosition()

            checkGameOver()

            requestAnimationFrame(draw);
        } else {
            handleGameOver();
        }
    }
    draw();
};