const buttonsDiv = document.querySelector('#populateButtons');

const handleDelete = async ({ id }) => {
  const token = localStorage.getItem('token');
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  };
  const response = await fetch(`/property/${id}`, fetchOptions);
  if (response.status === 204) {
    window.location.href = 'user.html';
  }
};
const handleMark = async ({ id }, e) => {
  const token = localStorage.getItem('token');
  const fetchOptions = {
    method: 'PATCH',
    headers: {
      authorization: token
    }
  };
  const response = await fetch(`/property/${id}/sold`, fetchOptions);
  const { data: { status } } = await response.json();
  const displayLi = document.getElementById('5');
  displayLi.innerText = status;
  e.target.innerText = status === 'Sold' ? 'Unmark' : 'Mark as sold';
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
  handleDelete, handleMark, generateAgentButtons
};
