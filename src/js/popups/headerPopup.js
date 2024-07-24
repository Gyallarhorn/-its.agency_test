
const burger = document.querySelector('.header__burger')
const nav = document.querySelector('.header__nav')



// const togglePopup = (targetElem, classNames) => {
//     console.log(targetElem)
//     for (key in targets) {
//         console.log(targets[key])
//         // [key].classList.toggle(targets[key])
//     }
// }

const togglePopup = () => {
    burger.classList.toggle('header__burger--open')
    nav.classList.toggle('header__nav--open')
}


burger.addEventListener('click', togglePopup)