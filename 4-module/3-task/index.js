function highlight(table) {
  let rows = table.querySelectorAll('tbody tr');

  rows.forEach((row) => {
    let [, age, gender, status] = row.querySelectorAll('td');

    if (status) {
      let available = status.dataset.available;
      row.classList.add(available === 'true' ? 'available' : 'unavailable');
      row.setAttribute("hidden", !available);
    }

    if (gender) {
      let isMale = gender.textContent === 'm';
      row.classList.add(isMale ? 'male' : 'female');
    }

    if (age) {
      let ageValue = Number(age.textContent);
      if (ageValue < 18) {
        row.style.textDecoration = 'line-through';
      }
    }
  });
}
