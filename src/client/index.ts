import MainSlot from './games/MainSlot';
import FullScreener from './games/utils/fullscreener/FullScreener';
/*const CANVAS_WIDTH = 500;
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
let elem = document.createElement("img");
console.log(elem);
elem.src = require("./assets/pic1.jpg");
document.getElementsByTagName("body")[0].appendChild(elem);*/

FullScreener.instance.init();

export declare let mainSlot: MainSlot;
mainSlot = new MainSlot();
mainSlot.startSlot(20001, 1, "RUB", "10490961", 1, 'd5e6104c-819e-438e-90ad-83a8ae5021c7');

console.log('hihi');
/*
if (chekparam('GameId')) {
    mainSlot.startSlot(+getparam('GameId'), +getparam('PartnerId'), getparam('Currency'), getparam('UserId'), +getparam('Demo'), getparam('Token'), getparam('BackUrl'));
} else {
    // вернуть демо на 1 это 5 параметр, а не 2
    mainSlot.startSlot(20001, 1, "RUB", "10490961", 1, 'd5e6104c-819e-438e-90ad-83a8ae5021c7');
    //mainSlot.startSlot(20001, 1, "RUB", "10490961", 0, '5496e2af-0f6c-46c9-aaf3-f83bd11d5adb');
}

function getparam(name: any) {
    var res = getResults(name);
    if (res == null) return "";
    else return res[1];
}

function chekparam(name: any) {
    return getResults(name);
}

function getResults(name: any) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    return regex.exec(window.location.href);
}*/

