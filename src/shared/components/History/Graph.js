import React from 'react';
const defaultWPMData = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6];

const renderGraph = (wpmData, accuracyData) => {
    Highcharts.chart('graph-container', {
        exporting: { enabled: false },
        credits: { enabled: false },
        title: {
            text: 'Proficency',
            x: -20 //center
        },
        subtitle: {
            text: 'WPM vs Accuracy',
            x: -20
        },
        xAxis: {
            title: {
                text: 'Time'
            }
        },
        yAxis: [
            {
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'Words Per Minute',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Accuracy',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }

            }
        ],
        legend: {
            layout: 'vertical',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: 'WPM',
            data: wpmData,
            tooltip: {
                valueSuffix: ''
            }
        }, {
            name: 'Accuracy',
            data: accuracyData,
            tooltip: {
                valueSuffix: '%'
            }
        }]
    });
};

export class Graph extends React.Component {
    
    componentWillReceiveProps(nextProps) {
        if(this.props.data !== nextProps.data) {
            renderGraph(nextProps.data.wpmData, nextProps.data.accuracyData);
        }
    }
    
    render() {
        const style = {
            minWidth: '310px',
            height: '400px',
            margin: '0 auto'
        };

        return (
            <div id="graph-container" style={style}></div>
        )
    }
}