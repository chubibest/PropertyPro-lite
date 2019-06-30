
export default (displayDiv) => {
  const locationButton = document.createElement('button');
  locationButton.innerText = 'View Location';
  locationButton.classList.add('results_button');
  locationButton.addEventListener('click', () => {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBd-1080cYr856p-UyPz2mCW_nrZ5ajr1w&callback=initMap';
    document.body.appendChild(script);
    displayDiv.style.display = 'none';
  });
  return locationButton;
};
