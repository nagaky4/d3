import React, { Component } from "react";
import * as d3 from "d3";
import "./HorizontalBarChart.css";

class HorizontalBarChart extends Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate() {
    this.createChart();
  }

  createChart() {
    const heightBar = 30;
    const widthChart = 500;

    const heightAxis = 30;
    const widthAxis = 20;

    const heightChart = heightBar * this.props.data.length;

    var x = d3
      .scaleLinear()
      .domain([0, d3.max(this.props.data.map(d => d.value))])
      .range([0, widthChart]);

    const y = d3
      .scaleBand()
      .domain(this.props.data.map(d => d.name).reverse())
      .rangeRound([heightChart, 0]);

    const xAxis = d3.axisLeft().scale(y);

    const yAxis = d3.axisBottom().scale(x);

    const chart = d3
      .select(this.refs.chart)
      .style("background", "black")
      .attr("width", widthChart + widthAxis + 20)
      .attr("height", heightChart + heightAxis)
      .style("padding", "5 5 5 5");

    chart
      .selectAll("g")
      .exit()
      .remove();

    var bar = chart
      .selectAll("g")
      .data(this.props.data)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${widthAxis},${i * 30})`);

    bar
      .append("rect")
      .style("width", d => x(d.value))
      .style("height", heightBar - 5);

    bar
      .append("text")
      .attr("x", d => x(d.value) - 10)
      .attr("y", 14.5)
      .text(d => d.value);

    chart
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${widthAxis},${-5})`)
      .call(xAxis);
    chart
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${widthAxis},${heightChart})`)
      .call(yAxis);
  }

  render() {
    return <svg ref="chart" className="chart"></svg>;
  }
}
export default HorizontalBarChart;
