import Forecast from "./forecast";
import format from "date-fns/format";
import { intervalToDuration } from "date-fns";
const forecast = new Forecast();

// dom elements
const weatherIcon = document.querySelector(".isDay img");
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
const sunrise = document.querySelector(".sunrise-text>span:first-child");
const sunriseInterval = document.querySelector(".sunrise-text>span:last-child");
const sunset = document.querySelector(".sunset-text>span:first-child");
const sunsetInterval = document.querySelector(".sunset-text>span:last-child");
const weekCards = document.querySelector(".week-cards");

// change UI by
const updateUI = (data) => {
  // create manipule variables
  const { cityDto, oneDayWeather, weatherDto,fiveDayWeather } = data;
  const now = new Date(weatherDto.LocalObservationDateTime.slice(0, 19));
  const day = format(now, "EEEE");
  const time = format(now, "HH") + ":" + format(now, "mm");
  const sunsetTime = new Date(oneDayWeather.Sun.Set.slice(0, 19));
  const sunriseTime = new Date(oneDayWeather.Sun.Rise.slice(0, 19));

  //dom manipulation
  
  createFiveDayHtml(fiveDayWeather);
  
  sunrise.textContent = format(sunriseTime, "p");
  sunriseInterval.textContent = getSunriseTime(sunriseTime, now);

  sunset.textContent = format(sunsetTime, "p");
  sunsetInterval.textContent = getSunsetTime(sunsetTime, now);

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

  weatherIcon.setAttribute(
    "src",
    "img/weather/" + weatherDto.WeatherIcon + ".png"
  );

  if (weatherDto.IsDayTime) {
    isDayImg.setAttribute("src", "img/day.svg");
    cityName.classList.remove("img-text-light");
    cityName.classList.add("img-text-dark");
  } else {
    isDayImg.setAttribute("src", "img/night.svg");
    cityName.classList.remove("img-text-dark");
    cityName.classList.add("img-text-light");
  }
};

// get current location weather
locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((d) => {
    const lat = d.coords.latitude;
    const lng = d.coords.longitude;
    localStorage.setItem("lat", lat);
    localStorage.setItem("lng", lng);
    localStorage.removeItem("city");
    forecast
      .updateCityByLocation(lat, lng)
      .then((data) => updateUI(data))
      .catch((err) => console.log(err));
  });
});

// get weather by search
searchBox.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = e.target.search.value.trim();
  localStorage.removeItem("lat");
  localStorage.removeItem("lng");
  localStorage.setItem("city", cityName);
  forecast
    .updateCityByName(cityName)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
  searchBox.submit();
});

// // local storage update UI
if (localStorage.getItem("lat") && localStorage.getItem("lng")) {
  forecast
    .updateCityByLocation(
      localStorage.getItem("lat"),
      localStorage.getItem("lng")
    )
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
} else if (localStorage.getItem("city")) {
  forecast
    .updateCityByName(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

// another function clean code refactor
const getSunsetTime = (sunset, now) => {
  let info = "";
  now > sunset ? (info = "+") : (info = "-");
  const sunsetTime = new Date(sunset);
  const intervalSunset = intervalToDuration({ start: now, end: sunsetTime });

  return intervalSunset.hours > 0
    ? info + intervalSunset.hours + "h " + intervalSunset.minutes + "m"
    : info + intervalSunset.minutes + "m";
};

const getSunriseTime = (sunrise, now) => {
  let info = "";
  now > sunrise ? (info = "+") : (info = "-");
  const sunriseTime = new Date(sunrise);
  const intervalSunrise = intervalToDuration({ start: now, end: sunriseTime });

  return intervalSunrise.hours > 0
    ? info + intervalSunrise.hours + "h " + intervalSunrise.minutes + "m"
    : info + intervalSunrise.minutes + "m";
};

// forecast
//   .getFiveDayWeather(3558515)
//   .then((d) => {
//     console.log(d);
//     createFiveDayHtml(d);
//   })
//   .catch((err) => console.log(err));

// create 5 day html template
const createFiveDayHtml = (data) => {
  let html = "";
  data.forEach((d) => {
    html += `<div class="card-sm">
    <span class="card-sm-title">${format(new Date(d.Date), "EE")}</span>
    <img src="img/weather/${d.Day.Icon}.png" height="35" alt="">
    <span class="card-sm-footer">${Math.round(
      d.Temperature.Maximum.Value
    )}&deg; <span class="text-muted">${Math.round(
      d.Temperature.Minimum.Value
    )}&deg;</span> </span>
</div>`;
  });
  weekCards.innerHTML = html;
};
