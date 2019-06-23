// eslint-disable-next-line import/extensions
import populateResult from './details_view.js';

const form = document.querySelector('form');
const displayResults = document.querySelector('#display_property');
const displayDetailsUl = document.querySelector('#data_display');

const handleUpdate = () => {
  window.location.href = 'createad.html';
  // location.reload()
};

const handleDelete = () => {
  window.location.href = 'user.html';
  // location.reload()
};
const handleMark = (e) => {
  const listItem = document.querySelector('#listItem');
  const state = listItem.classList.toggle('sold');

  if (state) {
    e.target.innerText = 'Unmark';
    listItem.style.display = 'block';
    return;
  }
  e.target.innerText = 'Mark as sold';
  listItem.style.display = 'none';
};
// this function adds buttons unique to the agent
const generateAgentButtons = (text) => {
  const button = document.createElement('button');
  button.innerText = text;
  button.classList.add('results_button');
  displayResults.insertAdjacentElement('afterend', button);
  return button;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  populateResult(form);
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
