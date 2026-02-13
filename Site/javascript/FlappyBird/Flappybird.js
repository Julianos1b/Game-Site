const canvas = document.getElementById("Screen");
const ctx = canvas.getContext("2d");

const birdImg = new Image();
birdImg.src = "/Site/assets/Flappybird/NicePng_flappy-bird-png_1515288.png";

const box = {
  x: 10,
  y: 10,
  width: canvas.width - 20,
  height: canvas.height - 20,
};

const Pipe = {
  pipeWidth: 100,
  gapHeight: 250,
  maxPipes: 4,
  speed: 4,
  spacing: 500,
  Pipes: [],
};

for (let i = 0; i < Pipe.maxPipes; i++) {
  Pipe.Pipes.push({
    x: box.x + box.width + i * Pipe.spacing,
    gapY: box.y + 50 + Math.random() * (box.height - Pipe.gapHeight - 100),
  });
}

const Bird = {
  width: 50,
  height: 50,
  x: 200,
  y: 200,
  velocityY: 0,
  gravity: 0.1,
  flapStrength: -3,
};

let running = true;

function rectsCollide(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function gameOver() {
  running = false;
  console.log("GAME OVER");
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "lightblue";
  ctx.fillRect(box.x, box.y, box.width, box.height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(box.x, box.y, box.width, box.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  for (let p of Pipe.Pipes) {
    ctx.fillRect(p.x, box.y, Pipe.pipeWidth, p.gapY - box.y);
    ctx.fillRect(
      p.x,
      p.gapY + Pipe.gapHeight,
      Pipe.pipeWidth,
      box.y + box.height - (p.gapY + Pipe.gapHeight)
    );
    p.x -= Pipe.speed;
    if (p.x + Pipe.pipeWidth < box.x) {
      p.x = box.x + box.width;
      p.gapY = box.y + 50 + Math.random() * (box.height - Pipe.gapHeight - 100);
    }
  }
}

function drawBird() {
  ctx.fillStyle = "orange";
  ctx.drawImage(birdImg, Bird.x, Bird.y, Bird.width, Bird.height);
  Bird.velocityY += Bird.gravity / 2;
  Bird.y += Bird.velocityY;
  if (Bird.y + Bird.height > box.y + box.height) {
    Bird.y = box.y + box.height - Bird.height - 1;
  }
  if (Bird.y < box.y) {
    Bird.y = box.y;
    Bird.velocityY = 0;
  }
}

function checkPipeCollision() {
  const birdRect = {
    x: Bird.x,
    y: Bird.y,
    width: Bird.width,
    height: Bird.height,
  };
  for (let p of Pipe.Pipes) {
    const topPipe = {
      x: p.x,
      y: box.y,
      width: Pipe.pipeWidth,
      height: p.gapY - box.y,
    };
    const bottomPipe = {
      x: p.x,
      y: p.gapY + Pipe.gapHeight,
      width: Pipe.pipeWidth,
      height: box.y + box.height - (p.gapY + Pipe.gapHeight),
    };

    if (rectsCollide(birdRect, topPipe) || rectsCollide(birdRect, bottomPipe)) {
      gameOver();
      return;
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && running) {
    Bird.velocityY = Bird.flapStrength;
    e.preventDefault();
  }
});

function gameloop() {
  if (!running) return;

  drawBackground();
  drawPipes();
  drawBird();
  checkPipeCollision();

  requestAnimationFrame(gameloop);
}

gameloop();
