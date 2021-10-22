function showDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = document.querySelector("#tempNow");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let dateNow = document.querySelector("#date");
  dateNow.innerHTML = showDate(response.data.dt * 1000);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
  celcius = response.data.main.temp;
}

function search(city) {
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  search(searchBar.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySubmit);

function showFahrenheit(event) {
  event.preventDefault();
  celciusTemp.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperature = document.querySelector("#tempNow");
  let fahrenheitTemperature = (celcius * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
let celcius = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelcius(event) {
  event.preventDefault();
  celciusTemp.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#tempNow");
  temperature.innerHTML = Math.round(celcius);
}

let celciusTemp = document.querySelector("#celcius");
celciusTemp.addEventListener("click", showCelcius);

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forcastDays = ["Fri", "Sat", "Sun", "Mon", "Tue"];

  forcastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
<div class="col-2">
<div class="weatherDate">${day}</div>
  <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="40px">

  <span class="topTemp">18</span> <span class="bottomTemp">12</span>
</div> `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

search("London");
