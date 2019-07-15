/* eslint-disable import/extensions */
import {
  handleDelete, handleMark, generateAgentButtons
} from './utils/agentUtils.js';
import handleUpdate from './utils/handleUpdate.js';
import callmap from './utils/callmap.js';

const displayResults = document.querySelector('#display_property');
const displayDetailsUl = document.querySelector('#data_display');
const displayPoster = document.querySelector('#image_display');
const form = document.querySelector('form');
const updateForm = document.querySelector('#update_Form');
const buttonsDiv = document.querySelector('#populateButtons');

const displayDetails = (ad) => {
  const {
    type, price, city, state, address, status
  } = ad;
  const usefulFieslds = [
    { Type: type },
    { Price: price },
    { City: city },
    { State: state },
    { Address: address },
    { Status: status }
  ];
  const caller = localStorage.getItem('caller');
  if (caller === 'post') {
    usefulFieslds.forEach((detail, index) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${Object.keys(detail)}: ${Object.values(detail)}.`;
      listItem.id = index.toString();
      displayDetailsUl.appendChild(listItem);
    });
    generateAgentButtons('Delete Ad').addEventListener('click', () => { handleDelete(ad); });
    generateAgentButtons('Update Ad').addEventListener('click', () => { handleUpdate(ad); });
    generateAgentButtons('Mark as sold').addEventListener('click', (e) => {
      handleMark(ad, e);
    });
    const locationButton = callmap(displayResults);
    buttonsDiv.appendChild(locationButton);
    return;
  }
  usefulFieslds.forEach((detail, index) => {
    const listItem = document.getElementById(index.toString());
    listItem.innerText = `${Object.keys(detail)}: ${Object.values(detail)}.`;
  });
};

export default ({ image_url: src, ...ad }) => {
  displayPoster.src = src;
  displayPoster.addEventListener('load', () => {
    form.style.display = 'none';
    updateForm.style.display = 'none';
    displayDetails(ad);
    displayResults.style.display = 'grid';
  });
};
