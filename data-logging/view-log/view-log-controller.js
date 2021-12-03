var Highcharts = require('highcharts')
require('highcharts/modules/data')(Highcharts)
require('../../themes/dark')

Highcharts.createElement('link', {
    href: '../../font/font.css',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);


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

function makeChart(renderTo, title, seriesName, seriesColor, csvElem) {
    return Highcharts.chart(renderTo, {
        title: {
            text: title,
            style: {
                fontSize: '12px'
            }
        },
        credits: {
            enabled: false
        },
        data: {
            csv: csvElem.innerHTML,
            itemDelimiter: ',',
            lineDelimiter: '\n',
            decimalPoint: '.'
        },
        plotOptions: {
            series: {
                visible: false,
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            }
        },
    });
}

function displayReady() {  
    sessionStorage.setItem("displayReady", true);
}

function InitViewLogController() {
    sessionStorage.removeItem("displayReady");

    var urlParams = new URLSearchParams(window.location.search);

    document.getElementById('new-log-name').innerText = urlParams.get('logid');

    
    document.getElementById('scrollbox').style.maxHeight = "440px";

    document.getElementById('loader-id').style.opacity = 1;

    document.getElementById('loader-text-id').innerText = "";
    document.getElementById('loader-text-id').style.opacity = 1;


    setTimeout(displayReady, 100);
}

InitViewLogController();

window.AddCsv = function AddCsv(data) {
    document.getElementById('csv').innerHTML = data;

    var g_newChart = makeChart('g-rpm', 'Log', 'Graph', 'rgba(255, 0, 0, 1)', document.getElementById('csv'));
}
