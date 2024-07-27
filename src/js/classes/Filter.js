class Filter {
  constructor(parentElement, removingClass) {
    this.parentElement = document.querySelector(parentElement);
    this.removingClass = removingClass;
    this.filters = {};
  }

  static filterNewProducts(products) {
    return products.filter((product) => product.isNew);
  }

  static filterAvailableProducts(products) {
    return products.filter((product) => product.isAvailable);
  }

  static filterByContractual(products) {
    return products.filter((product) => product.isContractual);
  }

  static filterExclusiveProducts(products) {
    return products.filter((product) => product.isEclusive);
  }

  static filterOnSale(products) {
    return products.filter((product) => product.isSale);
  }

  applyFilters(newArray, cache) {
    let filteredProducts = [...cache];

    if (this.filters.isAvailable) {
      filteredProducts = Filter.filterAvailableProducts(filteredProducts);
    }

    if (this.filters.isNew) {
      filteredProducts = Filter.filterNewProducts(filteredProducts);
    }

    if (this.filters.isContractual) {
      filteredProducts = Filter.filterByContractual(filteredProducts);
    }

    if (this.filters.isExclusive) {
      filteredProducts = Filter.filterExclusiveProducts(filteredProducts);
    }

    if (this.filters.isSale) {
      filteredProducts = Filter.filterOnSale(filteredProducts);
    }

    return filteredProducts;
  }
}

export default Filter;
