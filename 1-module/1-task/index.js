function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
    // iterates through each integer i from 1 to n
    //and multiplies it with the previous result to get the factorial value
  }
  return result;
}
