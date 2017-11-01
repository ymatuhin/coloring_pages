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
    // window.addEventListener('resize', this.onResize.bind(this), false);
  }

  // onResize() {
  // this.stretchCanvas();
  // }

  onCanvasClick({ layerX, layerY }) {
    const params = {
      x: layerX,
      y: layerY,
      color: [
        150 + Math.random() * 100,
        150 + Math.random() * 100,
        150 + Math.random() * 100,
      ],
    };
    this.fillArea(params);
  }

  fillArea({ x, y, color }) {
    const filled = {};
    const imageW = this.image.width;
    const imageH = this.image.height;
    const imageData = this.ctx.getImageData(0, 0, imageW, imageH);

    const stack = [[x, y]];

    while (stack.length > 0) {
      const [localX, localY] = stack.pop();
      if (localX < 0 || localY < 0) continue;
      if (localX > imageW || localY > imageH) continue;
      if (filled[`${localX}:${localY}`]) continue;

      const pixel = new Pixel({
        x: localX,
        y: localY,
        image: imageData,
        sensitivity: this.sensitivity,
      });
      if (pixel.isBlack() || pixel.isTransparent()) continue;
      pixel.fill(color, this.originalImageData);

      filled[`${localX}:${localY}`] = true;

      stack.push([localX - 1, localY]);
      stack.push([localX + 1, localY]);
      stack.push([localX, localY - 1]);
      stack.push([localX, localY + 1]);
    }

    this.ctx.putImageData(imageData, 0, 0);
  }
}

export default App;
