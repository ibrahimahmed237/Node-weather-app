const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const getCode = require("./utils/geocode");
const getForecast = require("./utils/getForecast");

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location.
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve.
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ibrahim",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "ibrahim",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Ibrahim",
    message: "Hello how can i help u?",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  getCode.getCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      getForecast.getForecast(latitude, longitude, (error, ForecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          address: location,
          forecastData: ForecastData,
        });
      });
    }
  );
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    textMsg: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    textMsg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is on 3000 port!");
});
