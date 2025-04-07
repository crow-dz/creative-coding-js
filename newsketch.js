const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const settings = {
  dimensions: [1080, 1080],
  animate: true,


};


const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#EBC222';

    const x = width * .5;
    const y = height * .5;
    const h = height * .1;
    const w = width * .01;
    const radius = width * 0.5;
    const num = 12;

    for (let i = 0; i < num; i++) {
      const slice = degToRad(360 / num);
      const angel = slice * i;
      context.save();
      // making 0,0 in center of canvas
      context.translate(x, y);
      // rotate all canvas
      context.rotate(angel);
      context.scale(random.range(0.5, 1), random.range(0.8, 0.9))
      context.translate(0, -radius);
      context.beginPath();
      context.rect(w * 0.5, h * 0.5, w, h);
      context.fill();
      context.restore();
      context.save();
      // making 0,0 in center of canvas
      context.translate(x, y);
      // rotate all canvas
      context.rotate(angel);
      context.strokeStyle = '#EBC222';
      context.lineWidth = random.range(5, 15);
      context.beginPath();
      context.arc(0, 0, radius * random.range(.4, .8), radius * random.range(2, 5), slice * random.range(1, 5));
      context.stroke();
      context.restore();
    }


  };
};

canvasSketch(sketch, settings);
