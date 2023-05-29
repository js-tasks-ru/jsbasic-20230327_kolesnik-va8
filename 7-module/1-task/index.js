import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner"></nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
  `);
    this.innerContainer = this.elem.querySelector(".ribbon__inner");
    this.buttonRight = this.elem.querySelector(".ribbon__arrow_right");
    this.buttonLeft = this.elem.querySelector(".ribbon__arrow_left");

    this.categories.forEach((category) => {
      const categoryEl = createElement(`
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
    `);
      categoryEl.addEventListener("click", (event) => {
        event.preventDefault();
        this.selectCategory(category.id);
      });
      this.innerContainer.appendChild(categoryEl);
    });

    this.buttonRight.addEventListener("click", this.handleScrollRight);
    this.buttonLeft.addEventListener("click", this.handleScrollLeft);
    this.innerContainer.addEventListener("scroll", this.updateArrowVisibility);

    this.selectCategory(this.categories[0].id);
    this.updateArrowVisibility();
  }

  selectCategory(categoryId) {
    const categoryElements = Array.from(this.innerContainer.children);
    categoryElements.forEach((categoryEl) => {
      categoryEl.classList.toggle(
        "ribbon__item_active",
        categoryEl.dataset.id === categoryId
      );
    });

    this.elem.dispatchEvent(
      new CustomEvent("ribbon-select", {
        bubbles: true,
        detail: categoryId,
      })
    );
  }

  handleScrollRight = () => {
    this.innerContainer.scrollBy(350, 0);
    this.updateArrowVisibility();
  };

  handleScrollLeft = () => {
    this.innerContainer.scrollBy(-350, 0);
    this.updateArrowVisibility();
  };

  updateArrowVisibility = () => {
    const scrollLeft = this.innerContainer.scrollLeft;
    const maxScrollLeft =
      this.innerContainer.scrollWidth - this.innerContainer.clientWidth;

    this.buttonLeft.classList.toggle("ribbon__arrow_visible", scrollLeft > 0);
    this.buttonRight.classList.toggle(
      "ribbon__arrow_visible",
      scrollLeft < maxScrollLeft
    );
  };
}
