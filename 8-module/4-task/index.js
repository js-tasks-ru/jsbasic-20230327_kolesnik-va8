import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.count += 1;
    } else {
      this.cartItems.push({ product: product, count: 1 });
    }

    this.onProductUpdate(existingItem || { product: product, count: 1 });
  }

  updateProductCount(productId, amount) {
    const cartItemIndex = this.cartItems.findIndex(
      (item) => item.product.id === productId
    );

    if (cartItemIndex === -1) {
      return;
    }

    const cartItem = this.cartItems[cartItemIndex];
    cartItem.count += amount;

    if (cartItem.count <= 0) {
      this.cartItems.splice(cartItemIndex, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = 0;

    for (const item of this.cartItems) {
      totalCount += item.count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (const item of this.cartItems) {
      totalPrice += item.product.price * item.count;
    }

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.modal.open();

    const renderList = createElement("<div></div>");
    for (let item of this.cartItems) {
      renderList.append(this.renderProduct(item.product, item.count));
    }
    renderList.append(this.renderOrderForm());

    this.modal.setBody(renderList);

    const btnCounterMinus = this.modal.elem.querySelectorAll(
      ".cart-counter__button_minus"
    );
    for (let btnMinus of btnCounterMinus) {
      btnMinus.addEventListener("click", (event) => {
        let productId = event.target.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, -1);
      });
    }

    const btnCounterPlus = this.modal.elem.querySelectorAll(
      ".cart-counter__button_plus"
    );
    for (let btnPlus of btnCounterPlus) {
      btnPlus.addEventListener("click", (event) => {
        let productId = event.target.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, 1);
      });
    }

    const cartForm = this.modal.elem.querySelector(".cart-form");
    cartForm.addEventListener("submit", this.onSubmit);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (!this.modal || !document.body.classList.contains("is-modal-open")) {
      return;
    }
    let modalBody = this.modal.elem.querySelector(".modal__body");

    if (this.cartItems.length === 0 && this.modal) {
      this.modal.close();
      return;
    }

    if (cartItem) {
      let productId = cartItem.product.id;
      let productElement = modalBody.querySelector(
        `[data-product-id="${productId}"]`
      );
      if (cartItem.count === 0) {
        if (productElement) {
          productElement.remove();
        }
      } else {
        let productCount = modalBody.querySelector(
          `[data-product-id="${productId}"] .cart-counter__count`
        );
        let productPrice = modalBody.querySelector(
          `[data-product-id="${productId}"] .cart-product__price`
        );
        productCount.textContent = cartItem.count;
        productPrice.textContent = `€${(
          cartItem.product.price * cartItem.count
        ).toFixed(2)}`;
      }
    }
    let infoPrice = modalBody.querySelector(".cart-buttons__info-price");
    infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  onSubmit = (event) => {
    event.preventDefault();

    let cartForm = this.modal.elem.querySelector(".cart-form");
    let btnSubmit = this.modal.elem.querySelector(".cart-buttons__button");

    btnSubmit.classList.add("is-loading");

    let formDataOrder = new FormData(cartForm);
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: formDataOrder,
    })
      .then((response) => {
        if (response.ok) {
          let modalHeader = this.modal.elem.querySelector(".modal__title");
          let modalBody = this.modal.elem.querySelector(".modal__body");

          modalHeader.textContent = "Success!";
          this.cartItems.length = 0;
          modalBody.innerHTML = `<div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We'll notify you about the delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>`;
        }
      })
      .finally(() => {
        btnSubmit.classList.remove("is-loading");
      });
  };
}
