/* eslint-disable import/extensions */
import successHandler from './utils/response.js';

const button = document.querySelector('#flag_button');
const form = document.querySelector('#flag_form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  button.disabled = true;
  const id = localStorage.getItem('flag');
  const token = localStorage.getItem('token');
  const data = {};
  const formData = new FormData(e.target);
  formData.forEach((value, key) => { data[key] = value; });
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(`/property/${id}`, fetchOptions);
  if (response.status === 204) {
    successHandler(form, 'user.html');
  }
});
