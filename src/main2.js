const CANVAS_WIDTH = document.documentElement.clientWidth;
const CANVAS_HEIGHT = document.documentElement.clientHeight;

function init() {
  const { canvas, ctx } = initCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const img = document.getElementById('ouline');

  drawImageScaled(img, ctx);
  canvas.addEventListener('click', ({ layerX, layerY }) => {
    const color = [
      getRandomInt(101, 255),
      getRandomInt(101, 255),
      getRandomInt(101, 255),
    ];
    fillColor(layerX, layerY, ctx, color);
  });
}

function initCanvas(width, height) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  return { canvas, ctx };
}

function drawImageScaled(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio,
  );
}

function fillColor(x, y, ctx, color) {
  const filled = {};
  const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const width = imageData.width;
  const height = imageData.height;
  const stack = [[x, y]];
  const black = 100;

  while (stack.length > 0) {
    const [localX, localY] = stack.pop();
    if (filled[`${localX}:${localY}`]) continue;

    const redIndex = localY * (width * 4) + localX * 4;
    const isTransparent = imageData.data[redIndex + 3] < 20;
    const pointHsl = rgbToHsl(
      imageData.data[redIndex],
      imageData.data[redIndex + 1],
      imageData.data[redIndex + 2],
    );
    const isBlackPoint = pointHsl[2] < 0.4;

    if (isBlackPoint || isTransparent) continue;

    const newColor = hslToRgb(
      hslFillColor[0],
      hslFillColor[1],
      Math.min(hslFillColor[2], pointHsl[2]),
    );
    imageData.data[redIndex] = newColor[0];
    imageData.data[redIndex + 1] = newColor[1];
    imageData.data[redIndex + 2] = newColor[2];
    filled[`${localX}:${localY}`] = true;

    // Ставим соседей в стек на проверку
    stack.push([localX - 1, localY]);
    stack.push([localX + 1, localY]);
    stack.push([localX, localY - 1]);
    stack.push([localX, localY + 1]);
  }

  ctx.putImageData(imageData, 0, 0);
}

init();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
