import React, { Component } from 'react'
import * as d3 from 'd3';
import './HorizontalBarChart.css';

class HorizontalBarChart extends Component {

    constructor(props) {
        super(props);
        this.createChart = this.createChart.bind(this);
    }

    componentDidMount() {
        this.createChart()
    }
    componentDidUpdate() {
        this.createChart()
    }

    createChart() {

        const heightBar = 30;
        const widthChart = 500;
        const heightChart = heightBar * this.props.data.length;

        var x = d3.scaleLinear()
            .domain([0, d3.max(this.props.data)])
            .range([0, widthChart]);




        const chart = d3.select(this.refs.chart)
            .style('background', 'black')
            .attr('width', widthChart)
            .attr('height', heightChart)
            .style('padding', '5 5 5 5');

        chart
            .selectAll('g')
            .exit().remove();

        var bar = chart
            .selectAll('g')
            .data(this.props.data)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(0,${i * 30})`)


        bar.append('rect')
            .style('width', (d) => x(d))
            .style('height', heightBar - 5)

        bar.append('text')
            .attr('x', (d) => x(d) - 10)
            .attr('y', 14.5)
            .text((d) => d)
    }

    render() {
        return (
            <svg ref="chart" className="chart">

            </svg>
        )
    }
}
export default HorizontalBarChart