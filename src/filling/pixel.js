import {
  findRedIndex,
  generateIndexes,
  makeRgba,
  getBrightness,
  shadeRGBColor,
} from './pixel.helpers.js';

export default class Pixel {
  constructor({ x, y, imageData, imageWidth, sensitivity }) {
    const redIndex = findRedIndex(x, y, imageWidth);
    this.indexes = generateIndexes(redIndex);
    this.rgba = makeRgba(imageData.data, this.indexes);

    this.sensitivity = sensitivity;
    this.image = imageData;
    this.minTransparent = 50; // 0 — 255
  }

  isBlack() {
    return getBrightness(this.rgba) < this.sensitivity;
  }

  isTransparent() {
    return this.rgba.a < this.minTransparent;
  }

  fill(color, originalImageData) {
    const originalRgba = makeRgba(originalImageData.data, this.indexes);
    const originalBrightness = getBrightness(originalRgba);
    const newColorBrightness = getBrightness(color);

    const diff = (newColorBrightness - originalBrightness) / 100 * -1;
    const { r, g, b } = shadeRGBColor(color, diff);

    this.rgba.r = r;
    this.rgba.g = g;
    this.rgba.b = b;

    this.apply();
  }

  apply() {
    this.image.data[this.indexes.r] = this.rgba.r;
    this.image.data[this.indexes.g] = this.rgba.g;
    this.image.data[this.indexes.b] = this.rgba.b;
    this.image.data[this.indexes.a] = this.rgba.a;
  }
}
