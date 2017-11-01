import {
  findRedIndex,
  makeIndexesArray,
  makeRgba,
  getBrightness,
  shadeRGBColor,
} from './pixel.helpers.js';

export default class Pixel {
  constructor({ x, y, image, sensitivity }) {
    const redIndex = findRedIndex(x, y, image.width);
    this.sensitivity = sensitivity;
    this.image = image;
    this.indexes = makeIndexesArray(redIndex);
    this.make;
    this.rgba = makeRgba(this.image.data, this.indexes);

    this.minTransparent = 50; // 0 — 255
  }

  isBlack() {
    return getBrightness(this.rgba) < this.sensitivity;
  }

  fill(color, originalImageData) {
    const originalRgba = makeRgba(originalImageData.data, this.indexes);
    const originalBrightness = getBrightness(originalRgba);
    const newColorBrightness = getBrightness(color);

    const diff = (newColorBrightness - originalBrightness) / 100 * -1;
    const newColor = shadeRGBColor(color, diff);

    this.rgba[0] = newColor[0];
    this.rgba[1] = newColor[1];
    this.rgba[2] = newColor[2];
    this.apply();
  }

  isTransparent() {
    return this.rgba[4] < this.minTransparent;
  }

  apply() {
    this.image.data[this.indexes[0]] = this.rgba[0];
    this.image.data[this.indexes[1]] = this.rgba[1];
    this.image.data[this.indexes[2]] = this.rgba[2];
    this.image.data[this.indexes[3]] = this.rgba[3];
  }
}
