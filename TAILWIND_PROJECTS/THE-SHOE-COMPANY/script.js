const hamburgerMenu = document.querySelector("#hamburger-menu");
const header = document.querySelector("header");
const backArrow = document.querySelector("#back-arrow");
const navbar = document.querySelector("#nav");
hamburgerMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  header.classList.add("active");
});
backArrow.addEventListener("click", () => {
  header.classList.remove("active");
});
document.addEventListener("click", () => {
  header.classList.remove("active");
});
navbar.addEventListener("click", (e) => {
  e.stopPropagation();
});
