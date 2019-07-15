/* eslint-disable import/extensions */
import viewSingleAd from './usersDetailsView.js';
import populateUl from './utils/populateUl.js';

const getAllButton = document.querySelector('#click_me');
const getByTypeButton = document.querySelector('#search_button');
const input = document.querySelector('#search_bar');
const displayDiv = document.querySelector('#display_property');

// query back end with or without query string
const queryBackEnd = async (e, type) => {
  e.target.disabled = true;

  const token = localStorage.getItem('token');
  const fetchOptions = {
    method: 'GET',
    headers: {
      authorization: token
    }
  };
  let url = '/api/v1/property';
  if (type) {
    url = `/api/v1/property?type=${type}`;
  }

  try {
    const response = await fetch(url, fetchOptions);
    const result = await response.json();
    return result;
  } catch (err) {
    window.location.href = 'signin.html';
  }
};

const displayUlItems = (adDetails, id) => {
  const ul = document.createElement('ul');
  ul.classList.add('ad_details_ul');
  populateUl(adDetails, ul);
  const viewAddButton = document.createElement('button');
  viewAddButton.classList.add('view_ad_buttons');
  viewAddButton.innerText = 'View Ad';
  viewAddButton.addEventListener('click', () => {
    (async () => {
      const token = localStorage.getItem('token');
      const fetchOptions = {
        method: 'GET',
        headers: {
          authorization: token
        }
      };
      const response = await fetch(`/api/v1/property/${id}`, fetchOptions);
      const { data } = await response.json();
      viewSingleAd(data);
    })();
  });
  ul.appendChild(viewAddButton);
  return ul;
};

const display = (result) => {
  displayDiv.style.display = 'grid';
  displayDiv.innerHTML = '';
  result.forEach(({
    type, image_url: src, city, state, price, id
  }) => {
    const div = document.createElement('div');
    div.classList.add('display_ad');
    const image = document.createElement('img');
    image.classList.add('thumbnail');
    image.src = src;
    const details = {
      type, city, state, price
    };
    const ul = displayUlItems(details, id);
    div.appendChild(image);
    div.appendChild(ul);
    displayDiv.appendChild(div);
  });
};

const addClickListener = (button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    const result = await queryBackEnd(e, input.value);
    display(result.data);
  });
};

addClickListener(getByTypeButton);
addClickListener(getAllButton);
