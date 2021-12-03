const { session } = require('electron');
const { ConnectionBuilder } = require('electron-cgi');

let osk_container = null;
let osk = null;
let inputNode = null;
let oskFirstInit = false;

function oskPrompt(responseName) {
    if (oskFirstInit === false) {
        inputNode = document.getElementById('keyboard-input');

        osk_container = document.getElementById("osk");
        osk_container.style.display = "block";

        osk = $('.main-keyboard').keyboard({
            theme: 'theme-black',
            layout: 'us-en:mobile',
            show: true,
            displayOnFocus: false,
            //autoPosition: false,
            container: function($el) {
                return $el.parent().find('.kb-container');
            }
        });

        inputNode.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                _connection.send(responseName, inputNode.value);

                inputNode.value = "";
                osk_container.style.display = "none";
            }
        });

        oskFirstInit = true;
    }
    else {
        osk_container.style.display = "block";
    }

    inputNode.focus();
}

function FillMaps(data) {
    if (data === "")
        return;

    var maps = JSON.parse(data);

    if (maps != null) {
        for (var i = 0; i < maps.length; i++) {
            var map = maps[i];
            AddMap(map["Id"], map["DisplayName"], map["Active"]);
        }
    }
}

function FillLogs(data) {
    if (data === "")
        return;

    var logs = JSON.parse(data);
            
    if (logs != null) {
        for (var i = 0; i < logs.length; i++) {
            var log = logs[i];
            AddLog(log["Id"], log["DisplayName"]);
        }
    }
}

function setupConnectionToRestartOnConnectionLost() {
    // /opt/EcuDox/resources/app.asar.unpacked/
    _connection = new ConnectionBuilder().connectTo(
        'dotnet', 'DotNet/EcuDoxAPI/netcoreapp3.1/EcuDoxAPI.dll')
        .build();

    console.log(_connection);

    _connection.onDisconnect = () => {
        document.getElementById('loader-text-id').innerText = "Connection lost";

        document.getElementById('loader-id').style.display = "block";
        document.getElementById('loader-text-id').style.display = "block";
 
        document.getElementById('content-id').style.display = "none";

        setupConnectionToRestartOnConnectionLost();
    };

    _connection.on('APIException', data => {
        alert(data);
    });

    _connection.on('InitStarted', data => {
        document.getElementById('loader-text-id').innerText = ""; //"Initializing RaceROM";
    });

    _connection.on('InitEnded', data => {
        document.getElementById('loader-id').style.display = "none";
        document.getElementById('loader-text-id').style.display = "none";
        document.getElementById('content-id').style.display = "block";

        if (typeof window.AddMap === 'function') {
            _connection.send("GetMaps", "f", f => { FillMaps(f); });
        }

        if (typeof window.AddLog === 'function') {
            _connection.send("GetLogs", "f", f => { FillLogs(f); });
        }

        if (typeof window.StartLogging === 'function') {
            oskPrompt('ReturnNewLogFileName');
        }
    });

    _connection.on('NewLogFileName', data => {
        SetLogFileName(data);
    });

    _connection.on('VehicleDataReady', data => {
        if (typeof window.UpdateData === 'function') {
            UpdateData(JSON.parse(data));
        }
    });

    _connection.on('VehicleInfoMessage', data => {
        alert(data);
    });

    _connection.on('LogFileNameRequest', logid => {
        alert('Enter a name for LogFile: \"' + logid + '\"')
        oskPrompt('LogFileNameResponse');
    });

    _connection.on('MapFileNameRequest', mapid => {
        alert('Enter a name for MapFile: \"' + mapid + '\"')
        oskPrompt('MapFileNameResponse');
    });

    _connection.on('LogsUpdated', empty => {
        ResetLogs();
        _connection.send("GetLogs", "f", f => {
            FillLogs(f);
        });
    });

    _connection.on('MapsUpdated', empty => {
        ResetMaps();
        _connection.send("GetMaps", "f", f => {
            FillMaps(f);
        });
    })
}

function Init() {
    if (!_connection) {
        if (!sessionStorage.getItem("displayReady")) {
            setTimeout(Init, 250);
        }
        else {
            document.getElementById('content-id').style.display = "none";
            document.getElementById('loader-id').style.display = "block";
            document.getElementById('loader-text-id').style.display = "block";

            document.getElementById('loader-id').style.opacity = 1;

            document.getElementById('loader-text-id').innerText = ""; //Connecting to API";
            document.getElementById('loader-text-id').style.opacity = 1;

            setTimeout(setupConnectionToRestartOnConnectionLost, 100);
        }
    }
}

Init();