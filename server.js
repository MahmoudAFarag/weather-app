// Local requires
const getForecast = require("./utils/forecast");
const getLocation = require("./utils/geocode");

// NPM requires
const express = require("express");

const app = express();

// Define Template Engine
app.set("view engine", "ejs");

// Assigning static files to express
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address !",
    });
  }
  getLocation(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    getForecast(data.Longitude, data.Latitude, (error, forecast) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast,
        location: data.Location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not Found",
  });
});

app.listen(3000, () => console.log("Connected to server on port 3000"));
