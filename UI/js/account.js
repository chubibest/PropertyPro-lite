/* eslint-disable import/extensions */
import successHandler from './utils/response.js';
import fetchOptions from './utils/fetchOptions.js';

const button = document.querySelector('#change_pass');
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  button.disabled = true;
  const { token } = localStorage;
  const { email } = JSON.parse(window.atob(token.split('.')[1]));
  const data = {};
  const formData = new FormData(e.target);
  formData.forEach((value, key) => {
    data[key] = value;
  });
  const response = await fetch(`/auth/${email}/reset_password`, fetchOptions(data, token));
  if (response.status === 204) {
    successHandler(form, 'signin.html');
  }
  if (response.status === 403) {
    document.querySelector('#passwordtt').innerText = 'Incorrect password';
  }
  button.disabled = false;
});
