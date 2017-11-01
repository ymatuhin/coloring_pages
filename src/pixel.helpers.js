export const findRedIndex = (x, y, width) => y * (width * 4) + x * 4;
export const generateIndexes = redIndex => ({
  r: redIndex,
  g: redIndex + 1,
  b: redIndex + 2,
  a: redIndex + 3,
});

export function getBrightness({ r, g, b }) {
  return (r * 299 + g * 587 + b * 114) / 1000 / 255 * 100;
}

export function shadeRGBColor({ r, g, b }, percent) {
  var t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent;
  return {
    r: Math.round((t - r) * p) + r,
    g: Math.round((t - g) * p) + g,
    b: Math.round((t - b) * p) + b,
  };
}

export const makeRgba = (data, { r, g, b, a }) => ({
  r: data[r],
  g: data[g],
  b: data[b],
  a: data[a],
});
