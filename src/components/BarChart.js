import React, { Component } from 'react'

import * as d3 from 'd3';


class BarChart extends Component {

    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }
    componentDidMount() {
        this.createBarChart();
    }
    componentDidUpdate() {

        this.createBarChart();

    }
    createBarChart() {
        var barchart = d3.select(this.refs.barChart)
        barchart
            .selectAll('div')
            .data(this.props.data)
            .enter()
            .append('div');

        barchart
            .selectAll('div')
            .data(this.props.data)
            .exit()
            .remove();

        barchart
            .selectAll('div')
            .data(this.props.data)
            .style('background', (d, i) => i % 2 === 0 ? '#b58c8c' : '#84d0a6')
            .style('width', (d) => d + 'px')
            .style('height', '20px')



    }
    render() {
        return (
            <div ref="barChart"
                >
            </div>
        )
    }
}
export default BarChart