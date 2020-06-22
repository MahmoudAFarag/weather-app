const axios = require("axios");

const getForecast = (longitude, latitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather`;

  axios
    .get(url, {
      params: {
        appid: "e72ca729af228beabd5d20e3b7749713",
        units: "metric",
        lon: longitude,
        lat: latitude,
      },
    })
    .then((response) => {
      const temperature = response.data.main.temp;
      const humidity = response.data.main.humidity;
      const city = response.data.name;

      callback(undefined, `It is currently ${temperature} degrees with ${humidity} percent humidity in ${city}`);
    })
    .catch((err) => {
      if (err.response.status >= 400) {
        callback("Location Not Found", undefined);
      } else {
        callback("Please Check Your Internet connection", undefined);
      }
    });
};

module.exports = getForecast;
