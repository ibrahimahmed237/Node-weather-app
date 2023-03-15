const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(
    "http://localhost:3000/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }

      messageOne.textContent = data.address;
      messageTwo.textContent = `Description: ${data.forecastData.description}, Temperature: ${data.forecastData.temperature} C, Feels like ${data.forecastData.feelsLike} C `;
    });
  });
});
