const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');


const settings = {
  dimensions: [1048, 1048],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const draws = [];
  for (let i = 0; i < 30; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    draws.push(new Agent(x, y));
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < draws.length; i++) {
      const draw = draws[i];

      for (let j = i + 1; j < draws.length; j++) {
        const other = draws[j];
        const dis = getDistance(draw.pos, other.pos);
        if (dis > 200) continue;
        context.lineWidth = math.mapRange(dis, 0, 200, 12, 1);
        context.beginPath();
        context.moveTo(draw.pos.x, draw.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }
    draws.forEach(agent => {
      agent.update();
      agent.draw(context);
    });

  };
};
// Check distance using pythagorean theorem
function getDistance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy)

}
canvasSketch(sketch, settings);
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

}
class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(5, 10);
  }
  update() {
    this.pos.x += this.pos.x >= 1044 || this.pos.x <= 4 ? this.vel.x *= -1 : this.vel.x;
    this.pos.y += this.pos.y >= 1044 || this.pos.y <= 4 ? this.vel.y *= -1 : this.vel.y;
  }
  draw(context) {
    context.lineWidth = 4;
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fill();
    context.restore();
  }
}