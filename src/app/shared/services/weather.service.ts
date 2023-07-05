import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from '../interfaces/weatherData.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5';

  apiKey = 'ae9f66271036acce2c710198ea2dd906';

  constructor(private http: HttpClient) {}

  searchWeather(query: string) {
    const filter = `${this.url}/weather?q=${query}&appid=${this.apiKey}`;
    return this.http.get<WeatherData>(filter);
  }
}
