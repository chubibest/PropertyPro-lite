//  acquire animation divs from dom
const firstAnimation = document.querySelector('#first_animation');
const secondAnimation = document.querySelector('#second_animation');
const nav = document.querySelector('#nav_links')


const toggleDisplay = (firstAnimation, secondAnimation) => {
  firstAnimation.classList.toggle('reel')
  secondAnimation.classList.toggle('reel')
}

setInterval(()=>{
  toggleDisplay(firstAnimation, secondAnimation)
}, 10000)