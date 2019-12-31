import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import { ExchangeRatesService } from 'src/services/exchange-rates.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  xAxisValues: any;
  mainAxisColor = '#b7b7b7';
  margin: any;
  width: number;
  height: number;
  dataExchangeRates: any;

  constructor(private exchangeRatesService: ExchangeRatesService) { }

  ngOnInit() {
    this.getExchangeRates();
    this.setSvgSize();
    this.createGraph();
  }

  createGraph() {
    this.xAxisValues = this.getDatesArr();

    const svg = d3.select('#my_dataviz')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');

    const x = d3.scaleTime()
      .domain(d3.extent(this.xAxisValues))
      .range([0, this.width]);

    svg.append('g')
      .attr('stroke', '#948e8e')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([22.0000000, 26.0000000])
      .range([this.height, 0]);

    svg.append('g')
      .attr('stroke', '#948e8e')
      .attr('class', 'axis')
      .call(d3.axisLeft(y)
        .ticks(7).tickSize(-this.width)
      );

    svg.append('path')
      .datum(this.dataExchangeRates)
      .attr('fill', 'none')
      .attr('stroke', '#2ffcb1')
      .attr('stroke-width', 3)
      .attr('d', d3.line()
        .curve(d3.curveBasis)
        .x((d) => x(new Date(d.date)))
        .y((d) => y(d.value)));

    d3.selectAll('.axis path')
      .style('stroke', this.mainAxisColor);
    d3.selectAll('.axis line')
      .style('stroke', this.mainAxisColor);
    d3.selectAll('.axis .tick line')
      .style('stroke', '#f3f3f3');
  }

  private getExchangeRates() {
    this.exchangeRatesService.getExchangeRates().subscribe((data: any) => this.dataExchangeRates = data);
  }

  private setSvgSize() {
    this.margin = { top: 10, right: 30, bottom: 30, left: 60 };
    this.width = 880 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }

  private getDatesArr() {
    return this.dataExchangeRates.map(element => new Date(element.date));
  }
}
