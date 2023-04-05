function isEmpty(obj) {
  // return Object.keys(obj).length === 0;
  const keys = Object.keys(obj);

  if (keys.length === 0) {
    return true;
  } else {
    return false;
  }
}
