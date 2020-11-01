import { Component, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { City } from '../city';
import { default as citydata } from '../citydata';

@Component({
  selector: 'app-graph-temp',
  templateUrl: './graph-temp.component.html',
  styleUrls: ['./graph-temp.component.css'],
})
export class GraphTempComponent implements AfterViewInit {
  constructor() {}

  @Input() city: City;

  private svg: any;
  private margin = 20;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  ngAfterViewInit(): void {
    if (this.city === undefined) {
      this.city = citydata;
    }
    this.createSVG();
  }

  private createSVG(): void {
    const startDate = new Date(this.city.timestamp[0] * 1000),
      endDate = new Date(this.city.timestamp.slice(-1)[0] * 1000);
    const dates = this.city.timestamp.map((x) => {
      return new Date(1000 * x);
    });

    const uvi = this.city.uvi;
    const maxTempC = this.city.maxTempC;
    const minTempC = this.city.minTempC;
    const i_arr = [...Array(dates.length).keys()];

    const data: any[] = [];
    let seriesMax: Array<any> = [],
      seriesMin: Array<any> = [];
    for (let i = 0; i < dates.length; i++) {
      seriesMax.push({ name: 'Max Temp', date: dates[i], t: maxTempC[i] });
      seriesMin.push({ name: 'Min Temp', date: dates[i], t: minTempC[i] });
    }
    data.push(seriesMax);
    data.push(seriesMin);
    this.svg = d3.select('figure#temp').append('svg');
    this.svg.attr('height', this.height).attr('width', this.width);

    let linecolors = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(['Max Temp', 'Min Temp']);

    let xScale = d3
      .scaleTime()
      .domain([startDate, endDate])
      .range([this.margin, this.width - 2 * this.margin]);
    let yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...maxTempC)])
      .range([this.height - this.margin, this.margin]);
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    let line = d3
      .line()
      .x((d: any) => xScale(d.date))
      .y((d: any) => yScale(d.t))
      .curve(d3.curveNatural);

    this.svg
      .selectAll('path')
      .data(data)
      .join('path')
      .attr('class', 'temp-line')
      .attr('d', line)
      .style('stroke', (d) => linecolors(d[0].name))
      .style('stroke-width', 3)
      .style('fill', 'transparent');

    this.svg
      .selectAll('text.label')
      .data(data)
      .join('text')
      .attr('class', 'label')
      .attr('x', this.width - 3 * this.margin)
      .attr('y', (d) => yScale(d.slice(-1)[0].t))
      .attr('dy', '3em')
      .style('fill', (d) => linecolors(d[0].name))
      .style('font-family', 'sans-serif')
      .style('font-size', 12)
      .text((d) => d[0].name);

    this.svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height - this.margin})`)
      .call(xAxis);

    this.svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${this.margin},0)`)
      .call(yAxis);
  }
}
