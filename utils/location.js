const axios = require("axios");

const getLocation = (location) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.TOKEN}&limit=1`;

  return new Promise((resolve, reject) => {
    axios.get(url).then((response) => {
      if (response.data.features.length === 0) {
        return reject("Unable to find provided location, Please try again");
      }
      resolve({
        location: response.data.features[0].place_name,
        latitude: response.data.features[0].center[1],
        longitude: response.data.features[0].center[0],
      });
    });
  }).catch((e) => reject(e));
};

module.exports = getLocation;
