import React, { Component } from "react";

import * as d3 from "d3";
import "./VerticalBarChart.css";

class VerticalBarChart extends Component {
  constructor(props) {
    super(props);

    this.createVerticalBarChart = this.createVerticalBarChart.bind(this);
  }

  componentDidMount() {
    this.createVerticalBarChart();
  }

  componentDidUpdate() {
    this.createVerticalBarChart();
  }

  createVerticalBarChart() {
    const heightAxis = 30;
    const widthAxis = 30;
    const barWidth = 30;
    const chartWidth = barWidth * this.props.data.length;

    const chartHeight = 500 + heightAxis;

    const x = d3
      .scaleBand()
      .domain(this.props.data.map(d => d.name))
      .rangeRound([0, chartWidth]);

    const y = d3.scaleLinear(
      [0, Math.max(...this.props.data.map(d => d.value))],
      [chartHeight, 0]
    );

    const xAxis = d3.axisBottom().scale(x);
    const yAxis = d3.axisLeft().scale(y);

    const chart = d3
      .select(this.refs.chart)
      .attr("width", chartWidth + widthAxis + 10)
      .attr("height", chartHeight + heightAxis)
      .style("background", "black")
      .style("padding", "5 5 5 5");

    chart
      .selectAll("g")
      .exit()
      .remove();

    const barChart = chart
      .selectAll("g")
      .data(this.props.data)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * barWidth},0)`);

    barChart
      .append("rect")
      .attr("y", d => y(d.value))
      .attr("x", widthAxis)
      .attr("width", barWidth - 5)
      .attr("height", d => chartHeight - y(d.value))
      .style("background", "blue");

    barChart
      .append("text")
      .attr("y", d => y(d.value) + 10)
      .attr("x", widthAxis + (barWidth + 10) / 2)
      .text(d => d.value);

    chart
      .append("g")
      .attr("class", "x axis")
      .attr("fill", "red")
      .attr("transform", `translate(${widthAxis},${chartHeight})`)
      .call(xAxis);

    chart
      .append("g")
      .attr("class", "x axis")
      .attr("fill", "red")
      .attr("transform", `translate(${widthAxis - 5},${0})`)
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("x", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
  }

  render() {
    return <svg ref="chart" className="chart"></svg>;
  }
}

export default VerticalBarChart;
