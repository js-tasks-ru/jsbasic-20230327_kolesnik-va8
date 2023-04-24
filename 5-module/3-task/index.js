function initCarousel() {
  let inner = document.querySelector('.carousel__inner');
  let slides = document.querySelectorAll('.carousel__slide');
  let leftButton = document.querySelector('.carousel__arrow_left');
  let rightButton = document.querySelector('.carousel__arrow_right');
  let slideWidth = slides[0].offsetWidth; // width of one slide, obtained via offSetWidth
  let currentSlide = 0;
  let maxSlide = slides.length - 1;

  leftButton.style.display = 'none';

  function moveSlide(direction) {
    currentSlide += direction;
    inner.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

    if (currentSlide === 0) {
      leftButton.style.display = 'none';
    } else if (currentSlide === maxSlide) {
      rightButton.style.display = 'none';
    } else {
      leftButton.style.display = '';
      rightButton.style.display = '';
    }
  }

  leftButton.addEventListener('click', () => {
    moveSlide(-1);
  });

  rightButton.addEventListener('click', () => {
    moveSlide(1);
  });
}
