import './js/files';
import './js/popups';

import './js/slider';
import Products from './js/classes/Products';
import Sorter from './js/classes/Sorter';
import Filter from './js/classes/Filter';
import { handleFilter, handleSort } from './js/dataProcessing';

const sortContainer = document.querySelector('.sorting__options-list');
const filterContainer = document.querySelector('.filters__options-list');

const init = async () => {
  const sorter = new Sorter('.sorting__options', 'draggable-list--open', '.sorting__button');
  const filter = new Filter('.filters__options', 'draggable-list--open');
  const products = new Products(sorter, filter, { cardClasses: ['product'] }, '.products__container', '.sorting__count');
  await products.fetchProducts('https://itsagency-default-rtdb.europe-west1.firebasedatabase.app/.json');

  sortContainer.addEventListener('click', (e) => handleSort(e, sorter, products));
  filterContainer.addEventListener('click', (e) => handleFilter(e, filter, products));
};

init();
