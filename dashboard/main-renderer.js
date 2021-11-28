const { ConnectionBuilder } = require('electron-cgi');

var Highcharts = require('highcharts')
require('highcharts/highcharts-more')(Highcharts)
require('highcharts/modules/solid-gauge')(Highcharts)
require('../themes/dark')

function InitMainRenderer() {
    sessionStorage.setItem("displayReady", true);
}

InitMainRenderer();

Highcharts.createElement('link', {
    href: '../font/font.css',
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

//          Overview

//var o_gaugeSpeed = makeGauge('o-container-speed', 0, 150, 'Vehicle Speed', 'MPH');
//var o_gaugeRpm = makeGauge('o-container-rpm', 0, 8000, 'Engine Speed', 'RPM');
var o_gaugeAfr = makeGauge('o-container-afr', 8, 23, 'AFR Actual', 'AFR');
var o_gaugeBoost = makeGauge('o-container-boost', 0, 20, 'Boost Pressure', 'psi');
//var o_gaugePwrPer = makeGauge('o-container-pwr-percent', 0, 100, 'Power', ' % ');
//var o_gaugeTqPer = makeGauge('o-container-tq-percent', 0, 100, 'Torque', ' % ');
var o_gaugeOil = makeGauge('o-container-oil', 70, 300, 'Oil Temperature', ' °F');
var o_gaugeCoolant = makeGauge('o-container-coolant', 70, 300, 'Coolant Temperature', ' °F');

//          Fuel
var f_gaugeAfr = makeGauge('f-container-afr', 8, 23, 'AFR Actual', 'AFR');
var f_gaugeStft = makeGauge('f-container-stft', -20, 20, 'STFT', ' % ');
var f_gaugeLtft = makeGauge('f-container-ltft', -20, 20, 'LTFT', ' % ');
var f_gaugeFuelPressure = makeGauge('f-container-fuelpressure', 0, 30, 'Fuel Pressure', 'MPa');
var f_gaugeMaf = makeGauge('f-container-maf', 0, 300, 'Mass Air Flow', 'g/s');
var f_gaugePiRatio = makeGauge('f-container-piratio', 0, 100, 'PI Ratio', ' % ');
var f_gaugeIgnTiming = makeGauge('f-container-igntiming', -40, 40, 'Ignition Timing', ' ° ');
var f_gaugeKnock = makeGauge('f-container-knock', -10, 10, 'Knock Correction', ' ° ');

//          Drive
var d_gaugeAccAngle = makeGauge('d-container-accangle', 0, 100, 'Accelerator Angle', ' % ');
var d_gaugeBrakePressure = makeGauge('d-container-brake', 0, 100, 'Brake Pressure', 'psi');
var d_gaugeVVTEnabled = makeGauge('d-container-vvtenabled', 0, 2, 'VVT Enabled', 'enabled');
var d_gaugeWheelSlip = makeGauge('d-container-wheelslip', 0, 100, 'Wheel Slip', ' % ');
var d_gaugeEngineLoad = makeGauge('d-container-engload', 0, 2, 'Engine Load', ' load ');
var d_gaugeDIToSpark = makeGauge('d-container-ditospark', 0, 60, 'DI to Spark', ' ms');
var d_gaugeFSpeed = makeGauge('d-container-frontspeed', 0, 200, 'Front Wheel Speed', 'mph');
var d_gaugeRSpeed = makeGauge('d-container-rearspeed', 0, 200, 'Rear Wheel Speed', 'mph');

//          Power
var p_chartHp = makeChart('p-container-hp', 'Power Output', 'Horsepower', 'rgba(255, 0, 0, 1)');
//var p_chartTq = makeChart('p-container-tq', 'Torque Output', 'Torque', 'rgba(255, 255, 0, 1)');
var p_gaugePeakPower = makeGauge('p-container-peakpower', 0, 450, 'Peak Power', ' hp');
var p_gaugePeakBoost = makeGauge('p-container-peakboost', 0, 20, 'Peak Boost', 'psi');
var p_gaugeCurPower = makeGauge('p-container-curpower', 0, 450, 'Current Power', ' hp');
var p_gaugeCurBoost = makeGauge('p-container-boost', 0, 20, 'Boost Pressure', 'psi');

//          FlexFuel
var ff_gaugeFlexContent = makeGauge('ff-container-content', 8, 23, 'Ethanol Content', ' % ');
var ff_gaugeFlexContentRaw = makeGauge('ff-container-contentraw', 8, 23, 'Eth Content Raw', ' % ');
var ff_gaugeFlexIgnAdv = makeGauge('ff-container-ignadvance', 8, 23, 'Ignition Advance', ' ° ');
var ff_gaugeFlexQuantMult = makeGauge('ff-container-quantitymult', 8, 23, 'Quantity Multiplier', ' * ');
var ff_gaugeFlexAfrAdjust = makeGauge('ff-container-afradjust', 8, 23, 'AFR Adjustment', 'AFR');
var ff_gaugeFlexCrankMult = makeGauge('ff-container-crankmult', 8, 23, 'Crank Multiplier', ' * ');
var ff_gaugeFlexPressure = makeGauge('ff-container-pressure', 8, 23, 'Fuel Pressure', 'MPa');
var ff_gaugeFlexMap = makeGauge('ff-container-mapswitch', 8, 23, 'Mapswitch', 'map');

function setGaugeLevel(gauge, level) {
    if (gauge)
       gauge.series[0].points[0].update(level);
}

function addChartPoint(chart, x, y) {
    if (chart)
        chart.series[0].addPoint([x, y], true, true);
}

var progBarRpm = document.getElementById('rpm-bar'),
    progBarBoost = document.getElementById('boost-bar');

var tabOverview = document.getElementById('tab-overview');
    tabFuel = document.getElementById('tab-fuel'),
    tabDrive = document.getElementById('tab-drive'),
    tabPower = document.getElementById('tab-power'),
    tabFlex = document.getElementById('tab-flexfuel'),
    tabSettings = document.getElementById('tab-settings');

function tabActive(tab) {
    return tab.classList.contains('active');
}

var closestGearRat = 0, closestGearIndex = 0, gears = [ 3.76, 2.27, 1.65, 1.19, 1, 0.84 ];

var lastPower = 0, lastTorque = 0, peakPower = 0, peakBoost = 0;
window.UpdateData = function UpdateData(vehicleData) {
    var engineRedline = 9500;
    var stockPower = 174;
    var stockTq = 145;

    var engineSpeed = vehicleData['Engine Speed'],
        manifoldPressure = vehicleData['Manifold Absolute Pressure'],
        boostPressure = Math.round((manifoldPressure - 14.50) * 10) / 10,
        accPosition = vehicleData['Throttle Position'],
        vehicleSpeed = vehicleData['Vehicle Speed'],
        afrActual = vehicleData['AFR Actual'],
        torqueActual = vehicleData['Torque Actual'],
        horseActual = Math.round((torqueActual * engineSpeed) / 5252),
        //wheelSlip = Math.max(0, Math.min(100, Math.round((vehicleData['Throttle Delta'] / 20) * 100)) - 5);

    closestGearRat = 999;
    closestGearIndex = -1;

    var relativeRatio = (((26.4 * engineSpeed) / vehicleSpeed) / 336 ) / 4.44;
    var i;
    for (i = 0; i < 6; i++) {
        var gearRatioDelta = Math.abs(relativeRatio - gears[i]);
        
        if (gearRatioDelta < closestGearRat) {
            closestGearRat = gearRatioDelta;
            closestGearIndex = i;
        }
    }

    var currentGear = closestGearIndex + 1;

    lastPower = horseActual;
    lastTorque = torqueActual;

    //if (lastPower > peakPower)
    //    peakPower = lastPower;

    //if (boostPressure > peakBoost)
    //    peakBoost = boostPressure;

    if (tabActive(tabOverview))
    {
        setGaugeLevel(o_gaugeCoolantTemp, vehicleData['Coolant Temperature']);
        setGaugeLevel(o_gaugeAirTemp, vehicleData['Intake Air Temperature']);
        setGaugeLevel(o_gaugeTiming, vehicleData['Timing Advance']);
        setGaugeLevel(o_gaugeThrottle, vehicleData['Throttle Position']);

        //setGaugeLevel(o_gaugeSpeed, vehicleSpeed);
        //setGaugeLevel(o_gaugeRpm, engineSpeed);
        //setGaugeLevel(o_gaugeAfr, afrActual);
        //setGaugeLevel(o_gaugeBoost, boostPressure);
        //setGaugeLevel(o_gaugePwrPer, Math.round((horseActual / stockPower) * 100));
        //setGaugeLevel(o_gaugeTqPer, Math.round((torqueActual / stockTq) * 100));
        //setGaugeLevel(o_gaugeOil, vehicleData['Engine Oil Temperature']);
        //setGaugeLevel(o_gaugeCoolant, vehicleData['Coolant Temperature']);

        drawSpeedo(vehicleSpeed, vehicleSpeed, currentGear, engineSpeed / 10000, 160);
    }
    
    if (tabActive(tabFuel))
    {
        setGaugeLevel(f_gaugeAfr, afrActual);
        setGaugeLevel(f_gaugeStft, vehicleData['Fuel Trim Short Term']);
        setGaugeLevel(f_gaugeLtft, vehicleData['Fuel Trim Long Term']);
        setGaugeLevel(f_gaugeFuelPressure, vehicleData['Fuel Rail Pressure']);
        setGaugeLevel(f_gaugeMaf, vehicleData['Mass Air Flow']);
        setGaugeLevel(f_gaugePiRatio, vehicleData['Fuel Injection PI Ratio']);
        setGaugeLevel(f_gaugeIgnTiming, vehicleData['Ignition Timing']);
        setGaugeLevel(f_gaugeKnock, vehicleData['Knock Correction']);
    }

    if (tabActive(tabDrive))
    {
        setGaugeLevel(d_gaugeAccAngle, accPosition);
        setGaugeLevel(d_gaugeBrakePressure, vehicleData['Brake Pressure']);
        setGaugeLevel(d_gaugeVVTEnabled, vehicleData['VVT Enabled']);
        setGaugeLevel(d_gaugeWheelSlip, wheelSlip);
        setGaugeLevel(d_gaugeEngineLoad, vehicleData['Engine Load']);
        setGaugeLevel(d_gaugeDIToSpark, vehicleData['Injection End of DI to Spark']);
        setGaugeLevel(d_gaugeFSpeed, vehicleData['Wheel Speed Front']);
        setGaugeLevel(d_gaugeRSpeed, vehicleData['Wheel Speed Rear']);
    }

    if (tabActive(tabPower))
    {
        setGaugeLevel(p_gaugePeakPower, peakPower);
        setGaugeLevel(p_gaugePeakBoost, peakBoost);
        setGaugeLevel(p_gaugeCurPower, horseActual);
        setGaugeLevel(p_gaugeCurBoost, boostPressure);
    }
    
    setProgressBar(progBarRpm, engineSpeed / engineRedline * 100 , 650, true);
    setProgressBar(progBarBoost, accPosition, 650, false);
}

/*
setInterval(function () {
    if (vehicleData == null)
        return;

    if (tabActive(tabPower)) {
        var time = (new Date()).getTime();
        addChartPoint(p_chartHp, time, lastPower);
        addChartPoint(p_chartTq, time, lastTorque);
    }
}, 1000);
*/

function getBarColor(percent) {
    var red, green, blue;

    blue = 255 * (Math.min(15, Math.max(0, percent - 85)) / 15);
    red = (255 * (Math.min(50, Math.max(0, percent - 35)) / 50)) - blue;
    green = Math.max(0, 255 - (red / 1.25) - blue);
    return 'rgba(' + red + ',' + green + ',' + blue + ', 1)';
}

function addClassIfNotContains(elem, className) {
    if (!elem.classList.contains(className))
        elem.classList.add(className);
}

function removeClassIfContains(elem, className) {
    if (elem.classList.contains(className))
        elem.classList.remove(className);
}

function setProgressBar(elem, percent, width, colored) {
    elem.style.width = ((percent / 100) * width) + "px";
    elem.style.marginLeft = window.innerWidth / 2 - ((percent / 100 * width) / 2) - 5 + "px";

    if (colored)
        elem.style.backgroundColor = getBarColor(percent);
    else
        elem.style.backgroundColor = 'gainsboro';

    if (percent > 80)
        addClassIfNotContains(elem, 'blinking');
    else
        removeClassIfContains(elem, 'blinking');
}

function handleWarningNotifAnim(elem, percent) {
    if (percent > 2 && percent < 10) {
        removeClassIfContains(elem, 'transparent');
        removeClassIfContains(elem, 'red');
        addClassIfNotContains(elem, 'yellow');
    }
    else if (percent >= 25 && percent != 100) {
        removeClassIfContains(elem, 'transparent');
        removeClassIfContains(elem, 'yellow');
        addClassIfNotContains(elem, 'red');
    }
    else {
        removeClassIfContains(elem, 'yellow');
        removeClassIfContains(elem, 'red');
        addClassIfNotContains(elem, 'transparent');
    }
}
