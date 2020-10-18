import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CityDataService } from '../city-data.service';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

@Component({
  selector: 'app-map',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(private cityDataService: CityDataService) {}

  public map: any;
  public cities: {
    location: string;
    id: string;
    long: number;
    lat: number;
  }[] = [];
  private svg: any;
  private margin = 20;
  private width = 825;
  private height = 500;

  public removeInvalidChars(str: string): string {
    return str.replace(/[ ,]+/g, '_');
  }

  private drawGlobe(): void {
    let width = (d3.select('#globe').node() as any).getBoundingClientRect()
      .width;
    let height = 500;
    const sensitivity = 75;
    let projection = d3
      .geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2]);
    const initialScale = projection.scale();
    let path = d3.geoPath().projection(projection);
    let svg = d3
      .select('#globe')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let globe = svg
      .append('circle')
      .attr('fill', '#EEE')
      .attr('stroke', '#000')
      .attr('stroke-width', '0.2')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', initialScale);

    Promise.all<any, any>([
      this.cityDataService.getMap(),
      this.cityDataService.getCities(),
    ]).then((values) => {
      this.map = values[0];
      //draw map
      let map = svg
        .append('g')
        .selectAll('path')
        .data(topojson.feature(this.map, this.map.objects.countries).features)
        .enter()
        .append('path')
        .attr('class', 'countries')
        .attr('d', path);
      for (const city of values[1]) {
        let cityobj = {
          location: city.location,
          id: this.removeInvalidChars(city.location),
          long: city.coords.coordinates[0],
          lat: city.coords.coordinates[1],
        };
        this.cities.push(cityobj);
      }
      //add labels, change to add label only when mouseover, but do not remove
      svg
        .selectAll('text')
        .data(this.cities)
        .enter()
        .append('text')
        .attr('id', function (d) {
          return d.id;
        })
        .text(function (d) {
          return d.location;
        })
        .attr('x', function (d) {
          return projection([d.long, d.lat])[0] + 2;
        })
        .attr('y', function (d) {
          return projection([d.long, d.lat])[1];
        })
        .attr('class', 'labels');

      //draw points
      svg
        .selectAll('circle')
        .data(this.cities)
        .enter()
        .append('circle')
        .attr('class', 'circles')
        .attr('cx', function (d) {
          return projection([d.long, d.lat])[0];
        })
        .attr('cy', function (d) {
          return projection([d.long, d.lat])[1];
        })
        .on('mouseenter', function (d) {
          d3.select('#' + d.id).classed('active', true);
        })
        .on('mouseout', function (d) {
          d3.select('#' + d.id).classed('active', false);
        });

      svg
        .call(
          d3.drag().on('drag', () => {
            console.log('drag');
            const rotate = projection.rotate();
            const k = sensitivity / projection.scale();
            projection.rotate([
              rotate[0] + d3.event.dx * k,
              rotate[1] - d3.event.dy * k,
            ]);
            path = d3.geoPath().projection(projection);
            svg.selectAll('path').attr('d', path);
            svg.selectAll('circles').attr('d', path);
          })
        )
        .call(
          d3.zoom().on('zoom', () => {
            console.log('zoom');
            if (d3.event.transform.k > 0.3) {
              projection.scale(initialScale * d3.event.transform.k);
              path = d3.geoPath().projection(projection);
              svg.selectAll('path').attr('d', path);
              globe.attr('r', projection.scale());
            } else {
              d3.event.transform.k = 0.3;
            }
          })
        );
    });
  }

  private drawMap(): void {
    this.svg = d3
      .select('figure#map')
      .append('svg')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
      .classed('svg-content', true);

    const projection = d3
      .geoMercator()
      .translate([this.width / 2, this.height / 2])
      .scale(120)
      .center([0, 0]);
    const path = d3.geoPath().projection(projection);

    Promise.all<any, any>([
      this.cityDataService.getMap(),
      this.cityDataService.getCities(),
    ]).then((values) => {
      this.map = values[0];
      for (const city of values[1]) {
        let cityobj = {
          location: city.location,
          id: this.removeInvalidChars(city.location),
          long: city.coords.coordinates[0],
          lat: city.coords.coordinates[1],
        };
        this.cities.push(cityobj);
      }
      //draw map
      this.svg
        .selectAll('path')
        .data(topojson.feature(this.map, this.map.objects.countries).features)
        .enter()
        .append('path')
        .attr('class', 'countries')
        .attr('d', path);
      //add labels, change to add label only when mouseover, but do not remove
      this.svg
        .selectAll('text')
        .data(this.cities)
        .enter()
        .append('text')
        .attr('id', function (d) {
          return d.id;
        })
        .text(function (d) {
          return d.location;
        })
        .attr('x', function (d) {
          return projection([d.long, d.lat])[0] + 2;
        })
        .attr('y', function (d) {
          return projection([d.long, d.lat])[1];
        })
        .attr('class', 'labels');

      //draw points
      this.svg
        .selectAll('circle')
        .data(this.cities)
        .enter()
        .append('a')
        .attr('href', function (d) {
          return '../city/' + d.location;
        })
        .append('circle')
        .attr('class', 'circles')
        .attr('cx', function (d) {
          return projection([d.long, d.lat])[0];
        })
        .attr('cy', function (d) {
          return projection([d.long, d.lat])[1];
        })
        .on('mouseenter', function (d) {
          console.log(d.id);
          d3.select('#' + d.id).classed('active', true);
        })
        .on('mouseout', function (d) {
          d3.select('#' + d.id).classed('active', false);
        });
    });
  }

  ngOnInit(): void {
    //this.drawGlobe();
    this.drawMap();
  }

  public pageContent = {
    header: {
      title: 'Map',
      strapline: 'cities in database',
    },
    content: '',
  };
}
