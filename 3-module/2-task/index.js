function filterRange(arr, a, b) {
  return arr.filter(item => [a, b].includes(item) || (item > a && item < b));
  // return arr.filter(item => item >= a && item <= b);
}
