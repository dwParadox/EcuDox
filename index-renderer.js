const { session } = require("electron");

function displayReady() {
    sessionStorage.setItem("displayReady", true);
}

function setupScript() {
    document.getElementById('splashscreen-id').style.display = "none";

    document.getElementById('loader-id').style.opacity = 1;

    document.getElementById('loader-text-id').innerText = "";
    document.getElementById('loader-text-id').style.opacity = 1;

    setTimeout(displayReady, 100);
}

function InitIndexRenderer() {
    sessionStorage.removeItem("displayReady");

    document.getElementById('loader-id').style.opacity = 0;
    document.getElementById('loader-text-id').style.opacity = 0;

    setTimeout(setupScript, !sessionStorage.getItem("splashShown") ? 1500 : 1);

    sessionStorage.setItem("splashShown", true);
}

InitIndexRenderer();
