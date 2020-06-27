require("dotenv").config();
// NPM requires
const express = require("express");
const getWeather = require("./utils/weather");
const getLocation = require("./utils/location");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const geolocation = await getLocation(req.query.address);
    const { latitude, longitude, location } = geolocation;
    const weather = await getWeather(latitude, longitude);
    res.send({ location, weather });
  } catch (e) {
    res.send(`${e}`);
  }
});

app.listen(port, () => console.log(`Connected to server on port ${port}`));
