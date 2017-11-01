export default (box, canvas) => {
  canvas.width = box.width;
  canvas.height = box.height;
  canvas.style.width = `${box.width}px`;
  canvas.style.height = `${box.height}px`;
};
