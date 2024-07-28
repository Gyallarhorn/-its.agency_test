import axios from 'axios';
import debounce from '../utils/debounce';

class Products {
  constructor(
    sorter,
    filter,
    cart,
    config,
    parentElement,
    productClass,
    buttonClass,
    countContainer,
  ) {
    this.config = config;
    this.products = [];
    this.cache = [];
    this.filter = filter;
    this.cart = cart;
    this.sorter = sorter;
    this.buttonClass = buttonClass;
    this.productClass = productClass;
    this.count = document.querySelector(countContainer);
    this.parentElement = document.querySelector(parentElement);
    this.handleResize = debounce(this.handleResize.bind(this), 500);

    window.addEventListener('resize', this.handleResize);

    this.parentElement.addEventListener('click', (e) => this.handleContainerClick(e));
  }

  static configureProduct(id, product) {
    return {
      id,
      ...product,
    };
  }

  async fetchProducts(endpoint) {
    try {
      const response = await axios.get(endpoint);
      if (response.status === 200) {
        this.products = Object.keys(response.data)
          .map((id) => Products.configureProduct(id, response.data[id]));
        this.cache = [...this.products];
        this.addCards();
      } else {
        throw new Error(`Возникла ошибка в процессе получения товаров, ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Не удалось получить товары ${error.message}`);
    }
  }

  createCard(product, isNotLast) {
    const card = document.createElement('article');
    card.classList.add(...this.config.cardClasses);
    card.setAttribute('data-id', product.id);

    if (isNotLast) {
      card.classList.add('product--line');
    }

    const cardInnerContent = `<a href="#" class="product__link">
            <picture picture picture class="product__image-container">
                <img class="product__image" src=${product.image[0]}
                    srcset="${product.image[1]} 2x" alt="${product.isAvailable ? 'в наличии' : 'отсутствует в продаже'}" width="112"
                    height="112">
            </picture>
        </a>
        <h2 class="product__title">${product.name}</h2>
        <div class="product_bottom">
            <span class="product__price">${product.price} &#8381</span>
            <button class="button product__add-item" aria-label="Добавить товар в коризну">
                <svg width="16" height="16">
                    <use xlink:href="assets/icons/sprite.svg#plus"></use>
                </svg>
            </button>
        </div>`.trim();

    card.innerHTML = cardInnerContent;
    return card;
  }

  handleContainerClick(e) {
    if (!e.target.closest(this.buttonClass)) return;

    const { id } = e.target.closest(this.productClass).dataset;

    this.cart.addItem(id, this.addToCard(id));
    this.cart.updateUI();
  }

  addToCard(id) {
    const filteredProduct = this.cache.find((product) => product.id === id);

    return {
      id,
      isAvailable: filteredProduct.isAvailable,
      price: filteredProduct.price,
      name: filteredProduct.name,
      image: filteredProduct.image,
      count: 0,
    };
  }

  addCards() {
    this.products = this.filter.applyFilters(this.products, this.cache);
    this.sorter.applySort(this.products);
    const fragment = document.createDocumentFragment();

    const count = this.products.length;

    let cardsPerRow;
    if (window.innerWidth >= 1920) {
      cardsPerRow = 5;
    } else if (window.innerWidth >= 1400) {
      cardsPerRow = 4;
    } else if (window.innerWidth >= 1100) {
      cardsPerRow = 3;
    } else {
      cardsPerRow = 2;
    }

    const cardsInLastRow = count % cardsPerRow || cardsPerRow;
    const lastRowStartIndex = count - cardsInLastRow;

    this.products.forEach((product, index) => {
      let card;
      if (index < lastRowStartIndex) {
        card = this.createCard(product, true);
      } else {
        card = this.createCard(product, false);
      }
      fragment.append(card);
    });

    this.parentElement.innerHTML = '';
    this.parentElement.append(fragment);
    this.count.textContent = `${count} товаров`;
  }

  handleResize() {
    this.addCards(this.products);
  }
}

export default Products;
