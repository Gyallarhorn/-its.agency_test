const sorterConfig = {
  // Родительский контейнер блока сортировки
  parentElement: '.sorting__options',
  // Класс для скрытия блока
  removingClass: 'draggable-list--open',
  // Кнока для отображения текущего вида сортировки
  button: '.sorting__button',
};

const filterConfig = {
  // Родительский контейнер блока фильтрации
  parentElement: '.filters__options',
  // Класс для скрытия блока
  removingClass: 'draggable-list--open',
};

const cartConfig = {
  // Кнопка для отображения количества товаров в корзине и ее открытия
  openButton: '.header__personal-button--cart',
  // Кнопка закрытия корзины
  closeButton: '.close-button',
  // Контейнер корзины
  cartContainer: '.cart',
  // Таблица для отображения товаров
  tablePlace: '.cart-table',
  // Количество товаров в корзине
  cartCount: '.cart__count',
  // Итоговая цена
  price: '.cart__price-title',
  // Класс кнопки смены количества товаров
  changeButton: 'cart-table__change-button',
  // Кнопка для очищения коризны
  clearButton: '.cart__clear-button',
};

const productConfig = {
  // Массив классов для карточки
  cardClasses: ['product'],
  // Родительский контейнер товаров
  parentElement: '.products__container',
  // Класс карточки для поиска
  productClass: '.product',
  // Кнопка для добавления товара в корзину
  buttonClass: '.product__add-item',
  // Отображение количества найденных товаров
  countContainer: '.sorting__count',
};

export {
  sorterConfig,
  filterConfig,
  cartConfig,
  productConfig,
};
