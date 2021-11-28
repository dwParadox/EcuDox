var Highcharts = require('highcharts')
require('highcharts/highcharts-more')(Highcharts)
require('highcharts/modules/solid-gauge')(Highcharts)
require('../themes/dark')

Highcharts.createElement('link', {
    href: 'font.css',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

var gaugeOptions = {
    chart: {
        type: 'solidgauge',
        animation: false,
    },

    title: null,

    pane: {
        center: ['50%', '50%'],
        size: '85%',
        startAngle: -120,
        endAngle: 120,

        background: {
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
            innerRadius: '65%',
            outerRadius: '80%',
            shape: 'arc',
            borderColor: 'rgba(55, 55, 55, 1)'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    credits: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#9B0000']  // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            style: {
                fontSize: '12px'
            },
            y: -35
        },
        labels: {
            enabled: false
        }
    },

    plotOptions: {
        solidgauge: {
            lineWidth: 1,
            dataLabels: {
                style: {
                    fontSize: '12px'
                },
                x: -1,
                y: -30,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

var chartOptions = {
    chart: {
        type: 'spline',
        animation: true
    },

    time: {
        useUTC: false
    },

    credits: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    legend: {
        enabled: false
    },

    exporting: {
        enabled: false
    },
}

function makeGauge(renderTo, minVal, maxVal, title, label) {
    return Highcharts.chart(renderTo, Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: minVal,
            max: maxVal,
            title: {
                text: title
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            data: [0],
            radius: 80,
            innerRadius: 65,
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:25px">{y}</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4">' + label + '</span>' +
                    '</div>'
            }
        }]

    }));
}

function makeChart(renderTo, title, seriesName, seriesColor) {
    return Highcharts.chart(renderTo, Highcharts.merge(chartOptions, {
        title: {
            text: title,
            style: {
                fontSize: '12px'
            }
        },

        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },

        yAxis: {
            title: {
                enabled: false
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },

        series:
        [
            {
                name: seriesName,
                color: seriesColor,
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -9; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 2000,
                            y: 0
                        });
                    }
                    return data;
                }())
            },
        ]
    }));
}