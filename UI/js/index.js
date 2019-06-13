//  acquire animation divs from dom
const firstAnimation = document.querySelector('#first_animation');
const secondAnimation = document.querySelector('#second_animation');
const nav = document.querySelector('#nav_links')
const links = document.querySelectorAll('#nav_links li');
const menu = document.querySelector('#menu')

const handleMenu = (e) => {
  e.preventDefault()
menu.style.display = 'none'
links.forEach(link => {
  nav.addEventListener('mouseout', (e) => {
    e.preventDefault();
    menu.style.display = 'inline'
    link.style.display = 'none'
  });
  link.style.display = 'block'
})

}
// menu.addEventListener('mouseover', (e) => {handleMenu(e)})
const toggleDisplay = (firstAnimation, secondAnimation) => {
  firstAnimation.classList.toggle('display')
  secondAnimation.classList.toggle('display')
}

setInterval(()=>{
  toggleDisplay(firstAnimation, secondAnimation)
}, 10000)