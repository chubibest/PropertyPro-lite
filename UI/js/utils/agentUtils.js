const buttonsDiv = document.querySelector('#populateButtons');
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
  buttonsDiv.appendChild(button);
  return button;
};

export {
  handleDelete, handleMark, handleUpdate, generateAgentButtons
};
