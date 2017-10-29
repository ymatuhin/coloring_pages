const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const img: any = document.getElementById('ouline');
const canvas: any = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const imgRatio = img.naturalWidth / img.naturalHeight; // 0.83...

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.drawImage(img, 0, 0, 500, 500);

canvas.addEventListener('click', ({ layerX, layerY }: any) => {
  fillColor({ x: layerX, y: layerY });
});

const filled = {};
function fillColor({ x, y }: any) {
  if (filled[`${x}:${y}`]) return;

  const color = [255, 0, 0, 0];
  const imageData = ctx.getImageData(x, y, 1, 1);
  const isWhite =
    imageData.data[0] > 100 &&
    imageData.data[1] > 100 &&
    imageData.data[2] > 100;

  if (!isWhite) return;

  imageData.data[1] = 0;
  imageData.data[2] = 0;
  ctx.putImageData(imageData, x, y);
  filled[`${x}:${y}`] = true;

  window.requestAnimationFrame(() => {
    fillColor({ x: x - 1, y });
    fillColor({ x: x + 1, y });
    fillColor({ x, y: y + 1 });
    fillColor({ x, y: y - 1 });
  });
}
