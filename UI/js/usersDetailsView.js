const displayDiv = document.querySelector('#display_property');
export default ({
  owner, id, image_url: src, ...rest
}) => {
  delete rest.created_on;
  const image = document.createElement('img');
  image.src = src;
  const ul = document.createElement('ul');
  ul.classList.add('ad_details_ul');
  Object.entries(rest).forEach(([key, value]) => {
    const listItem = document.createElement('li');
    const Key = key.replace(key.charAt(0), key.charAt(0).toUpperCase());
    listItem.innerText = `${Key}: ${value}`;
    ul.appendChild(listItem);
  });
  const flagButton = document.createElement('button');
  flagButton.innerHTML = 'Flag Ad';
  flagButton.classList.add('view_ad_buttons');
  flagButton.addEventListener('click', () => {
    localStorage.setItem('flag', id);
    window.location.href = 'flag.html';
  });
  ul.appendChild(flagButton);
  displayDiv.innerHTML = '';
  displayDiv.appendChild(image);
  displayDiv.appendChild(ul);
};
