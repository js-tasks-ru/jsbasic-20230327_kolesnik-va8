import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
    this.updateFilter(this.filters);
  }

  render() {
    this.elem = createElement( `
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);
    this.gridInner = this.elem.querySelector(".products-grid__inner");

    for (const product of this.products) {
      const card = new ProductCard(product);
      card.elem.classList.add(`$product.id`);
      this.gridInner.append(card.elem);
      this[product.id] = card;
    }
  }

  updateFilter(filters) {
    this.filters  = { ...this.filters, ...filters};
    this.renderContent();
  }

  renderContent(){
    const innerContainer = this.elem.querySelector(".products-grid__inner");
    innerContainer.innerHTML = "";

    for(const product of this.products) {
      if(this.filters.noNuts && product.nuts) {
        continue;
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        continue;
      }

      if (
        this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        continue;
      }

      if (this.filters.category && product.category !== this.filters.category) {
        continue;
      }

      innerContainer.append(this[product.id].elem);
    }
  }
}
