const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
const filterButton = document.querySelector('.filters__button');
const filterPopup = document.querySelector('.filters__options');
const draggableLists = document.querySelectorAll('.draggable-list');
const draggableParents = document.querySelectorAll('.draggable-parent');
const sortingButton = document.querySelector('.sorting__button');
const sortingPopup = document.querySelector('.sorting__options');

const togglePopup = (elem, className) => {
  elem.classList.toggle(className);
};

const handleSwipe = (targetElem, parentElem, deletedClass) => {
  let startY;
  let endY;

  targetElem.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  targetElem.addEventListener('touchmove', (e) => {
    e.preventDefault();
    endY = e.touches[0].clientY;
  });

  targetElem.addEventListener('touchend', (e) => {
    const deltaY = endY - startY;

    if (deltaY > 30) {
      parentElem.classList.remove(deletedClass);
      startY = 0;
      endY = 0;
    }
  });
};

draggableLists.forEach((popup, index) => handleSwipe(popup, draggableParents[index], 'draggable-list--open'));

burger.addEventListener('click', () => {
  burger.classList.toggle('header__burger--open');
  nav.classList.toggle('header__nav--open');
});

filterButton.addEventListener('click', () => togglePopup(filterPopup, 'draggable-list--open'));
sortingButton.addEventListener('click', () => togglePopup(sortingPopup, 'draggable-list--open'));
