const openPopupBtn = document.querySelector("button")
const popupContainer = document.querySelector(".popup-container")
const closeIcon = document.querySelector('.close-icon')
const overlay = document.querySelector('.overlay')

openPopupBtn.addEventListener('click', () => {
  popupContainer.classList.add('open-popup')
})


closeIcon.addEventListener('click', () => {
  popupContainer.classList.remove('open-popup')
})

overlay.addEventListener('click', () => {
  popupContainer.classList.remove('open-popup')
})

