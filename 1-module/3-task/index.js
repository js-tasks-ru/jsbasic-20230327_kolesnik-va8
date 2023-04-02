function ucFirst(str) {
  // Сheck if the string is empty
  if (!str) {
    return str;
  }
  // Get the first character of the string and convert it to uppercase
  const firstChar = str[0].toUpperCase();

  // Get the rest of the characters in the string
  const lastChars = str.slice(1);

  //Combine the uppercase first character with the rest of the characters and return the result
  return `${firstChar}${lastChars}`;
}
