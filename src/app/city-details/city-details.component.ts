import { Component, OnInit, Input } from '@angular/core';
import { City } from '../city';
import { CityDataService } from '../city-data.service';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css'],
})
export class CityDetailsComponent implements OnInit {
  @Input() city: City;

  public googleAPIKey: string = '';
  constructor() {}

  ngOnInit(): void {}
}
