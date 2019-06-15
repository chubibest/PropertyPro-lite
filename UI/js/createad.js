const form = document.querySelector('form');
const button = document.querySelector('button');
const displayPoster = document.querySelector('#image_display');
const displayDetailsUl = document.querySelector('#data_display')
const processedForm = new FormData(form);


const submitHandler =  ({type:{value: type}, location: {value: location},price:{value: price}, image, images}) => {
  console.log(type, location,price, image,images)
 const displayDetails = (detail) => {
  const listItem = document.createElement('li')
  listItem.innerText = detail
  displayDetailsUl.appendChild(listItem);
 }
const reader = new FileReader()
  reader.addEventListener("load", () => {
    displayDetails(type)
    displayDetails(location)
    displayDetails(price)
    displayPoster.src = reader.result;
    form.style.display = 'none'
});
    reader.addEventListener('error',()=>{
      alert('not load image')
    })
  reader.readAsDataURL(image.files[0]);
  
}



form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitHandler(form)
})
