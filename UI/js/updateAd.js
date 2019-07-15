/* eslint-disable import/extensions */
import upload from './cloudinary.js';
import display from './detailsview.js';
import fetchOptions from './utils/fetchOptions.js';

const submitButton = document.querySelector('#submit_update');
const updateForm = document.querySelector('#update_Form');

updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitButton.disabled = true;
  const data = {};
  const myForm = new FormData(updateForm);
  const imageUrl = await upload(updateForm);
  myForm.append('image_url', imageUrl);
  myForm.delete('image');
  myForm.delete('images');
  myForm.forEach((value, key) => { data[key] = value; });
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const response = await fetch(`/api/v1/property/${id}`, fetchOptions(data, token));
  const result = await response.json();
  localStorage.setItem('caller', 'update');
  display(result.data);
  submitButton.disabled = false;
});
