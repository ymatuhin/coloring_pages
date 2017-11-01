export default imagePath => {
  var img = new Image();
  img.src = imagePath;

  return new Promise((res, rej) => {
    img.onload = () => res(img);
    img.onerror = rej;
  });
};
