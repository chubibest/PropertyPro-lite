const form = document.querySelector("form");
const button = document.querySelector("button");
const displayResults = document.querySelector("#display_property");
const displayPoster = document.querySelector("#image_display");
const displayDetailsUl = document.querySelector("#data_display");
const processedForm = new FormData(form);

const submitHandler = ({
  type: { value: type },
  location: { value: location },
  price: { value: price },
  image,
  images
}) => {
  const displayDetails = detail => {
    // this function populates the result div
    // with the property details
    const listItem = document.createElement("li");
    listItem.innerText = detail;
    displayDetailsUl.appendChild(listItem);
  };
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // populate the div that display results

    displayDetails(type);
    displayDetails(location);
    displayDetails(price);

    // create open google map button
    const locationButton = document.createElement("button");
    locationButton.innerText = "View Location";
    locationButton.addEventListener("click", () => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBd-1080cYr856p-UyPz2mCW_nrZ5ajr1w&callback=initMap";
      document.body.appendChild(script);
    });

    displayResults.insertAdjacentElement("afterend", locationButton);

    // add a listener that calls the map api on  button click
    displayPoster.height = 300;
    displayPoster.width = 300;
    displayPoster.src = reader.result;
    form.style.display = "none";
  });

  reader.addEventListener("error", () => {
    alert("not load image");
  });
  reader.readAsDataURL(image.files[0]);
};

form.addEventListener("submit", e => {
  e.preventDefault();
  submitHandler(form);
});
