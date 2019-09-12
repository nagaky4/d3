import React, { Component } from 'react'

import * as d3 from 'd3';
import './VerticalBarChart.css';

class VerticalBarChart extends Component {

    constructor(props) {
        super(props);

        this.createVerticalBarChart = this.createVerticalBarChart.bind(this)
    }

    componentDidMount() {
        this.createVerticalBarChart();
    }

    componentDidUpdate() {
        this.createVerticalBarChart()
    }

    createVerticalBarChart() {

        const barWidth = 30;
        const chartWidth = barWidth * this.props.data.length;
        const chartHeight = 500;

        const x = d3.scaleBand().domain(this.props.data.map(d => d.name)).rangeRound([0, chartWidth])

    

        const y = d3.scaleLinear([0, Math.max(...this.props.data.map(d => d.value))], [chartHeight, 0]);

        let i = 0;
        setInterval(() => {
            console.log(i, x(this.props.data.map(d => d.name)[i]));
            i++;
        }, 1000)


        const chart = d3
            .select(this.refs.chart)
            .attr('width', chartWidth)
            .attr('height', chartHeight)
            .style('background', 'black')
            .style('padding', '5 5 5 5')

        chart
            .selectAll('g')
            .exit()
            .remove()

        const barChart = chart
            .selectAll('g')
            .data(this.props.data)
            .enter()
            .append('g')
            .attr('transform', (d, i) => `translate(${i * barWidth},0)`)

        barChart
            .append('rect')
            .attr('y', (d) => y(d.value))
            .attr('width', barWidth - 5)
            .attr('height', (d) => chartHeight - y(d.value))
            .style('background', 'blue')


        barChart
            .append('text')
            .attr('y', chartHeight - 20)
            .attr('x', (barWidth + 10) / 2)
            .text((d) => d.value)



    }

    render() {
        return (
            <svg ref="chart" className="chart">
            </svg>
        )
    }
}

export default VerticalBarChart
