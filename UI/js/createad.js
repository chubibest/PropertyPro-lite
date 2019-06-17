import populateResult from "./details_view.js"
const form = document.querySelector("form");


 
form.addEventListener("submit", e => {
  e.preventDefault();
populateResult(form);
});
