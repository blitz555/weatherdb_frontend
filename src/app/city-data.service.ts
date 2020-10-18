import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from './city';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityDataService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = environment.apiBaseUrl;

  public getMap(): any {
    const url: string = `${this.apiBaseUrl}/map`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response)
      .catch(this.handleError);
  }

  public getCity(lat: number, lng: number): Promise<City> {
    const url: string = `${this.apiBaseUrl}/city/coords?lng=${lng}&lat=${lat}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as City)
      .catch(this.handleError);
  }

  public getLocationByNameCountry(location: string): Promise<City> {
    const url: string = `${this.apiBaseUrl}/city/${location}`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as City)
      .catch(this.handleError);
  }

  public getCities(): Promise<City[]> {
    const url: string = `${this.apiBaseUrl}/cities`;
    return this.http
      .get(url)
      .toPromise()
      .then((response) => response as City[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
