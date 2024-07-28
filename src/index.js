import './js/files';
import './js/popups';

import './js/slider';
import Products from './js/classes/Products';
import Sorter from './js/classes/Sorter';
import Filter from './js/classes/Filter';
import { handleFilter, handleSort } from './js/dataProcessing';
import Cart from './js/classes/Cart';

const sortContainer = document.querySelector('.sorting__options-list');
const filterContainer = document.querySelector('.filters__options-list');

const init = async () => {
  const sorter = new Sorter('.sorting__options', 'draggable-list--open', '.sorting__button');
  const filter = new Filter('.filters__options', 'draggable-list--open');
  const cart = new Cart('.header__personal-button--cart', '.close-button', '.cart', '.cart-table', '.cart__count', '.cart__price-title', 'cart-table__change-button', '.cart__clear-button');
  const products = new Products(sorter, filter, cart, { cardClasses: ['product'] }, '.products__container', '.product', '.product__add-item', '.sorting__count');
  console.log(cart);
  await products.fetchProducts('https://itsagency-default-rtdb.europe-west1.firebasedatabase.app/.json');

  sortContainer.addEventListener('click', (e) => handleSort(e, sorter, products));
  filterContainer.addEventListener('click', (e) => handleFilter(e, filter, products));
};

init();
