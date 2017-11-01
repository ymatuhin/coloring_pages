export function getBrightness([r, g, b]) {
  return (r * 299 + g * 587 + b * 114) / 1000 / 255 * 100;
}

export function shadeRGBColor([R, G, B], percent) {
  var t = percent < 0 ? 0 : 255,
    p = percent < 0 ? percent * -1 : percent;
  return [
    Math.round((t - R) * p) + R,
    Math.round((t - G) * p) + G,
    Math.round((t - B) * p) + B,
  ];
}

export const findRedIndex = (x, y, width) => y * (width * 4) + x * 4;
export const makeIndexesArray = redIndex => [
  redIndex,
  redIndex + 1,
  redIndex + 2,
  redIndex + 3,
];
export const makeRgba = (data, indexes) => [
  data[indexes[0]],
  data[indexes[1]],
  data[indexes[2]],
  data[indexes[3]],
];
