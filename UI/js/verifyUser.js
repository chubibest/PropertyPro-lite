const signIn = document.querySelector("#sign_in")
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  location.href = 'user.html'
})