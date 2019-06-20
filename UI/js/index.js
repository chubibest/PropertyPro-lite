//  acquire animation divs from dom
const firstAnimation = document.querySelector('#first_animation');
const secondAnimation = document.querySelector('#second_animation');

const toggleDisplay = () => {
  firstAnimation.classList.toggle('reel');
  secondAnimation.classList.toggle('reel');
};

setInterval(() => {
  toggleDisplay(firstAnimation, secondAnimation);
}, 10000);
