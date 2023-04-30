import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    this._product = product;
    this._render();
    this._addEventListeners();
  }

  get elem() {
    return this._container;
  }

  _render() {
    const { name, price, image } = this._product;

    this._container = createElement(`
    <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${image}" class="card__image" alt="${name}">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
  }

  _addEventListeners() {
    const button = this._container.querySelector('.card__button');
    button.addEventListener('click', () => {
      this._container.dispatchEvent(new CustomEvent("product-add", {
        detail: this._product.id,
        bubbles: true
      }));
    });
  }
}