/* eslint-disable import/extensions */
import upload from './cloudinary.js';
import display from './detailsview.js';

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
  myForm.forEach((value, key) => { data[key] = value; });
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const fetchOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(`/property/${id}`, fetchOptions);
  const result = await response.json();
  localStorage.setItem('caller', 'update');
  display(result.data);
  submitButton.disabled = false;
});
