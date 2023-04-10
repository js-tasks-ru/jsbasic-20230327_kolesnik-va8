function getMinMax(str) {
  let numbers = str
    .split(" ")
    .map((item) => Number(item))
    .filter((num) => isFinite(num));
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
