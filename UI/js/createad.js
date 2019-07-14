/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import upload from './cloudinary.js';
import display from './detailsview.js';

const submitButton = document.querySelector('#submit');
const form = document.querySelector('#create_ad_form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  const data = {};
  const myForm = new FormData(form);
  const imageUrl = await upload(form);
  myForm.append('image_url', imageUrl);
  myForm.delete('image');
  myForm.delete('images');
  myForm.forEach((value, key) => { data[key] = value; });
  const token = localStorage.getItem('token');
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };
  try {
    const response = await fetch('/api/v1/property', fetchOptions);
    const result = await response.json();
    if (result.status === 'error') {
      throw result.status;
    }
    localStorage.setItem('caller', 'post');
    display(result.data);
  } catch (err) {
    window.location.href = 'signin.html';
  }
});
