import React, { Component } from "react";

import * as d3 from "d3";
import "./LineChart.css";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.createLineChart = this.createLineChart.bind(this);
  }

  componentDidMount() {
    this.createLineChart();
  }
  componentDidUpdate() {
    this.createLineChart();
  }

  createLineChart() {
    const data = this.props.data,
      w = 700,
      h = 500,
      max = d3.max(data.map(item => item.value));

    const x = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);

    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([0, h]);

    let tempArr = [];
    let teA;
    let stateBegin = { x1: 0, y1: 0, x2: 0, y2: 0, value: 0, name: 0 };

    data.forEach((element, i) => {
      if (i % 2 === 0) {
        teA = {
          ...stateBegin,
          x2: x(i),
          y2: y(element.value),
          value: element.value,
          name: element.name
        };
      } else {
        teA = {
          ...stateBegin,
          x1: x(i),
          y1: y(element.value),
          value: element.value,
          name: element.name
        };
      }
      stateBegin = { ...teA };
      tempArr.push(teA);
    });
    console.log("tempArr", tempArr);
    const lineChart = d3
      .select(this.refs.lineChart)
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "black");

    lineChart
      .selectAll("line")
      .data(tempArr)
      .enter()
      .append("line")
      .style("stroke", "red")
      .style("stroke-width", "3px")
      .attr("x1", (d, i) => {
        return d.x1;
      })
      .attr("y1", (d, i) => {
        return h - d.y1;
      })
      .attr("x2", (d, i) => {
        return d.x2;
      })
      .attr("y2", (d, i) => {
        return h - d.y2;
      })
      .text(d => d.value);
  }
  render() {
    return <svg ref="lineChart"></svg>;
  }
}

export default LineChart;
