
const updateForm = document.querySelector('#update_Form');
const createForm = document.querySelector('#create_ad_form');
const displayResults = document.querySelector('#display_property');

export default ({
  type,
  city,
  state,
  address,
  price,
  id
}) => {
  updateForm.style.display = 'block';
  createForm.style.display = 'none';
  displayResults.style.display = 'none';

  updateForm.type.value = type;
  updateForm.city.value = city;
  updateForm.state.value = state;
  updateForm.address.value = address;
  updateForm.price.value = price;
  localStorage.setItem('id', id);
};
