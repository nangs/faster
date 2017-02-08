import React, { Component } from 'react';

const renderGuage = (wpm) => {
    const gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#DF5353'],
                [0.5, '#DDDF0D'],
                [0.9, '#55BF3B']
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 80,
            title: {
                text: 'Words Per Minute'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Speed',
            data: [wpm],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                '<span style="font-size:12px;color:silver">wpm</span></div>'
            },
            tooltip: {
                valueSuffix: ' wpm'
            }
        }]

    }));
};


export default class Meter extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { mountNode: null };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.wpm > 0) {
            renderGuage(nextProps.wpm);
        }
    }

    render() {
        const styles = {
            width: '300px',
            height: '200px',
            float: 'left'
        };

        return (
            <div id="container-speed" style={styles}></div>
        )
    }
}