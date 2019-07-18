const button = document.querySelector('#submit_email_button');
const input = document.querySelector('#email');
const form = document.querySelector('#email_form');
const div = document.querySelector('#go_home');
button.addEventListener('click', async () => {
  button.disabled = true;
  const email = input.value;
  const fetchOptions = {
    method: 'POST'
  };
  const response = await fetch(`/auth/${email}/reset_password`, fetchOptions);
  if (response.status) {
    form.style.display = 'none';
    div.style.display = 'block';
  }
  button.disabled = false;
});
