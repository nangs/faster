import React, { Component } from 'react';

const renderChart = (seriesData=[]) => {
    Highcharts.setOptions({
        colors: ['#50B432', '#ED561B']
    });

    Highcharts.chart('container-accuracy', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            style: {
                fontFamily: 'Raleway'
            }
        },
        title: {
            text: 'Accuracy'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Accuracy',
            colorByPoint: true,
            data: seriesData
        }],
        exporting: { enabled: false },
        credits: { enabled: false }
    });
};


export default class Pie extends Component {
    componentWillReceiveProps(nextProps) {
        if(nextProps.seriesData.length > 0) {
            renderChart(nextProps.seriesData);
        }
    }

    render() {
        const styles = {
            width: '300px',
            height: '200px',
            float: 'left'
        };

        return (
            <div id="container-accuracy" style={styles}></div>
        )
    }
}