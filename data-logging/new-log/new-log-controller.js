let loggingStarted = false;
let loggingStopped = false;

let logName = '';
let logNamed = false;

function displayReady() {  
    sessionStorage.setItem("displayReady", true);
}

function InitNewLogController() {
    sessionStorage.removeItem("displayReady");

    document.getElementById('loader-id').style.opacity = 1;

    document.getElementById('recorder-id').style.opacity = 0;


    document.getElementById('loader-text-id').innerText = "";
    document.getElementById('loader-text-id').style.opacity = 1;

    document.getElementById('recorder-text-id').style.opacity = 0;

    setTimeout(displayReady, 100);
}

InitNewLogController();

window.SetLogFileName = function SetLogFileName(name) {
    logName = name;
    document.getElementById('new-log-name').innerText = logName;

    logNamed = true;
}

window.StartLogging = function StartLogging() {
    if (logNamed !== true || loggingStarted !== false) {
        return;
    }

    loggingStarted = true;

    document.getElementById('recorder-id').style.opacity = 1;
    document.getElementById('recorder-text-id').style.opacity = 1;
    document.getElementById('recorder-text-id').innerText = "RECORDING";

    var logClass = document.getElementById('log-start').className;
    document.getElementById('log-start').className = logClass.replace(" menu-glow", "");
    document.getElementById('log-stop').className += " menu-glow";
}

window.StopLogging = function StopLogging() {
    if (loggingStarted !== true || loggingStopped !== false){
        return;
    }

    document.getElementById('recorder-id').style.opacity = 0;
    document.getElementById('recorder-text-id').innerText = logName + " Recorded";
    document.getElementById('recorder-text-id').style.top = '30%';

    document.getElementById('new-log-name').innerText = "Finished";

    var logClass = document.getElementById('log-stop').className;
    document.getElementById('log-stop').className = logClass.replace(" menu-glow", "");
}