const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [600, 600]
};

const sketch = () => {
  return ({ context, width, height }) => {
    let playGround = document.querySelector('canvas');
    context = playGround.getContext('2d');
    let x = 100;
    let y = 100;
    let w = width * .10;
    let h = height * .10;
    let colorfill = ['red', 'green', 'blue', 'yellow', 'purple'];
    context.fillStyle = "black";
    context .fillRect(0,0,width, height);
    context.fill();
    for (let j = 0; j < 5; j++) {
      for (let z = 0; z < 5; z++) {
        context.lineWidth = 4;
        context.beginPath();
        context.strokeStyle = "white";
        context.rect(x, y, h, w);
        context.stroke();
        context.closePath;
        if (Math.random() > 0.5) {
          context.beginPath();
          context.strokeStyle = colorfill[Math.floor(Math.random() * 5)];
          context.rect(x + 8, y + 8, h - 16, w - 16);
          context.stroke();
          context.closePath();
        }
        x += 80;
      }
      x = 100;
      y += 80;
    }
  };
};

canvasSketch(sketch, settings);
