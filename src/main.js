import { htmlMarkup, messages } from './config.js';
import loadImage from './loadImage.js';
import syncCanvasSize from './syncCanvasSizes.js';
import drawImageOnCenter from './drawImageOnCenter.js';
import Pixel from './pixel.js';

class App {
  constructor(config = {}) {
    if (!config.el) throw new Error(messages.noEl);
    if (!config.outlineImage) throw new Error(messages.noOutline);
    if (
      config.sensitivity &&
      (config.sensitivity < 0 || config.sensitivity > 100)
    )
      throw new Error(messages.rangeSensitivity);

    this.stretchCanvas = () => syncCanvasSize(this.image, this.canvas);
    this.fitImage = () => drawImageOnCenter(this.image, this.ctx);

    this.variables(config);
  }

  async variables(config) {
    this.sensitivity = config.sensitivity || 30;
    console.info(`# this.sensitivity`, this.sensitivity);
    this.el = document.querySelector(config.el);
    this.el.innerHTML = htmlMarkup;
    this.image = await loadImage(config.outlineImage);
    this.canvas = document.querySelector('canvas.coloring-book');
    this.ctx = this.canvas.getContext('2d');

    this.init();
  }

  init(config) {
    this.stretchCanvas();
    this.fitImage();
    this.originalImageData = this.ctx.getImageData(
      0,
      0,
      this.image.width,
      this.image.height,
    );

    this.canvas.addEventListener('click', this.onCanvasClick.bind(this), false);
  }

  onCanvasClick({ layerX, layerY }) {
    const color = {
      r: 100 + Math.random() * 150,
      g: 100 + Math.random() * 150,
      b: 100 + Math.random() * 150,
    };
    console.time('fill');
    this.fillArea(layerX, layerY, color);
    console.timeEnd('fill');
  }

  fillArea(startX, startY, color) {
    const filled = {};
    const imageWidth = this.image.width;
    const imageHeight = this.image.height;
    const imageData = this.ctx.getImageData(0, 0, imageWidth, imageHeight);

    const stack = [{ x: startX, y: startY }];
    while (stack.length > 0) {
      const { x, y } = stack.pop();
      if (x < 0) continue;
      if (y < 0) continue;
      if (x > imageWidth) continue;
      if (y > imageHeight) continue;

      const filledIndex = x + ':' + y;
      if (filled[filledIndex]) continue;

      const pixel = new Pixel({
        x,
        y,
        imageWidth,
        imageData,
        sensitivity: this.sensitivity,
      });
      if (pixel.isBlack() || pixel.isTransparent()) continue;
      pixel.fill(color, this.originalImageData);

      filled[filledIndex] = true;

      stack.push({ x: x - 1, y: y });
      stack.push({ x: x + 1, y: y });
      stack.push({ x: x, y: y - 1 });
      stack.push({ x: x, y: y + 1 });
    }

    this.ctx.putImageData(imageData, 0, 0);
  }
}

export default App;
