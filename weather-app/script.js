const apiKey = "290c8ec9b81f3160b9f3991bd5748164";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});
async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}&q=${cityValue}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City is not available at the moment");
    }
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)} °C`,
      `Humidity:${data.main.humidity} %`,
      `Wind speed:${data.wind.speed} m/s`,
    ];
    weatherDataEl.querySelector(".icon").innerHTML = `<img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="weather/sun icon" />`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;
    weatherDataEl.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "This city doesnt exist, Please spell correctly !";
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
