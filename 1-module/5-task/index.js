function truncate(str, maxlength) {
  if (str && str.length > maxlength) {
    return str.slice(0, maxlength - 1) + "…";
    /* The -1 in `maxlength - 1` accounts for the added ellipsis,
    preventing the final length from exceeding maxlength */
  }
  return str;
}

