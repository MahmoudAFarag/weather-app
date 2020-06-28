const button = document.querySelector("#userLocation");
const input = document.querySelector("#location");

button.onclick = () => {
  navigator.geolocation.getCurrentPosition((response, err) => {
    if (err) {
      return alert("Error Occured");
    }
    let latitude = response.coords.latitude;
    let longitude = response.coords.longitude;
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${latitude},${longitude}.json?access_token=${apikey}&limit=1`).then((data) => {
      data.json().then((place) => {
        input.value = place.features[0].text;
      });
    });
  });
};
