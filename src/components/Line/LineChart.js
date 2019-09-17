import React, { Component } from "react";

import * as d3 from "d3";
import "./LineChart.css";

const MARGIN = {
  Top: 30,
  Left: 30,
  Right: 30,
  Bottom: 30
};

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
      barWidth = w / data.length,
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

    const lineChart = d3
      .select(this.refs.lineChart)
      .attr("width", w + MARGIN.Right + MARGIN.Left)
      .attr("height", h + MARGIN.Top + MARGIN.Bottom)
      .style("background-color", "#a0a0a7");

    const barChart = lineChart
      .selectAll("g")
      .data(data)
      .enter()
      .append("g");

    barChart
      .append("rect")
      .attr(
        "transform",
        (d, i) =>
          `translate(${i * barWidth + MARGIN.Left},${h -
            y(d.value) +
            MARGIN.Top})`
      )
      .attr("width", x(1) - 10)
      .attr("height", d => y(d.value))
      .attr("fill", "blue")
      .attr("opacity", "0.5");
    barChart
      .append("text")
      .attr("x", (d, i) => x(i) + MARGIN.Left)
      .attr("y", d => h - y(d.value) + MARGIN.Top)

      .text(d => d.value);

    lineChart
      .selectAll("line")
      .data(tempArr)
      .enter()
      .append("line")
      .style("stroke", "red")
      .style("stroke-width", "3px")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .transition()
      .delay((d, i) => i * 500)
      .attrTween("x1", function(d, i) {
        if (i !== 0) {
          d3.select(this).attr("x1", d.x1 + MARGIN.Left);
        }
      })
      .attrTween("y1", function(d, i) {
        if (i !== 0) {
          d3.select(this).attr("y1", h - d.y1 + MARGIN.Top);
        }
      })
      .attrTween("x2", function(d, i) {
        if (i !== 0) {
          d3.select(this).attr("x2", d.x2 + MARGIN.Left);
        }
      })
      .attrTween("y2", function(d, i) {
        if (i !== 0) {
          d3.select(this).attr("y2", h - d.y2 + MARGIN.Top);
        }
      })
      .duration(2000)
      .ease(d3.easeCubic);
  }
  render() {
    return <svg ref="lineChart"></svg>;
  }
}

export default LineChart;
