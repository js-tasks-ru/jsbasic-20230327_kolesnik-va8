function makeDiagonalRed(table) {
  let rowIndex = 0;
  for (let row of table.rows) {
    row.cells[rowIndex].style.backgroundColor = "red";
    rowIndex++;
  }
}
