const headerContent = document.querySelector('.header-content')
const nav = document.querySelector('nav')
const hamburgerMenu = document.querySelector('.hamburger-menu')
const closeIcon = document.querySelector('.close-icon')
const goToTopBtn = document.querySelector('.go-to-top')
const mainContent = document.querySelector('.main-content')

hamburgerMenu.addEventListener('click', (e) => {
  e.stopPropagation()
 headerContent.classList.add('open-menu')
})

nav.addEventListener('click', (e) => {
  e.stopPropagation()
})

closeIcon.addEventListener('click', (e) => {
 headerContent.classList.remove('open-menu')
})

goToTopBtn.addEventListener('click', () => {
  mainContent.scrollTo(0,0)
})

window.addEventListener('click', () => {
 headerContent.classList.remove('open-menu')
})