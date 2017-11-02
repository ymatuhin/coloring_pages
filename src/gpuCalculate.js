// 0 – 100
const getBrightness = (r, g, b) =>
  (r * 299 + g * 587 + b * 114) / 1000 / 255 * 100;

const getRgb = (dataData, pixelPos) => {
  var r = dataData[pixelPos];
  var g = dataData[pixelPos + 1];
  var b = dataData[pixelPos + 2];

  return { r, g, b };
};

const shadeRGBColor = ({ r, g, b }, percent) => {
  var t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent;
  return {
    r: Math.round((t - r) * p) + r,
    g: Math.round((t - g) * p) + g,
    b: Math.round((t - b) * p) + b,
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
  const shades = {};
  const stack = [{ x: startX, y: startY }];
  const newColorBrightness = getBrightness(color.r, color.g, color.b);

  const colorPixel = pixelPos => {
    let newColor = color;
    const { r, g, b } = getRgb(originalImageDataData, pixelPos);
    const originalBrightness = getBrightness(r, g, b);

    if (originalBrightness < newColorBrightness) {
      const diff = (originalBrightness - newColorBrightness) / 100;
      newColor = shadeRGBColor(color, diff);
    }

    shades[`${newColor.r}${newColor.g}${newColor.b}`] = true;

    imageData.data[pixelPos] = newColor.r;
    imageData.data[pixelPos + 1] = newColor.g;
    imageData.data[pixelPos + 2] = newColor.b;
  };

  const availiblePixel = pixelPos => {
    const { r, g, b } = getRgb(imageData.data, pixelPos);
    const notBlack = getBrightness(r, g, b) >= sensitivity;
    const notCurrentColor = color.r !== r || color.g !== g || color.b !== b;
    const notShade = !shades[`${r}${g}${b}`];

    return notCurrentColor && notBlack && notShade;
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

  console.info(`# shades`, Object.keys(shades).length);
  return imageData;
};
