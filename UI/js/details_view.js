const button = document.querySelector("button");
const displayResults = document.querySelector("#display_property");
const displayPoster = document.querySelector("#image_display");
const displayDetailsUl = document.querySelector("#data_display");
const form = document.querySelector("form")



export default ({
  type: { value: Type },
  location: { value: Location },
  price: { value: Price },
  image
}) => {

    const displayDetails =  detail => {
    const listItem = document.createElement("li");
    listItem.innerText = `${Object.keys(detail)[0]}: ${Object.values(detail)[0]}.`;
    displayDetailsUl.appendChild(listItem);
    return listItem;
  };

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // populate the div that display results

   displayDetails({Type});
   displayDetails({Location});
   displayDetails({Price});
    
    // create open google map button
    const locationButton = document.createElement("button");
    locationButton.innerText = "View Location";
    locationButton.classList.add('results_button')
    locationButton.addEventListener("click", () => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBd-1080cYr856p-UyPz2mCW_nrZ5ajr1w&callback=initMap";
      document.body.appendChild(script);
    });
    displayResults.style.display = "grid"
    displayResults.insertAdjacentElement("afterend", locationButton);

    // add a listener that calls the map api on  button click
    displayPoster.height = 300;
    displayPoster.width = 300;
    displayPoster.src = reader.result;
    form.style.display = "none";
  })
   reader.addEventListener("error", () => {
    alert("not load image");
  });
  reader.readAsDataURL(image.files[0]);
};
