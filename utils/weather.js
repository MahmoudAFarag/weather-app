const axios = require("axios");

const getWeather = (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.KEY}&units=metric&lat=${latitude}&lon=${longitude}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve({
          city: response.data.name,
          condition: response.data.weather[0].main,
          wind: response.data.wind.speed,
          humidity: response.data.main.humidity,
          temperature: response.data.main.temp,
          icon: response.data.weather[0].icon,
        });
      })
      .catch((e) => {
        reject(e);
      });
  });
};

module.exports = getWeather;
