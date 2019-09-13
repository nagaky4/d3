import React, { Component } from "react";

import * as d3 from "d3";

export class Circle extends Component {
  constructor(props) {
    super(props);
    this.createCircle = this.createCircle.bind(this);
  }

  componentDidMount() {
    this.createCircle();
  }
  componentDidUpdate() {
    this.createCircle();
  }

  createCircle() {
    const circle = d3
      .select(this.refs.circle)
      .attr("width", 500)
      .attr("height", 500);

    circle
      .selectAll("circle")
      .data(this.props.data)
      .enter()
      .append("circle")
      .attr("r", d => d)
      .attr("fill", "red")
      .attr("transform", (d, i) => `translate(${i * 100},0)`);
  }

  render() {
    return <svg ref="circle"></svg>;
  }
}

export default Circle;
