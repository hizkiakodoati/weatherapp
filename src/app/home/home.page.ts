import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

interface WeatherData {
  main: {
    temp: number; 
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string; 
  weather: { 
    icon: string; 
    description: string; 
  }[]; 
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  weatherTemp: WeatherData['main'] | undefined;
  todayDate = new Date();
  cityName= 'Manado';
  weatherIcon: string | undefined;
  weatherDetails: any;
  weatherDescription: string | undefined; 
  name="";

  constructor(public httpClient: HttpClient) {}

  ngOnInit() {
    this.loadData(); 
  }

  loadData() {
    if (!this.cityName) {
      console.error('City name is empty. Please provide a city name.');
      return;
    }
    this.httpClient
      .get<WeatherData>(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`)
      .subscribe(
        (results) => {
          if (results && results.weather && results.weather.length > 0) {
            this.weatherTemp = results.main;
            this.name = results.name;
            this.weatherDetails = results.weather[0];
            this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`;
            this.weatherDescription = this.weatherDetails.description;
          } else {
            console.error('Data cuaca tidak ditemukan.');
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
}
