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
      .attr("width", 300)
      .attr("height", 300);

    circle
      .selectAll("circle")
      .data(this.props.data, d => {
        // console.log("data", d);
        // console.log("state", d.State);
        return d.State;
      })
      .enter()
      .append("circle")
      .attr("r", d => d)
      .attr("fill", "red")
      .attr("transform", (d, i) => `translate(${i * 100},0)`);

    // d3.select("body")
    //   .transition()
    //   .styleTween("background-color", function() {
    //     return d3.interpolate("green", "red");
    //   });

    // d3.select("body")
    //   .style("background-color", "green") // make the body green
    //   .transition()
    //   .delay(500)
    //   .style("background-color", "red");

    // d3.select("body")
    //   .transition()
    //   .tween("start", function() {
    //     d3.select(this).style("background-color", "green");
    //   })
    //   .style("background-color", "red");
  }

  render() {
    return <svg ref="circle"></svg>;
  }
}

export default Circle;
