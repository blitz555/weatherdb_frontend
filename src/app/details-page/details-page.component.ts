import { Component, OnInit } from '@angular/core';
import { CityDataService } from '../city-data.service';
import { City } from '../city';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent implements OnInit {
  constructor(
    private cityDataService: CityDataService,
    private route: ActivatedRoute
  ) {}
  newCity: City;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('location');
          return this.cityDataService.getLocationByNameCountry(id);
        })
      )
      .subscribe((newCity: City) => {
        this.newCity = newCity;
        this.pageContent.header.title = newCity.location;
        console.log(this.newCity);
      });
  }

  public pageContent = {
    header: {
      title: '',
      strapline: '',
    },
    sidebar: '',
  };
}
