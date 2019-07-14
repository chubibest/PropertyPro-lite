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
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(`/auth/${email}/reset_password`, fetchOptions);
  if (response.status === 204) {
    form.style.display = 'none';
    const div = document.createElement('div');
    div.innerText = 'Password changed';
    div.classList.add('flag_response');
    const enterProfile = document.createElement('button');
    enterProfile.innerText = 'Login In';
    enterProfile.addEventListener('click', () => {
      window.location.href = 'signup.html';
    });
    div.appendChild(enterProfile);
    document.querySelector('main').appendChild(div);
  }
  if (response.status === 403) {
    document.querySelector('#passwordtt').innerText = 'Incorrect password';
  }
  button.disabled = false;
});
