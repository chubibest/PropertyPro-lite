//  acquire animation divs from dom
const firstAnimation = document.querySelector('#first_animation');
const secondAnimation = document.querySelector('#second_animation');
const nav = document.querySelector('#nav_links')


// const handleMenu = (e) => {
//   e.preventDefault()
// menu.style.display = 'none'
// links.forEach(link => {
//   nav.addEventListener('mouseout', (e) => {
//     e.preventDefault();
//     menu.style.display = 'inline'
//     link.style.display = 'none'
//   });
//   link.style.display = 'block'
// })

// }
// menu.addEventListener('mouseover', (e) => {handleMenu(e)})
const toggleDisplay = (firstAnimation, secondAnimation) => {
  firstAnimation.classList.toggle('reel')
  secondAnimation.classList.toggle('reel')
}

setInterval(()=>{
  toggleDisplay(firstAnimation, secondAnimation)
}, 10000)