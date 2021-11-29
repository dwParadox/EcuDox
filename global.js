const { session } = require('electron');
const { ConnectionBuilder } = require('electron-cgi');

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
        if (typeof window.AddMap === 'function') {
            _connection.send("GetMaps", "f", f => {});
        }

        if (typeof window.AddLog === 'function') {
            _connection.send("GetLogs", "f", f => {});
        }

        document.getElementById('loader-id').style.display = "none";
        document.getElementById('loader-text-id').style.display = "none";
        document.getElementById('content-id').style.display = "block";
    });

    _connection.on('VehicleDataReady', data => {
        if (typeof window.UpdateData === 'function') {
            UpdateData(JSON.parse(data));
        }
    });

    _connection.on('VehicleInfoMessage', data => {
        alert(data);
    });

    _connection.on('MapsAvailable', data => {
        if (typeof window.AddMap === 'function') {
            var maps = JSON.parse(data);

            for (var i = 0; i < maps.length; i++) {
                var map = maps[i];
                AddMap(map["Name"], map["DisplayName"], map["Active"]);
            }
        }
    });

    _connection.on('LogsAvailable', data => {
        if (typeof window.AddLog === 'function') {
            var logs = JSON.parse(data);

            for (var i = 0; i < logs.length; i++) {
                var log = logs[i];
                AddLog(log["Name"], log["DisplayName"])
            }
        }
    });
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