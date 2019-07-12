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
  const response = await fetch(`/api/v1/property/${id}`, fetchOptions);
  if (response.status === 204) {
    form.style.display = 'none';
    const div = document.createElement('div');
    div.innerText = 'We will look into it';
    div.classList.add('flag_response');
    const enterProfile = document.createElement('button');
    enterProfile.innerText = 'Go back';
    enterProfile.addEventListener('click', () => {
      window.location.href = 'user.html';
    });
    div.appendChild(enterProfile);
    document.querySelector('main').appendChild(div);
  }
});
