export default (form, page) => {
  let resText;
  let buttonText;
  if (page === 'user.html') {
    resText = 'We will look into it';
    buttonText = 'Go back';
  } else {
    resText = 'Password changed';
    buttonText = 'Login in';
  }
  form.style.display = 'none';
  const div = document.createElement('div');
  div.innerText = resText;
  div.classList.add('flag_response');
  const redirectButton = document.createElement('button');
  redirectButton.innerText = buttonText;
  redirectButton.addEventListener('click', () => {
    window.location.href = page;
  });
  div.appendChild(redirectButton);
  document.querySelector('main').appendChild(div);
};
