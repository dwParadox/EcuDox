let availableLogs = null;

window.OpenLog = function OpenLog(logid) {

}

window.NewLog = function NewLog() {

}

function displayReady() {  
    sessionStorage.setItem("displayReady", true);
}

function InitDataLogController() {
    sessionStorage.removeItem("displayReady");

    document.getElementById('scrollbox').style.maxHeight = "440px";
    document.getElementById('loader-id').style.opacity = 1;

    document.getElementById('loader-text-id').innerText = "";
    document.getElementById('loader-text-id').style.opacity = 1;

    availableLogs = document.getElementById("available-logs");
    availableLogs.innerHTML += "<div id=\"newlog\" class=\"long-menu-option menu-glow\" onclick=\"NewLog()\"><p class=\"long-item-text\">Start New Log</p></div>";


    setTimeout(displayReady, 100);
}

InitDataLogController();

window.AddLog = function AddLog(logid, logname) {
    availableLogs.innerHTML += "<div id=\"" + logid + "\" class=\"long-menu-option\" onclick=\"OpenLog('" + logid + "')\"><p class=\"long-item-text\">" + logname + "</p></div>";
}