import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { City } from '../city';
import { default as citydata } from '../citydata';

@Component({
  selector: 'app-graph-precip',
  templateUrl: './graph-precip.component.html',
  styleUrls: ['./graph-precip.component.css'],
})
export class GraphPrecipComponent implements OnInit {
  constructor() {}

  @Input() city: City;

  private svg: any;
  private margin = { left: 30, right: 20, top: 20, bottom: 60 };
  private width = 750 - (this.margin.left + this.margin.right);
  private height = 500 - (this.margin.top + this.margin.bottom);

  ngOnInit(): void {
    if (this.city === undefined) {
      this.city = citydata;
    }
    this.createSVG();
  }

  private createSVG(): void {
    const dates = this.city.timestamp.map((x) => {
      const date = new Date(1000 * x);
      const str = date.toLocaleString('default', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      return str;
    });

    const precipMM = this.city.precipMM;
    const i_arr = [...Array(dates.length).keys()];

    this.svg = d3.select('figure#precip').append('svg');
    this.svg.attr('height', this.height).attr('width', this.width);

    let xScale = d3
      .scaleBand<any>()
      .domain(dates)
      .range([this.margin.left, this.width - this.margin.right])
      .padding(0.5);
    let yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...precipMM)])
      .range([this.height - this.margin.bottom, this.margin.top]);
    let xAxis = d3
      .axisBottom(xScale)
      .tickFormat((interval, i) => {
        return i % 7 !== 0 ? ' ' : interval;
      })
      .tickPadding(5);
    let yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

    this.svg
      .append('g')
      .attr('class', 'bars')
      .selectAll('rect')
      .data(i_arr)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (i) => xScale(dates[i]))
      .attr('y', (i) => yScale(precipMM[i]))
      .attr('width', xScale.bandwidth())
      .attr('height', (i) => yScale(0) - yScale(precipMM[i]))
      .style('fill', '#FFB266');

    this.svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    this.svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(yAxis);
  }
}
