const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {};
  const formData = new FormData(e.target);
  formData.forEach((value, key) => { data[key] = value; });
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('/api/v1/auth/signup', fetchOptions);
  const result = await response.json();

  if (result.statusCode === 409) {
    document.querySelector('input[name=username]+ small').textContent = 'user already exists';
    return;
  }
  localStorage.setItem('token', result.data.token);
  window.location.href = 'user.html';
});
