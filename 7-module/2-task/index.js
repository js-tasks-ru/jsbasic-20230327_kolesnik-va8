import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.buttonClose = this.elem.querySelector(".modal__close");
    this.buttonClose.addEventListener("click", this.close);
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
    document.addEventListener("keydown", this.onKeyDown);
  }

  setTitle(titleText) {
    this.elem.querySelector(".modal__title").textContent = titleText;
  }

  setBody(bodyInner) {
    const modalBody = this.elem.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.append(bodyInner);
  }

  onKeyDown = (event) => {
    if (event.code === "Escape") {
      this.close();
    }
  };

  close = () => {
    document.body.classList.remove("is-modal-open");
    document.removeEventListener("keydown", this.onKeyDown);
    this.elem.remove();
  };
}
