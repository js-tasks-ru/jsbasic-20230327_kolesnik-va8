/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this._rows = [];
    this.elem = this._createTable();
    this.rows = rows;
  }

  get rows() {
    return this._rows;
  }

  set rows(rows) {
    this._rows = rows;
    let tableBody = this.elem.querySelector('tbody');
    tableBody.innerHTML = '';
    this.rows.forEach((row) => {
      let tr = document.createElement('tr');
      Object.values(row).forEach((value) => {
        let td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => {
        tableBody.removeChild(tr);
      });
      let td = document.createElement('td');
      td.appendChild(deleteButton);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });
  }

  _createTable() {
    let table = document.createElement('table');
    table.classList.add('user-table');

    let headerRow = table.insertRow();
    for (let key in this.rows[0]) {
      let th = document.createElement('th');
      th.textContent = key[0].toUpperCase() + key.slice(1);
      headerRow.appendChild(th);
    }

    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    return table;
  }
}
