const form = document.querySelector('form');

const handlerResults = (result) => {
  switch (result.statusCode) {
    case (200):
      localStorage.setItem('token', result.data.token);
      window.location.href = 'user.html';
      break;
    case (404):
      document.querySelector('#usernamett').textContent = 'User does not exist';
      break;
    case (401):
      document.querySelector('#passwordtt').textContent = 'Incorrect password';
      break;
    default:
      window.location.reload();
  }
};
form.addEventListener('submit', (e) => {
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
  fetch('/auth/signin', fetchOptions)
    .then(res => res.json())
    .then((result) => {
      handlerResults(result);
    })
    .catch(() => {
      window.location.reload();
    });
});
