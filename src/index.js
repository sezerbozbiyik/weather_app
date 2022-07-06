import Forecast from "./forecast";
import format from "date-fns/format";
const forecast = new Forecast();

// dom elements
const weatherIcon=document.querySelector('.isDay img');
const dateTime = document.querySelector(".dateTime");
const temp = document.querySelector(".temp");
const weatherCon = document.querySelector(".desc");
const locationBtn = document.querySelector(".locationBtn");
const uvText = document.querySelector(".uv>.card-md-body");
const windRate = document.querySelector(".wind>.card-md-body");
const windDirection = document.querySelector(".wind>.card-md-footer span");
const rainRatio = document.querySelector(".desc span");
const cityName = document.querySelector(".img-text");
const humidity = document.querySelector(".humidity>.card-md-body");
const visibility = document.querySelector(".visibility>.card-md-body");
const isDayImg = document.querySelector(".location img");
const searchBox = document.querySelector("form#search");

// change UI by
const updateUI = (data) => {
  const { cityDto, oneDayWeather, weatherDto } = data;

  const now = new Date();
  const day = format(now, "EEEE");
  const time = format(now, "HH") + ":" + format(now, "mm");

  //dom manipulation
  dateTime.innerHTML = `${day}, <span>${time}</span>`;
  temp.innerHTML = `${Math.round(
    weatherDto.Temperature.Metric.Value
  )}<sup>&deg;C</sup>`;
  weatherCon.innerHTML = `<img src="img/weather/${weatherDto.WeatherIcon}.png" height="20" alt="">
  ${weatherDto.WeatherText}`;
  uvText.textContent = weatherDto.UVIndex;
  windRate.innerHTML = `${weatherDto.Wind.Speed.Metric.Value} <span>km/h</span>`;
  windDirection.textContent = weatherDto.Wind.Direction.English;
  rainRatio.textContent = oneDayWeather.Day.RainProbability + "%";
  cityName.textContent = `${
    cityDto.SupplementalAdminAreas.length > 0
      ? cityDto.SupplementalAdminAreas[0].EnglishName
      : ""
  }(${cityDto.EnglishName}), ${cityDto.AdministrativeArea.EnglishName}, ${
    cityDto.Country.EnglishName
  }`;
  humidity.innerHTML = `${weatherDto.RelativeHumidity} <sup>&percnt;</sup>`;
  visibility.innerHTML = `${weatherDto.Visibility.Metric.Value} <span>km</span>`;
  weatherIcon.setAttribute('src','img/weather/'+weatherDto.WeatherIcon+'.png')

  if (weatherDto.IsDayTime) {
    isDayImg.setAttribute("src", "img/day.svg");
    cityName.classList.remove("img-text-light");
    cityName.classList.add("img-text-dark");
  } else {
    isDayImg.setAttribute("src", "img/night.svg");
    cityName.classList.remove("img-text-dark");
    cityName.classList.add("img-text-light");
  }

  console.log(data, now.toTimeString());
};

// get current location weather
locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((d) => {
    const lat = d.coords.latitude;
    const lon = d.coords.longitude;
    localStorage.setItem("lat", lat);
    localStorage.setItem("lon", lon);
    localStorage.removeItem("city");
    forecast
      .updateCityByLocation(lat, lon)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  });
});

// get weather by search
searchBox.addEventListener("submit", (e) => {
  e.preventDefault();
  forecast
    .updateCityByName(e.target.search.value)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});

// // local storage update UI
// if (localStorage.getItem("lat") && localStorage.getItem("lon")) {
//   forecast
//     .updateCityByLocation(
//       localStorage.getItem("lat"),
//       localStorage.getItem("lon")
//     )
//     .then((data) => updateUI(data))
//     .catch((err) => console.log(err));
// } else if (localStorage.getItem("city")) {
//   forecast
//     .updateCityByName(localStorage.getItem("city"))
//     .then((data) => updateUI(data))
//     .catch((err) => console.log(err));
// }
