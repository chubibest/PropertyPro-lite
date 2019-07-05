/* eslint-disable import/extensions */
import {
  handleDelete, handleMark, handleUpdate, generateAgentButtons
} from './utils/agentUtils.js';
import callmap from './utils/callmap.js';

const displayResults = document.querySelector('#display_property');
const displayDetailsUl = document.querySelector('#data_display');
const displayPoster = document.querySelector('#image_display');
const form = document.querySelector('form');
const buttonsDiv = document.querySelector('#populateButtons');

const displayDetails = (detail) => {
  const listItem = document.createElement('li');
  listItem.innerText = `${Object.keys(detail)[0]}: ${Object.values(detail)[0]}.`;
  displayDetailsUl.appendChild(listItem);
  return listItem;
};

export default ({
  type: { value: Type },
  address: { value: Address },
  city: { value: City },
  state: { value: State },
  price: { value: Price }
}, source) => {
  displayPoster.src = source;
  displayPoster.addEventListener('load', () => {
    // populate the div that display results
    form.style.display = 'none';
    displayDetails({ Type });
    displayDetails({ Price });
    displayDetails({ City });
    displayDetails({ State });
    displayDetails({ Address });

    displayResults.style.display = 'grid';
    // create open google map button
    const locationButton = callmap(displayResults);
    buttonsDiv.appendChild(locationButton);

    const listItem = document.createElement('li');
    listItem.innerText = 'Sold';
    listItem.style.color = '#00FF00';
    listItem.style.fontWeight = 'bolder';
    listItem.style.display = 'none';
    listItem.id = ('listItem');
    displayDetailsUl.appendChild(listItem);

    generateAgentButtons('Delete Ad').addEventListener('click', handleDelete);
    generateAgentButtons('Update Ad').addEventListener('click', handleUpdate);
    generateAgentButtons('Mark as sold').addEventListener('click', (e) => {
      handleMark(e);
    });
  });
};
