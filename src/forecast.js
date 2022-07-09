class Forecast {
  constructor() {
    this.apikey = "UkGBeo0pMytGsUBGhspg0hDhhWCIjxGT";
    this.cityApi =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
    this.weatherApi =
      "https://dataservice.accuweather.com/currentconditions/v1/";
    this.currentWeatherApi =
      "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
    this.oneDayWeatherApi =
      "https://dataservice.accuweather.com/forecasts/v1/daily/1day/";
    this.fiveDayWeatherApi =
      "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  }

  async getFiveDayWeather(cityKey) {
    const response = await fetch(
      this.fiveDayWeatherApi +
        cityKey +
        `?apikey=${this.apikey}&details=true&metric=true`
    );
    const data = await response.json(response);
    return data.DailyForecasts;
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
    const data = await response.json(response);
    return data[0];
  }
  async getOneDayWeather(cityKey) {
    const response = await fetch(
      this.oneDayWeatherApi +
        cityKey +
        `?apikey=${this.apikey}&details=true&metric=true`
    );
    const data = await response.json(response);
    return data.DailyForecasts[0];
  }

  async updateCityByName(city) {
    const cityDto = await this.getCity(city);
    const oneDayWeather = await this.getOneDayWeather(cityDto.Key);
    const weatherDto = await this.getWeather(cityDto.Key);
    const fiveDayWeather=await this.getFiveDayWeather(cityDto.Key);
    return { cityDto, oneDayWeather, weatherDto ,fiveDayWeather};
  }

  async updateCityByLocation(lat, lon) {
    const cityDto = await this.getGeoCity(lat, lon);
    const oneDayWeather = await this.getOneDayWeather(cityDto.Key);
    const weatherDto = await this.getWeather(cityDto.Key);
    const fiveDayWeather = await this.getFiveDayWeather(cityDto.Key);
    return { cityDto, oneDayWeather, weatherDto, fiveDayWeather};
  }
}

export default Forecast;
