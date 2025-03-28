const canvasSketch = require('canvas-sketch');
const { random } = require('canvas-sketch-util');

const settings = {
  dimensions: [1048, 1048]
};



const sketch = ({ context, width, height }) => {

  const draws = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    draws.push(new Agent(x, y));

  }


  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    draws.forEach(element => {
      element.draw(context);
    });

  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;

  }
}
class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y)
    this.radius = 10;
  }
  draw(context) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "black";
    context.fill();
  }
}