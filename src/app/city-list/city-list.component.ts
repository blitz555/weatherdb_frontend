import { Component, OnInit } from '@angular/core';
import { CityDataService } from '../city-data.service';
import { GeolocationService } from '../geolocation.service';
import { City } from '../city';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent implements OnInit {
  constructor(
    private cityDataService: CityDataService,
    private geolocationService: GeolocationService
  ) {}

  public city: City;

  public message: string;

  public getCityFromGeolocation(): void {
    this.message = 'Getting your location ...';
    this.geolocationService.getPosition(
      this.getCity.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }

  private getCity(position: any): void {
    this.message = 'Searching for city weather data...';
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;
    this.cityDataService
      .getCity(lat, lng)
      .then((dbCity) => (this.city = dbCity));
  }

  private showError(error: any): void {
    this.message = error.message;
  }

  private noGeo(): void {
    this.message = 'Geolocation is not supported by this browser.';
  }

  ngOnInit(): void {
    this.getCityFromGeolocation();
  }
}
