/* eslint-disable no-param-reassign */
const handleSort = (e, sorter, products) => {
  if (!e.target.classList.contains('sorting__options-list-button')) return;

  switch (e.target.dataset.sort) {
    case 'price-expensive':
      sorter.sortOption = 'price-expensive';
      break;
    case 'price-cheap':
      sorter.sortOption = 'price-cheap';
      break;
    case 'popular':
      sorter.sortOption = 'popular';
      break;
    default:
      sorter.sortOption = '';
      break;
  }

  products.addCards();
};

const handleFilter = (e, filter, products) => {
  if (!e.target.classList.contains('filters__options-input')) return;
  const { value, checked } = e.target;

  if (checked) {
    filter.filters[value] = true;
  } else {
    delete filter.filters[value];
  }

  products.addCards();
};

export { handleSort, handleFilter };
