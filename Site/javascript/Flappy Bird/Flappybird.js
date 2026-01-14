const canvas = document.getElementById("Screen");
const ctx = canvas.getContext("2d");

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
  Pipes: [],
  spacing: 500,
}

for (let i = 0; i < Pipe.maxPipes; i++) {
  Pipe.Pipes.push({
    x: box.x + canvas.width + i * Pipe.spacing,
    gapY: 50 + Math.random() * (box.height - Pipe.gapHeight - 50),
  });
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(box.x, box.y, box.width, box.height);
  ctx.fillStyle = "lightblue";
  ctx.fillRect(box.x, box.y, box.width, box.height);
}

function drawPipe() {
  ctx.fillStyle = "green";

  for (let p of Pipe.Pipes) {
    ctx.fillRect(p.x, box.y, Pipe.pipeWidth, p.gapY);
    ctx.fillRect(p.x, p.gapY + Pipe.gapHeight, Pipe.pipeWidth, box.y + box.height - (p.gapY + Pipe.gapHeight));

    p.x -= Pipe.speed;

    if (p.x + Pipe.pipeWidth < box.x) {
      p.x = box.x + box.width;
      p.gapY = 250 + Math.random() * (250 - 400);
    }
  }
}

function gameloop() {
  drawBackground();
  drawPipe();
  requestAnimationFrame(gameloop);
}

gameloop();
