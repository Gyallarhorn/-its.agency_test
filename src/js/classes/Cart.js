class Cart {
  constructor(openButton, closeButton, cartContainer, tablePlace, cartCount, price, changeButton, clearButton) {
    this.items = Cart.setItems();
    this.openButton = document.querySelector(openButton);
    this.closeButton = document.querySelector(closeButton);
    this.cartContainer = document.querySelector(cartContainer);
    this.tablePlace = document.querySelector(tablePlace);
    this.cartCount = document.querySelector(cartCount);
    this.price = document.querySelector(price);
    this.changeButton = changeButton;
    this.cartContainerClass = cartContainer;
    this.clearButton = document.querySelector(clearButton);

    this.updateUI();

    this.handleChange();

    this.openButton.addEventListener('click', () => {
      this.cartContainer.classList.add(`${this.cartContainerClass.substring(1)}--open`);
      this.createTable();
      this.getTotalPrice();
    });

    this.closeButton.addEventListener('click', () => {
      this.cartContainer.classList.remove(`${this.cartContainerClass.substring(1)}--open`);
    });

    this.clearButton.addEventListener('click', () => {
      this.clearTable();
    });
  }

  static setItems() {
    const savedItems = localStorage.getItem('my-cart');

    if (savedItems) {
      return new Map(Object.entries(JSON.parse(localStorage.getItem('my-cart'))));
    }

    return new Map();
  }

  addItem(id, data = {}) {
    if (!this.items.get(id)) {
      this.createItem(id, data);
    }

    this.items.set(id, { ...this.items.get(id), count: this.items.get(id).count + 1 });
    this.updateStorage();
  }

  removeItem(id) {
    if (this.items.get(id).count - 1 <= 0) {
      this.items.delete(id);
    } else {
      this.items.set(id, { ...this.items.get(id), count: this.items.get(id).count - 1 });
    }
    this.updateStorage();
  }

  deleteItem(id) {
    this.items.delete(id);
    this.updateStorage();
  }

  countProduct() {
    let count = 0;
    if (this.items.size > 0) {
      this.items.forEach((item) => {
        count += item.count;
      });
    }
    return count;
  }

  updateStorage() {
    localStorage.setItem('my-cart', JSON.stringify(Object.fromEntries(this.items)));
  }

  updateUI() {
    this.openButton.textContent = this.countProduct();
  }

  createItem(id, data) {
    this.items.set(id, { ...data });
  }

  clearTable() {
    this.items.clear();
    this.createTable();
    this.getTotalPrice();
    this.updateUI();
    this.updateStorage();
  }

  handleChange() {
    this.tablePlace.addEventListener('click', (e) => {
      if (!e.target.classList.contains(this.changeButton)
                && !e.target.classList.contains('close-button')
                && !e.target.closest('.cart-table__replace-button')
      ) return;

      const parentId = e.target.closest('.cart-table__row').dataset.id;

      if (e.target.closest('.cart-table__replace-button')) {
        this.deleteItem(parentId);
        this.cartContainer.classList.remove(`${this.cartContainerClass.substring(1)}--open`);
        this.updateUI();
        return;
      }

      if (e.target.classList.contains('close-button')) {
        this.deleteItem(parentId);
        this.createTable();
        this.getTotalPrice();
        this.updateUI();
        return;
      }

      if (e.target.classList.contains(`${this.changeButton}--plus`)) {
        this.addItem(parentId);
      } else {
        this.removeItem(parentId);
      }

      this.createTable();
      this.getTotalPrice();
      this.updateUI();
    });
  }

  createTable() {
    const tbody = document.createElement('tbody');

    this.items.forEach((item) => {
      const row = Cart.createTableRow(item).trim();
      tbody.insertAdjacentHTML('beforeend', row);
    });

    this.tablePlace.innerHTML = '';
    this.tablePlace.append(tbody);
    this.cartCount.textContent = `${this.countProduct()} товаров`;
  }

  getTotalPrice() {
    let price = '0 &#8381;';
    if (this.items.size) {
      price = 0;
      this.items.forEach((item) => {
        price += item.count * item.price;
      });
      price = `${price.toLocaleString('ru-RU')} &#8381;`;
    }
    this.price.innerHTML = price;
  }

  static createTableRow(item) {
    return `<tr class="${item.isAvailable ? 'cart-table__row' : 'cart-table__row not-available'}" data-id=${item.id}>
                    <td class="cart-table__data">
                         <picture class="cart-table__image-container">
                            <img class="cart-table__image" src=${item.image[0]}
                                srcset="${item.image[1]} 2x" alt="${item.isAvailable ? 'в наличии' : 'отсутствует в продаже'}" width="96"
                                height="96">
                        </picture>
                    </td>
                    <td class="cart-table__data">
                        <h3 class="cart-table__title">${item.name}</h3>
                        <span class="cart-table__price">${item.count * item.price} &#8381</span>
                    </td>
                    <td class="cart-table__data">
                        <div class="cart-table__wrapper">
                            <button class="button cart-table__change-button"
                                aria-label="Убрать 1 позицию товара"></button>
                            <span class="cart-table__count">${item.count}</span>
                            <button class="button cart-table__change-button cart-table__change-button--plus"
                                aria-label="Добавить 1 позицию товара"></button>
                        </div>
                    </td>
                    <td class="cart-table__data cart-table__data--last">
                        <button class="button close-button close-button--cart"></button>
                        <button class="button cart-table__replace-button">
                            <svg width="24" height="24">
                                <use xlink:href="assets/icons/sprite.svg#repeat"></use>
                            </svg>
                        </button>
                    </td>
                </tr>`;
  }
}

export default Cart;
