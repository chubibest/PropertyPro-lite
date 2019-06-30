/* eslint-disable import/extensions */
import upload from './cloudinary.js';

const submitButton = document.querySelector('#submit');
const form = document.querySelector('form');
const displayDetailsUl = document.querySelector('#data_display');


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  await upload(form);
  const listItem = document.createElement('li');
  listItem.innerText = 'Sold';
  listItem.style.color = '#00FF00';
  listItem.style.fontWeight = 'bolder';
  listItem.style.display = 'none';
  listItem.id = ('listItem');
  displayDetailsUl.appendChild(listItem);
});
