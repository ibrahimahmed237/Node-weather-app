const request = require("request");
const getForecast = (latitude,longitude,callback) =>
{
    const url =
        "http://api.weatherstack.com/current?access_key=ed5707a7c092cfb4d3c192e8d8a46172&query=" +encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=m";
    request({ url, json: true }, (error, {body}) =>
    {
        if (error)
        {
            callback("Unable to connect the weather service!", undefined);
        } else if (body.error)
        {
            callback("Unable to find location!", undefined);
        } else
        {
            callback(undefined, {
              description: body.current.weather_descriptions[0],
              temperature: body.current.temperature,
              feelsLike: body.current.feelslike
            });
        }
    });
};
module.exports =
{
getForecast
}