function isEmpty(obj) {
  const keys = Object.keys(obj);

  if (keys.length === 0) {
    return true;
  } else {
    return false;
  }
}
