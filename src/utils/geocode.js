const request = require("request");
const getCode = (address, callback) => {
const url =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  encodeURIComponent(address) +
  ".json?access_token=pk.eyJ1IjoiaWJyYWhpbWFobWVkMjMiLCJhIjoiY2xlenQ5bXc1MDBpZzNwcDd3bGx1MzJzaSJ9.ToN9TQTl1HEJBAcp2Uv0Tg&limit=1";
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect the location service!", undefined);
    } else if (body.features.length == 0) {
      callback("Unable to find the location! Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = {
    getCode
}