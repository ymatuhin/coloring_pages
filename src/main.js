import { htmlMarkup, messages } from './config.js';
import loadImage from './loadImage.js';
import syncCanvasSize from './syncCanvasSizes.js';
import drawImageOnCenter from './drawImageOnCenter.js';
import gpuCalculate from './gpuCalculate.js';

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
    // const color = {
    //   r: 180 + Math.round(Math.random() * 75),
    //   g: 180 + Math.round(Math.random() * 75),
    //   b: 180 + Math.round(Math.random() * 75),
    // };
    const color = { r: 255, g: 200, b: 250 };

    console.time('fill');
    this.fillArea(layerX, layerY, color);
    console.timeEnd('fill');
  }

  fillArea(startX, startY, color) {
    const imageW = this.image.width;
    const imageH = this.image.height;
    const imageData = this.ctx.getImageData(0, 0, imageW, imageH);

    gpuCalculate({
      originalImageDataData: this.originalImageData.data,
      sensitivity: this.sensitivity,
      ctx: this.ctx,
      startX,
      startY,
      color,
      imageData,
      imageW,
      imageH,
    });

    this.ctx.putImageData(imageData, 0, 0);
  }
}

export default App;
