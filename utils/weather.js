const axios = require("axios");

const getWeather = (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.KEY}&units=metric&lat=${latitude}&lon=${longitude}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const { temp, humidity } = response.data.main;
        const city = response.data.name;
        resolve(`It is currently ${temp} degrees with ${humidity} percent humidity in ${city}`);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

module.exports = getWeather;
