export default (obj, ul) => {
  Object.entries(obj).forEach(([key, value]) => {
    const li = document.createElement('li');
    const Key = key.replace(key.charAt(0), key.charAt(0).toUpperCase());
    li.innerText = `${Key}: ${value}`;
    if (key === 'price') {
      li.innerText = `${Key}: #${value}`;
    }
    ul.appendChild(li);
  });
};
