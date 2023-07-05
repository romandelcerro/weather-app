import { Component } from '@angular/core';
import { WeatherService } from './shared/services/weather.service';
import { WeatherData } from './shared/interfaces/weatherData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weather-app';

  location!: string;
  temp!: string;
  weatherData!: WeatherData;
  weatherDescription!: string;
  humidity!: string;
  wind!: string;
  iconCode!: string;
  search = false;
  showData = true;

  constructor(private weathersvc: WeatherService) {}

  sendForm() {
    this.weathersvc.searchWeather(this.location).subscribe({
      next: (data) => {
        this.showData = true;
        this.weatherData = data;
        this.temp =
          this.convertKelvinToCelsius(this.weatherData.main.temp).substring(
            0,
            2
          ) + '°C';

        this.humidity = this.weatherData.main.humidity.toString();
        this.weatherDescription = this.weatherData.weather[0].description;
        this.wind = (this.weatherData.wind.speed * 3.36)
          .toString()
          .substring(0, 2)
          .replace('.', '');
        this.iconCode = this.weatherData.weather[0].icon;
        this.search = true;
      },
      error: () => {
        this.search = true;
        this.showData = false;
        this.temp = 'Location not found';
      },
    });
  }

  convertKelvinToCelsius(kelvin: number): string {
    return (kelvin - 273.15).toString();
  }

  getWeatherIconUrl(): string {
    return `https://openweathermap.org/img/wn/${this.iconCode}@2x.png`;
  }
}
