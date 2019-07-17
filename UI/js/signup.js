const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {};
  const formData = new FormData(e.target);
  formData.forEach((value, key) => { data[key] = value; });
  console.log(data);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const response = await fetch('/auth/signup', fetchOptions);
  const result = await response.json();
  if (result.error === 'email already exists') {
    document.querySelector('input[name=email]+ small').textContent = 'email already exists';
    return;
  }
  localStorage.setItem('token', result.data.token);
  window.location.href = 'user.html';
});
