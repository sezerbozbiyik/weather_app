/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forecast.js":
/*!*************************!*\
  !*** ./src/forecast.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Forecast {\r\n  constructor() {\r\n    this.apikey = \"8WAuAdA5b2SSMD8ggspdjzJpDJ02GdQ1\";\r\n    this.cityApi =\r\n      \"https://dataservice.accuweather.com/locations/v1/cities/search\";\r\n    this.weatherApi =\r\n      \"https://dataservice.accuweather.com/currentconditions/v1/\";\r\n    this.currentWeatherApi =\r\n      \"https://dataservice.accuweather.com/locations/v1/cities/geoposition/search\";\r\n    this.oneDayWeatherApi =\r\n      \"https://dataservice.accuweather.com/forecasts/v1/daily/1day/\";\r\n  }\r\n\r\n  async getGeoCity(lat, lon) {\r\n    const response = await fetch(\r\n      this.currentWeatherApi + `?apikey=${this.apikey}&q=${lat},${lon}`\r\n    );\r\n    const data = await response.json(response);\r\n    return data;\r\n  }\r\n\r\n  async getCity(city) {\r\n    const response = await fetch(\r\n      this.cityApi + `?apikey=${this.apikey}&q=${city}`\r\n    );\r\n    const data = await response.json(response);\r\n    return data[0];\r\n  }\r\n\r\n  async getWeather(cityKey) {\r\n    const response = await fetch(\r\n      this.weatherApi + cityKey + `?apikey=${this.apikey}&details=true`\r\n    );\r\n    const data = await response.json();\r\n    return data[0];\r\n  }\r\n  async getOneDayWeather(cityKey) {\r\n    const response = await fetch(\r\n      this.oneDayWeatherApi +\r\n        cityKey +\r\n        `?apikey=${this.apikey}&details=true&metric=true`\r\n    );\r\n    const data = await response.json();\r\n    return data.DailyForecasts[0];\r\n  }\r\n\r\n  async updateCityByName(city) {\r\n    const cityDto = await this.getCity(city);\r\n    const oneDayWeather = await this.getOneDayWeather(cityDto.Key);\r\n    const weatherDto = await this.getWeather(cityDto.Key);\r\n    return { cityDto, oneDayWeather, weatherDto };\r\n  }\r\n\r\n  async updateCityByLocation(lat, lon) {\r\n    const cityDto = await this.getGeoCity(lat, lon);\r\n    const oneDayWeather = await this.getOneDayWeather(cityDto.Key);\r\n    const weatherDto = await this.getWeather(cityDto.Key);\r\n    return { cityDto, oneDayWeather, weatherDto };\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Forecast);\r\n\n\n//# sourceURL=webpack://weather_app/./src/forecast.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _forecast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./forecast */ \"./src/forecast.js\");\n\r\n\r\nconst forecast = new _forecast__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\n// dom elements\r\nconst dateTime = document.querySelector(\".dateTime\");\r\nconst temp = document.querySelector(\".temp\");\r\nconst weatherCon = document.querySelector(\".desc\");\r\nconst locationBtn = document.querySelector(\".locationBtn\");\r\nconst uvText = document.querySelector(\".uv>.card-md-body\");\r\nconst windRate = document.querySelector(\".wind>.card-md-body\");\r\nconst windDirection = document.querySelector(\".wind>.card-md-footer span\");\r\nconst rainRatio = document.querySelector(\".desc span\");\r\nconst cityName = document.querySelector(\".img-text\");\r\nconst humidity = document.querySelector(\".humidity>.card-md-body\");\r\nconst visibility = document.querySelector(\".visibility>.card-md-body\");\r\nconst isDayImg = document.querySelector(\".location img\");\r\nconst searchBox = document.querySelector(\"form#search\");\r\n\r\n// change UI by\r\nconst updateUI = (data) => {\r\n  const { cityDto, oneDayWeather, weatherDto } = data;\r\n\r\n  const now = new Date();\r\n\r\n  //dom manipulation\r\n  temp.innerHTML = `${Math.round(weatherDto.Temperature.Metric.Value)}<sup>&deg;C</sup>`;\r\n  weatherCon.innerHTML = `<img src=\"img/weather/${weatherDto.WeatherText}.png\" height=\"20\" alt=\"\">\r\n  ${weatherDto.WeatherText}`;\r\n  uvText.textContent = weatherDto.UVIndex;\r\n  windRate.innerHTML = `${weatherDto.Wind.Speed.Metric.Value} <span>km/h</span>`;\r\n  windDirection.textContent = weatherDto.Wind.Direction.English;\r\n  rainRatio.textContent = oneDayWeather.Day.RainProbability + \"%\";\r\n  cityName.textContent = `${\r\n    cityDto.SupplementalAdminAreas.length > 0\r\n      ? cityDto.SupplementalAdminAreas[0].EnglishName\r\n      : ''\r\n  }(${cityDto.EnglishName}), ${cityDto.AdministrativeArea.EnglishName}, ${\r\n    cityDto.Country.EnglishName\r\n  }`;\r\n  humidity.innerHTML = `${weatherDto.RelativeHumidity} <sup>&percnt;</sup>`;\r\n  visibility.innerHTML = `${weatherDto.Visibility.Metric.Value} <span>km</span>`;\r\n\r\n  if (weatherDto.IsDayTime) {\r\n    isDayImg.setAttribute(\"src\", \"img/day.svg\");\r\n    cityName.classList.remove(\"img-text-light\");\r\n    cityName.classList.add(\"img-text-dark\");\r\n  } else {\r\n    isDayImg.setAttribute(\"src\", \"img/night.svg\");\r\n    cityName.classList.remove(\"img-text-dark\");\r\n    cityName.classList.add(\"img-text-light\");\r\n  }\r\n\r\n  console.log(data, now.toTimeString());\r\n};\r\n\r\n// get current location weather\r\nlocationBtn.addEventListener(\"click\", () => {\r\n  navigator.geolocation.getCurrentPosition((d) => {\r\n    const lat = d.coords.latitude;\r\n    const lon = d.coords.longitude;\r\n    localStorage.setItem(\"lat\", lat);\r\n    localStorage.setItem(\"lon\", lon);\r\n    localStorage.removeItem(\"city\");\r\n    forecast\r\n      .updateCityByLocation(lat, lon)\r\n      .then((data) => updateUI(data))\r\n      .catch((err) => console.log(err));\r\n  });\r\n});\r\n\r\n// get weather by search\r\nsearchBox.addEventListener(\"submit\", (e) => {\r\n  e.preventDefault();\r\n  forecast\r\n    .updateCityByName(e.target.search.value)\r\n    .then((data) => updateUI(data))\r\n    .catch((err) => console.log(err));\r\n});\r\n\r\n// // local storage update UI\r\n// if (localStorage.getItem(\"lat\") && localStorage.getItem(\"lon\")) {\r\n//   forecast\r\n//     .updateCityByLocation(\r\n//       localStorage.getItem(\"lat\"),\r\n//       localStorage.getItem(\"lon\")\r\n//     )\r\n//     .then((data) => updateUI(data))\r\n//     .catch((err) => console.log(err));\r\n// } else if (localStorage.getItem(\"city\")) {\r\n//   forecast\r\n//     .updateCityByName(localStorage.getItem(\"city\"))\r\n//     .then((data) => updateUI(data))\r\n//     .catch((err) => console.log(err));\r\n// }\r\n\n\n//# sourceURL=webpack://weather_app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;