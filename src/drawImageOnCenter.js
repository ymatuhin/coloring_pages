export default (img, ctx) => {
  var canvas = ctx.canvas;
  // var hRatio = canvas.width / img.width;
  // var vRatio = canvas.height / img.height;
  // var ratio = Math.min(hRatio, vRatio);
  // var centerShift_x = (canvas.width - img.width * ratio) / 2;
  // var centerShift_y = (canvas.height - img.height * ratio) / 2;

  // console.info(`# ratio`, ratio);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, img.width, img.height);
};
