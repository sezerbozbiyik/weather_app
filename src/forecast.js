class Forecast {
  constructor() {
    this.apikey = "eeUZrDJvHRpNC4tmuGAVoXIrVfGvaNCK";
    this.cityApi =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    this.weatherApi =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.currentWeatherApi =
      "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
    this.oneDayWeatherApi =
      "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";
  }

  async getGeoCity(lat, lon) {
    const response = await fetch(
      this.currentWeatherApi + `?apikey=${this.apikey}&q=${lat},${lon}`
    );
    const data = await response.json(response);
    return data;
  }

  async getCity(city) {
    const response = await fetch(
      this.cityApi + `?apikey=${this.apikey}&q=${city}`
    );
    const data = await response.json(response);
    return data[0];
  }

  async getWeather(cityKey) {
    const response = await fetch(
      this.weatherApi + cityKey + `?apikey=${this.apikey}&details=true`
    );
    const data = await response.json();
    return data[0];
  }
  async getOneDayWeather(cityKey) {
    const response = await fetch(
      this.oneDayWeatherApi +
        cityKey +
        `?apikey=${this.apikey}&details=true&metric=true`
    );
    const data = await response.json();
    return data.DailyForecasts[0];
  }

  async updateCityByName(city) {
    const cityDto = await this.getCity(city);
    const oneDayWeather = await this.getOneDayWeather(cityDto.Key);
    const weatherDto = await this.getWeather(cityDto.Key);
    return { cityDto, oneDayWeather, weatherDto };
  }

  async updateCityByLocation(lat, lon) {
    const cityDto = await this.getGeoCity(lat, lon);
    const oneDayWeather = await this.getOneDayWeather(cityDto.Key);
    const weatherDto = await this.getWeather(cityDto.Key);
    return { cityDto, oneDayWeather, weatherDto };
  }
}

export default Forecast;
