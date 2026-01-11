const openPopupBtn = document.querySelector(".button")
const popupContainer = document.querySelector(".popup-container")
const closeIcon = document.querySelector('.close-icon')
const popup = document.querySelector('.popup')
const subscribeBtn = document.querySelector('.subscribe')
const inputFiled = document.querySelector('input')


openPopupBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  popupContainer.classList.add('open-popup')
})


closeIcon.addEventListener('click', () => {
  popupContainer.classList.remove('open-popup')
})

popupContainer.addEventListener('click', () => {
  popupContainer.classList.remove('open-popup')
})

popup.addEventListener('click', (e) => {
  e.stopPropagation()
})

subscribeBtn.addEventListener('click', () => {
  if (inputFiled.value.trim() !== '') {
    popupContainer.classList.remove('open-popup')
  }
})