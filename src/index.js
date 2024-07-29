import './js/files';
import './js/popups';

import './js/slider';

import Products from './js/classes/Products';
import Sorter from './js/classes/Sorter';
import Filter from './js/classes/Filter';
import { handleFilter, handleSort } from './js/dataProcessing';
import Cart from './js/classes/Cart';
import {
  cartConfig, filterConfig, productConfig, sorterConfig,
} from './js/utils/config';

const sortContainer = document.querySelector('.sorting__options-list');
const filterContainer = document.querySelector('.filters__options-list');

const init = async () => {
  const sorter = new Sorter(sorterConfig);
  const filter = new Filter(filterConfig);
  const cart = new Cart(cartConfig);
  const products = new Products(sorter, filter, cart, productConfig);
  await products.fetchProducts('https://itsagency-default-rtdb.europe-west1.firebasedatabase.app/.json');

  sortContainer.addEventListener('click', (e) => handleSort(e, sorter, products));
  filterContainer.addEventListener('click', (e) => handleFilter(e, filter, products));
};

init();
