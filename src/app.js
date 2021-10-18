let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

function showTemperature(response) {
  console.log(response.data);
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
}
axios.get(apiUrl).then(showTemperature);
