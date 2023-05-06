import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    this.inner = this.elem.querySelector(".carousel__inner");
    this.slidesElements = this.slides.map((slide) =>
      this.createSlideElement(slide)
    );
    this.slidesElements.forEach((slideElement) =>
      this.inner.appendChild(slideElement)
    );

    this.buttons = this.elem.querySelectorAll(".carousel__button");
    this.buttons.forEach((button) =>
      button.addEventListener("click", this.handleButtonClick.bind(this))
    );

    this.elem.addEventListener("product-add", (event) =>
      console.log(event.detail)
    );
    this.initCarousel();
  }

  createSlideElement(slide) {
    const slideElement = createElement(`
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
    return slideElement;
  }

  handleButtonClick(event) {
    const slide = event.target.closest(".carousel__slide");
    const slideId = slide.dataset.id;

    const productAddEvent = new CustomEvent("product-add", {
      detail: slideId,
      bubbles: true,
    });

    this.elem.dispatchEvent(productAddEvent);
  }

  initCarousel() {
    const arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    const arrowRight = this.elem.querySelector(".carousel__arrow_right");
    const slideElements = this.slidesElements;
    const finalSlideIndex = slideElements.length - 1;

    arrowRight.addEventListener("click", () => {
      if (this.currentSlideIndex === finalSlideIndex) return;

      this.currentSlideIndex++;
      this.updateSlidePosition();
      this.updateArrowVisibility();
    });

    arrowLeft.addEventListener("click", () => {
      if (this.currentSlideIndex === 0) return;

      this.currentSlideIndex--;
      this.updateSlidePosition();
      this.updateArrowVisibility();
    });

    arrowLeft.style.display = "none";
    this.updateArrowVisibility();
  }

  updateSlidePosition() {
    const slideWidth = this.slidesElements[0].offsetWidth;
    this.inner.style.transform = `translateX(-${
      this.currentSlideIndex * slideWidth
    }px)`;
  }

  updateArrowVisibility() {
    const arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    const arrowRight = this.elem.querySelector(".carousel__arrow_right");

    arrowLeft.style.display = this.currentSlideIndex === 0 ? "none" : "flex";
    arrowRight.style.display =
      this.currentSlideIndex === this.slidesElements.length - 1
        ? "none"
        : "flex";
  }
}
