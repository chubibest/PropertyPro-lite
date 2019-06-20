const optionsList = document.querySelector('#nav_links');
const menu = document.querySelector('#menu');
const links = document.querySelectorAll('#nav_links li');
const handleOptionsDisplay = () => {
  links.forEach((item) => {
  item.classList.toggle('display')
  })
}

menu.addEventListener('click', handleOptionsDisplay)
