import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public pageContent = {
    header: {
      title: 'WeatherDB',
      strapline: 'Compare weather data between multiple cities.',
    },
    sidebar: '',
  };
}
