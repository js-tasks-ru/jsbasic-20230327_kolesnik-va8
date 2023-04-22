function toggleText() {
  let text = document.getElementById('text');
  document
    .querySelector('.toggle-text-button')
    .addEventListener('click', function () {
      text.hidden = !text.hidden;
    });
}
