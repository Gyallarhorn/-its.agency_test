class Sorter {
  constructor({ parentElement, removingClass, button }) {
    this.parentElement = document.querySelector(parentElement);
    this.button = document.querySelector(button);
    this.removingClass = removingClass;
    this.sortOption = '';
  }

  static sortByPrice(products, ascending) {
    return products.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
  }

  static sortByPopularity(products) {
    return products.sort((a, b) => b.purchased - a.purchased);
  }

  static sortByDateOfCreation(products) {
    return products.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateB - dateA;
    });
  }

  applySort(newProducts) {
    let sortedProducts;
    switch (this.sortOption) {
      case 'price-expensive':
        this.button.textContent = 'Сначала дорогие';
        sortedProducts = Sorter.sortByPrice(newProducts, false);
        break;
      case 'price-cheap':
        this.button.textContent = 'Сначала недорогие';
        sortedProducts = Sorter.sortByPrice(newProducts, true);
        break;
      case 'popular':
        this.button.textContent = 'Сначала популярные';
        sortedProducts = Sorter.sortByPopularity(newProducts);
        break;
      default:
        this.button.textContent = 'Сначала новые';
        sortedProducts = Sorter.sortByDateOfCreation(newProducts);
        break;
    }
    this.parentElement.classList.remove(this.removingClass);
    return sortedProducts;
  }
}

export default Sorter;
