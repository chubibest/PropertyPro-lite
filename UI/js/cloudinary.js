/* eslint-disable import/extensions */
import {
  handleDelete, handleMark, handleUpdate, generateAgentButtons
} from './utils/agentUtils.js';
import callmap from './utils/callmap.js';

const displayResults = document.querySelector('#display_property');
const displayDetailsUl = document.querySelector('#data_display');
const form = document.querySelector('form');
const buttonsDiv = document.querySelector('#populateButtons');

const upload = async ({
  type: { value: Type },
  location: { value: Location },
  price: { value: Price },
  image
}) => {
  const displayDetails = (detail) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${Object.keys(detail)[0]}: ${Object.values(detail)[0]}.`;
    displayDetailsUl.appendChild(listItem);
    return listItem;
  };
  const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxe6fnkgw/image/upload';
  const UPLOAD_PRESET = 'hrybdt7v';
  const formData = new FormData();
  formData.append('file', image.files[0]);
  formData.append('upload_preset', UPLOAD_PRESET);
  const options = {
    method: 'POST',
    mode: 'cors',
    body: formData
  };
  fetch(UPLOAD_URL, options).then(data => data.json())
    .then((data) => {
      const displayPoster = document.querySelector('#image_display');
      displayPoster.src = `https://res.cloudinary.com/dxe6fnkgw/image/upload/w_300,h_300/v${data.version}/${data.public_id}.${data.format}`;
      displayPoster.addEventListener('load', () => {
        // populate the div that display results
        form.style.display = 'none';
        displayDetails({ Type });
        displayDetails({ Location });
        displayDetails({ Price });

        displayResults.style.display = 'grid';
        // create open google map button
        const locationButton = callmap(displayResults);
        buttonsDiv.appendChild(locationButton);

        generateAgentButtons('Delete Ad').addEventListener('click', handleDelete);
        generateAgentButtons('Update Ad').addEventListener('click', handleUpdate);
        generateAgentButtons('Mark as sold').addEventListener('click', (error) => {
          handleMark(error);
        });
      });
    });
};

export default upload;
