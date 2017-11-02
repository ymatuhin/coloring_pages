// 0 – 100
const getBrightness = ({ r, g, b }) =>
  (r * 299 + g * 587 + b * 114) / 1000 / 255 * 100;

const getRgb = (dataData, pixelPos) => {
  var r = dataData[pixelPos];
  var g = dataData[pixelPos + 1];
  var b = dataData[pixelPos + 2];

  return { r, g, b };
};

const mixColor = (color1, color2) => {
  return {
    r: Math.round((color1.r + color2.r) / 2),
    g: Math.round((color1.g + color2.g) / 2),
    b: Math.round((color1.b + color2.b) / 2),
  };
};

export default ({
  startX,
  startY,
  originalImageDataData,
  sensitivity,
  color,
  imageData,
  imageW,
  imageH,
}) => {
  const stack = [{ x: startX, y: startY }];
  const newColorBrightness = getBrightness(color);

  const colorPixel = pixelPos => {
    let newColor = color;
    const originalRgb = getRgb(originalImageDataData, pixelPos);
    const originalBrightness = getBrightness(originalRgb);

    if (originalBrightness < newColorBrightness) {
      newColor = mixColor(color, originalRgb);
    }

    imageData.data[pixelPos] = newColor.r;
    imageData.data[pixelPos + 1] = newColor.g;
    imageData.data[pixelPos + 2] = newColor.b;
  };

  const availiblePixel = pixelPos => {
    const originalRgb = getRgb(originalImageDataData, pixelPos);
    const pixelRgb = getRgb(imageData.data, pixelPos);
    const black = getBrightness(pixelRgb) <= sensitivity;
    const currentColor =
      color.r === pixelRgb.r &&
      color.g === pixelRgb.g &&
      color.b === pixelRgb.b;

    const mixedRgb = mixColor(color, originalRgb);
    const mixedColor =
      pixelRgb.r === mixedRgb.r &&
      pixelRgb.g === mixedRgb.g &&
      pixelRgb.b === mixedRgb.b;

    // console.info(
    //   `# colors`,
    //   pixelRgb.r,
    //   pixelRgb.g,
    //   pixelRgb.b,
    //   ' # ',
    //   mixedRgb.r,
    //   mixedRgb.g,
    //   mixedRgb.b,
    // );
    // console.info(`# mixedColor`, mixedColor);

    return !currentColor && !black && !mixedColor;
  };

  while (stack.length) {
    let { x, y } = stack.pop();
    let pixelPos = (y * imageW + x) * 4;
    let reachLeft = false;
    let reachRight = false;

    while (--y >= 0 && availiblePixel(pixelPos)) {
      pixelPos -= imageW * 4;
    }
    pixelPos += imageW * 4;
    ++y;

    while (y++ < imageH - 1 && availiblePixel(pixelPos)) {
      colorPixel(pixelPos);

      if (x > 0) {
        if (availiblePixel(pixelPos - 4)) {
          if (!reachLeft) {
            stack.push({ x: x - 1, y });
            reachLeft = true;
          }
        } else if (reachLeft) {
          reachLeft = false;
        }
      }

      if (x <= imageW) {
        if (availiblePixel(pixelPos + 4)) {
          if (!reachRight) {
            stack.push({ x: x + 1, y });
            reachRight = true;
          }
        } else if (reachRight) {
          reachRight = false;
        }
      }

      pixelPos += imageW * 4;
    }
  }
  return imageData;
};
