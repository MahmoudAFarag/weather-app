require("dotenv").config();
// NPM requires
const express = require("express");
const getWeather = require("./utils/weather");
const getLocation = require("./utils/location");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  try {
    const geolocation = await getLocation(req.body.location);
    const { latitude, longitude } = geolocation;
    const weather = await getWeather(latitude, longitude);
    res.render("result", {
      icon: weather.icon,
      city: weather.city,
      condition: weather.condition,
      wind: weather.wind,
      humidity: weather.humidity,
      temp: Math.round(weather.temperature),
    });
  } catch (e) {
    res.send(`${e}`);
  }
});

app.get("*", (req, res) => res.render("404"));

app.listen(port, () => console.log(`Connected to server on port ${port}`));
