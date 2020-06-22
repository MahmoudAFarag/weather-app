const axios = require("axios");

const getLocation = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;

  axios
    .get(url, {
      params: {
        access_token: "pk.eyJ1IjoibWFobW91ZC1hc2hyYWYiLCJhIjoiY2tibXNweXUzMHNkNzJ1cjVjdHdwN2xreiJ9.2XyG_GfLiW6NXvLjRYctIw",
        limit: 1,
      },
    })
    .then((response) => {
      if (response.data.features.length === 0) {
        callback("Unable to find provided location, Please try again", undefined);
      } else {
        callback(undefined, {
          Location: response.data.features[0].place_name,
          Latitude: response.data.features[0].center[1],
          Longitude: response.data.features[0].center[0],
        });
      }
    })
    .catch((err) => callback("Unable to connect to server, please check your connection", undefined));
};

module.exports = getLocation;

// getLocation("New York", (error, data) => {
//   console.log(error);
//   console.log(data);
// });
